import { Matrix4 } from '@math.gl/core';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { argv } from 'process';

import { CCFDatabase, ExtractionSet, SpatialEntity, SpatialSceneNode } from './public-api';
import { simplifyScene } from '../../ccf-body-ui/src/lib/util/simplify-scene';


if (!(global as {fetch: unknown}).fetch) {
  (global as {fetch: unknown}).fetch = fetch;
}

async function main(outputFile?: string): Promise<void> {
  const db = new CCFDatabase({
    ccfOwlUrl: 'http://localhost:8080/ccf.owl',
    ccfContextUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
  });
  await db.connect();
  const organs = db.scene.getReferenceOrgans();
  const organIRILookup: {[options: string]: string} = {};
  const organSpatialEntities: {[iri: string]: SpatialEntity} = {};
  const anatomicalStructures: {[iri: string]: SpatialEntity[]} = {};
  const extractionSets: {[iri: string]: ExtractionSet[]} = {};
  const sceneNodeLookup: {[iri: string]: SpatialSceneNode} = {};
  const sceneNodeAttrs: Partial<SpatialSceneNode> = {
    unpickable: true,
    _lighting: 'pbr',
    zoomBasedOpacity: false,
    color: [255, 255, 255, 255]
  };

  for (const organ of organs) {
    const iri = organ['@id'];
    const organSpatialEntity = organSpatialEntities[iri] = db.scene.getSpatialEntity(iri);
    anatomicalStructures[iri] = db.scene.getAnatomicalStructures(iri);
    if (anatomicalStructures[iri].length === 0) {
      anatomicalStructures[iri] = [ db.scene.getSpatialEntity(iri) ];
    }
    extractionSets[iri] = db.scene.getExtractionSets(iri);
    organIRILookup[[organ.label, organ.sex, organ.side].join('|')] = iri;

    const nodes = [
      anatomicalStructures[iri],
      ...(extractionSets[iri].map(set => set.extractionSites))
    ].reduce((acc, n) => acc.concat(n), []);

    for (const node of nodes) {
      if (!sceneNodeLookup[node['@id']]) {
        const sceneNode = db.scene.getSceneNode(node, organSpatialEntity, sceneNodeAttrs);
        if (sceneNode) {
          const dimensions = [
            organSpatialEntity.x_dimension,
            organSpatialEntity.y_dimension,
            organSpatialEntity.z_dimension
          ].map(n => -n / 1000 / 2);

          sceneNode.transformMatrix = new Matrix4(Matrix4.IDENTITY)
            .translate(dimensions).multiplyRight(sceneNode.transformMatrix);
          sceneNode.representation_of = sceneNode.representation_of || sceneNode['@id'];
          sceneNodeLookup[node['@id']] = sceneNode;
        } else {
          console.log(node.label);
        }
      }
    }
  }

  const simpleSceneNodes = await simplifyScene(Object.values(sceneNodeLookup));
  const simpleSceneNodeLookup = simpleSceneNodes.reduce((acc, node) => { acc[node['@id']] = node; return acc; }, {});

  const data = {
    organIRILookup,
    organSpatialEntities,
    anatomicalStructures,
    extractionSets,
    sceneNodeLookup,
    simpleSceneNodeLookup
  };

  if (outputFile) {
    writeFileSync(outputFile, JSON.stringify(data, null, 2));
  } else {
    console.log(data);
  }
}
main(argv.length >= 2 ? argv[2] : undefined);
