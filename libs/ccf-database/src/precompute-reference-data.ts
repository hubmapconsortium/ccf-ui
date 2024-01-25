import { Matrix4 } from '@math.gl/core';
import { simplifyScene } from 'ccf-body-ui';
import { writeFileSync } from 'fs';
import { argv } from 'process';
import { getSpatialPlacement } from './lib/queries/spatial-result-n3';
import { ccf } from './lib/util/prefixes';
import {
  CCFDatabase,
  ExtractionSet,
  SpatialEntity,
  SpatialSceneNode,
} from './public-api';

if (!(global as { fetch: unknown }).fetch) {
  (global as { fetch: unknown }).fetch = fetch;
}

async function main(outputFile?: string): Promise<void> {
  const db = new CCFDatabase({
    ccfOwlUrl:
      'https://raw.githubusercontent.com/hubmapconsortium/ccf-ontology/develop/ccf.owl',
    ccfContextUrl:
      'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    dataSources: [],
  });
  await db.connect();
  const organs = db.scene.getReferenceOrgans();
  const organIRILookup: { [options: string]: string } = {};
  const organSpatialEntities: { [iri: string]: SpatialEntity } = {};
  const anatomicalStructures: { [iri: string]: SpatialEntity[] } = {};
  const extractionSets: { [iri: string]: ExtractionSet[] } = {};
  const sceneNodeLookup: { [iri: string]: SpatialSceneNode } = {};
  const sceneNodeAttrs: Partial<SpatialSceneNode> = {
    unpickable: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _lighting: 'pbr',
    zoomBasedOpacity: false,
    color: [255, 255, 255, 255],
  };
  const placementPatches: { [iri: string]: Record<string, unknown> } = {};

  for (const organ of organs) {
    const iri = organ['@id'];
    const organSpatialEntity = (organSpatialEntities[iri] =
      db.scene.getSpatialEntity(iri));
    anatomicalStructures[iri] = db.scene.getAnatomicalStructures(iri);
    if (anatomicalStructures[iri].length === 0) {
      anatomicalStructures[iri] = [db.scene.getSpatialEntity(iri)];
    }
    extractionSets[iri] = db.scene.getExtractionSets(iri);
    organIRILookup[[organ.label, organ.sex, organ.side].join('|')] = iri;

    const organPatches = db.store.getSubjects(
      ccf.spatialPlacement.target,
      iri,
      null
    );
    for (const subject of organPatches) {
      const placement = getSpatialPlacement(db.store, subject.id);
      const source = placement.source['@id'];

      // Ignore placements from spatial object references and the VH Male/Female entities
      if (
        !source.endsWith('Obj') &&
        !source.endsWith('#VHFemale') &&
        !source.endsWith('#VHMale')
      ) {
        placementPatches[placement.source['@id']] = {
          ...placement,
          source,
          target: iri,
        };
      }
    }

    const nodes = [
      anatomicalStructures[iri],
      ...extractionSets[iri].map((set) => set.extractionSites),
    ].reduce((acc, n) => acc.concat(n), []);

    for (const node of nodes) {
      if (!sceneNodeLookup[node['@id']]) {
        const sceneNode = db.scene.getSceneNode(
          node,
          organSpatialEntity,
          sceneNodeAttrs
        );
        if (sceneNode) {
          const dimensions = [
            organSpatialEntity.x_dimension,
            organSpatialEntity.y_dimension,
            organSpatialEntity.z_dimension,
          ].map((n) => -n / 1000 / 2);

          sceneNode.transformMatrix = new Matrix4(Matrix4.IDENTITY)
            .translate(dimensions)
            .multiplyRight(sceneNode.transformMatrix);
          sceneNode.representation_of =
            sceneNode.representation_of ?? sceneNode['@id'];
          sceneNodeLookup[node['@id']] = sceneNode;
        } else {
          console.log(node.label);
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const simpleSceneNodes = await simplifyScene(Object.values(sceneNodeLookup));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const simpleSceneNodeLookup = simpleSceneNodes.reduce((acc, node) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    acc[node['@id']] = node;
    return acc;
  }, {});

  const data = {
    organIRILookup,
    organSpatialEntities,
    anatomicalStructures,
    extractionSets,
    sceneNodeLookup,
    simpleSceneNodeLookup,
    placementPatches,
  };

  if (outputFile) {
    writeFileSync(outputFile, JSON.stringify(data, null, 2));
  } else {
    console.log(data);
  }
}
main(argv.length >= 2 ? argv[2] : undefined);
