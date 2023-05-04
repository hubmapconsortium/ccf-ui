import { __awaiter } from 'tslib';
import { get as get$1, delMany, setMany } from 'idb-keyval';
import { readQuads, Util, DataFactory, addJsonLdToStore, Store, deserializeN3Store, addN3ToStore, addRdfXmlToStore, serializeN3Store } from 'triple-store-utils';
import { toRadians, Matrix4, Euler, toDegrees } from '@math.gl/core';
import { DirectedGraph } from 'graphology';
import shortestPath from 'graphology-shortest-path/unweighted';
import { sortBy, get, toNumber, set, omit, isFinite, memoize } from 'lodash';
import { v4 } from 'uuid';
import { fromRdf } from 'rdf-literal';
import { OrientedBoundingBox } from '@math.gl/culling';

/**
 * Iterates over the key/value pairs for an IRI, using the specified mapping with quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param mapping Property mappings.
 * @returns an iterator over the key/value pairs
 */
function* getEntries(store, iri, mapping) {
    for (const [predicate, key] of Object.entries(mapping)) {
        for (const quad of readQuads(store, iri, predicate, null, null)) {
            const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
            yield [key, value];
        }
    }
}
/**
 * Creates an object of the specified type using quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param type Type name.
 * @param mapping Property mappings.
 * @returns A new data object.
 */
function getMappedResult(store, iri, type, mapping) {
    const result = { '@id': iri, '@type': type };
    for (const [predicate, key] of Object.entries(mapping)) {
        for (const quad of readQuads(store, result['@id'], predicate, null, null)) {
            const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
            result[key] = value;
        }
    }
    return result;
}

/* eslint-disable @typescript-eslint/naming-convention */
/** Constants used to create entity accessors. */
const PREFIXES = {
    base: 'http://purl.org/ccf/latest/ccf.owl#',
    ccf: 'http://purl.org/ccf/',
    fma: 'http://purl.org/sig/ont/fma/fma',
    obo: 'http://purl.obolibrary.org/obo/',
    uberon: 'http://purl.obolibrary.org/obo/UBERON_',
    cl: 'http://purl.obolibrary.org/obo/CL_',
    lmha: 'http://purl.obolibrary.org/obo/LMHA_',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    dc: 'http://purl.org/dc/elements/1.1/',
    dcterms: 'http://purl.org/dc/terms/'
};
/** Prefix factory. */
const prefixer = Util.prefixes(PREFIXES, DataFactory);
const rdf = {
    x: prefixer('rdf'),
    type: prefixer('rdf')('type')
};
const rdfs = {
    x: prefixer('rdfs'),
    label: prefixer('rdfs')('label'),
    comment: prefixer('rdfs')('comment'),
    isDefinedBy: prefixer('rdfs')('isDefinedBy'),
    seeAlso: prefixer('rdfs')('seeAlso')
};
/** CCF id helper. */
const ccfx = prefixer('ccf');
/** Common entity ids. */
const entity = {
    id: prefixer('ccf')('has_registration_location'),
    label: prefixer('rdfs')('label'),
    description: prefixer('rdfs')('comment'),
    link: ccfx('url'),
    sex: ccfx('sex'),
    age: ccfx('age'),
    bmi: ccfx('bmi'),
    Male: DataFactory.literal('Male'),
    Female: DataFactory.literal('Female'),
    consortiumName: ccfx('consortium_name'),
    providerName: ccfx('tissue_provider_name'),
    providerUUID: ccfx('tissue_provider_uuid'),
    donor: ccfx('comes_from'),
    sections: ccfx('subdivided_into_sections'),
    datasets: ccfx('generates_dataset'),
    sampleType: ccfx('sample_type'),
    TissueBlock: DataFactory.literal('Tissue Block'),
    TissueSection: DataFactory.literal('Tissue Section'),
    NonStandard: DataFactory.literal('Non-standard'),
    sectionCount: ccfx('section_count'),
    sectionSize: ccfx('section_size'),
    sectionUnits: ccfx('section_size_unit'),
    sectionNumber: ccfx('section_number'),
    spatialEntity: ccfx('has_registration_location'),
    ontologyTerms: ccfx('has_ontology_term'),
    cellTypeTerms: ccfx('has_cell_type_term'),
    technology: ccfx('technology'),
    thumbnail: ccfx('thumbnail')
};
/** CCF specific ids. */
const ccf = {
    x: ccfx,
    base: prefixer('base'),
    ontologyNode: {
        label: ccfx('ccf_pref_label'),
        parent: ccfx('ccf_part_of'),
        children: ccfx('ccf_part_of'),
        rui_rank: ccfx('rui_rank'),
        synonymLabels: DataFactory.namedNode('http://www.geneontology.org/formats/oboInOwl#hasExactSynonym')
    },
    asctb: {
        part_of: ccfx('ccf_part_of'),
        ct_is_a: ccfx('ccf_ct_isa'),
        located_in: ccfx('ccf_located_in'),
        characterizes: ccfx('ccf_characterizes')
    },
    spatial: {
        Female: prefixer('base')('VHFemale'),
        Male: prefixer('base')('VHMale'),
        BothSexes: prefixer('base')('VHBothSexes'),
        FemaleOrgans: prefixer('base')('VHFemaleOrgans'),
        MaleOrgans: prefixer('base')('VHMaleOrgans')
    },
    SpatialObjectReference: ccfx('spatial_object_reference'),
    SpatialEntity: ccfx('spatial_entity'),
    SpatialPlacement: ccfx('spatial_placement'),
    spatialObjectReference: {
        file: ccfx('file_url'),
        file_format: ccfx('file_format'),
        file_subpath: ccfx('file_subpath')
    },
    extractionSet: {
        label: prefixer('rdfs')('label'),
        rui_rank: ccfx('rui_rank')
    },
    spatialEntity: {
        label: prefixer('rdfs')('label'),
        description: prefixer('rdfs')('comment'),
        creator: prefixer('dcterms')('creator'),
        creator_first_name: ccfx('creator_first_name'),
        creator_last_name: ccfx('creator_last_name'),
        creator_orcid: ccfx('creator_orcid'),
        creation_date: prefixer('dcterms')('created'),
        updated_date: ccfx('updated_date'),
        ccf_annotations: ccfx('collides_with'),
        representation_of: ccfx('representation_of'),
        reference_organ: ccfx('has_reference_organ'),
        extraction_set_for: ccfx('extraction_set_for'),
        extraction_set: ccfx('has_extraction_set'),
        sex: ccfx('organ_owner_sex'),
        side: ccfx('organ_side'),
        rui_rank: ccfx('rui_rank'),
        slice_thickness: ccfx('slice_thickness'),
        slice_count: ccfx('slice_count'),
        x_dimension: ccfx('x_dimension'),
        y_dimension: ccfx('y_dimension'),
        z_dimension: ccfx('z_dimension'),
        dimension_units: ccfx('dimension_unit'),
        object: ccfx('has_object_reference')
    },
    spatialPlacement: {
        source: ccfx('placement_for'),
        target: ccfx('placement_relative_to'),
        placement_date: prefixer('dcterms')('created'),
        x_scaling: ccfx('x_scaling'),
        y_scaling: ccfx('y_scaling'),
        z_scaling: ccfx('z_scaling'),
        scaling_units: ccfx('scaling_unit'),
        x_rotation: ccfx('x_rotation'),
        y_rotation: ccfx('y_rotation'),
        z_rotation: ccfx('z_rotation'),
        w_rotation: ccfx('theta_rotation'),
        rotation_order: ccfx('rotation_order'),
        rotation_units: ccfx('rotation_unit'),
        x_translation: ccfx('x_translation'),
        y_translation: ccfx('y_translation'),
        z_translation: ccfx('z_translation'),
        translation_units: ccfx('translation_unit')
    }
};
/** Uberon specific ids. */
const uberon = {
    x: prefixer('uberon'),
    body: prefixer('uberon')('0013702')
};
/** CL specific ids. */
const cl = {
    x: prefixer('cl'),
    cell: prefixer('cl')('0000000')
};
/** FMA specific ids. */
const fma = {
    x: prefixer('fma')
};
/** LMHA specific ids. */
const lmha = {
    x: prefixer('lmha')
};
/** RUI accessors. */
const rui = {
    body: uberon.body,
    cell: cl.cell,
    respiratory_system: uberon.x('0001004'),
    colon: uberon.x('0001155'),
    left_lung: uberon.x('0002168'),
    right_lung: uberon.x('0002167'),
    left_bronchus: uberon.x('0002178'),
    right_bronchus: uberon.x('0002177'),
    kidney: uberon.x('0002113'),
    ureter: uberon.x('0000056'),
    eye: uberon.x('0000970'),
    fallopian_tube: uberon.x('0003889'),
    knee: uberon.x('0001465'),
    ovary: uberon.x('0000992'),
    trachea: uberon.x('0003126'),
    aorta: uberon.x('0000947'),
    blood: uberon.x('0000178'),
    bone_marrow: uberon.x('0002371'),
    male_reproductive_system: uberon.x('0000079'),
    lymph_node: uberon.x('0000029'),
    // Derived using console.log(ALL_POSSIBLE_ORGANS.map(o => `  ${o.name.toLowerCase().replace(',', '').replace(/ /g, '_')}: ${o.id.split('/').slice(-1)[0].split('_')[0].toLowerCase()}.x('${o.id.split('_').slice(-1)[0]}'),`).join('\n'));
    blood_vasculature: uberon.x('0004537'),
    brain: uberon.x('0000955'),
    eye_left: uberon.x('0004548'),
    eye_right: fma.x('54449'),
    fallopian_tube_left: uberon.x('0001303'),
    fallopian_tube_right: uberon.x('0001302'),
    heart: uberon.x('0000948'),
    kidney_left: uberon.x('0004538'),
    kidney_right: uberon.x('0004539'),
    knee_left: fma.x('24978'),
    knee_right: fma.x('24977'),
    large_intestine: uberon.x('0000059'),
    liver: uberon.x('0002107'),
    lungs: uberon.x('0002048'),
    mesenteric_lymph_node: uberon.x('0002509'),
    ovary_left: fma.x('7214'),
    ovary_right: fma.x('7213'),
    pancreas: uberon.x('0001264'),
    pelvis: uberon.x('0001270'),
    prostate_gland: uberon.x('0002367'),
    skin: uberon.x('0002097'),
    small_intestine: uberon.x('0002108'),
    spleen: uberon.x('0002106'),
    thymus: uberon.x('0002370'),
    ureter_left: uberon.x('0001223'),
    ureter_right: uberon.x('0001222'),
    urinary_bladder: uberon.x('0001255'),
    uterus: uberon.x('0000995')
};

/**
 * Reverses the keys and values in a mapping.
 *
 * @param mapping The mapping to reverse.
 * @returns The reversed mapping.
 */
function reverseMapping(mapping) {
    const newMapping = {};
    Object.entries(mapping).forEach(([prop, predicate]) => {
        newMapping[predicate.id] = prop;
    });
    return newMapping;
}
/** A mapping of spatial objects. */
const mappings = {
    spatialObjectReference: reverseMapping(ccf.spatialObjectReference),
    spatialEntity: reverseMapping(ccf.spatialEntity),
    spatialPlacement: reverseMapping(ccf.spatialPlacement)
};
/**
 * Creates a spatial object reference.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new reference.
 */
function getSpatialObjectReference(store, iri) {
    return getMappedResult(store, iri, 'SpatialObjectReference', mappings.spatialObjectReference);
}
/**
 * Creates an extraction set data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
function getExtractionSet(store, iri) {
    const result = getMappedResult(store, iri, 'ExtractionSet', mappings.spatialEntity);
    result.extractionSites = sortBy(store.getSubjects(ccf.spatialEntity.extraction_set, iri, null)
        .map((value) => getSpatialEntity(store, value.id)), ['rui_rank']);
    return result;
}
/**
 * Gets extraction sets associated with a reference organ
 *
 * @param store The triple store.
 * @param iri The data identifier (the reference organ).
 * @returns A set of extraction sets associated with the reference organ
 */
function getExtractionSets(store, iri) {
    return sortBy(store.getSubjects(ccf.spatialEntity.extraction_set_for, iri, null)
        .map((value) => getExtractionSet(store, value.id)), ['rui_rank']);
}
/**
 * Gets the anatomical structures associated with a reference organ.
 *
 * @param store The triple store.
 * @param iri The data identifier (reference organ).
 * @returns The new entity.
 */
function getAnatomicalStructures(store, iri) {
    return sortBy(store.getSubjects(ccf.spatialEntity.reference_organ, iri, null)
        .map((value) => getSpatialEntity(store, value.id))
        .filter((e) => e['@id'] !== iri), ['rui_rank']);
}
/**
 * Gets all reference organs in the triple store
 *
 * @param store The triple store.
 * @returns All the reference organs.
 */
function getReferenceOrgans(store) {
    const results = [];
    store.forEach((quad) => {
        if (quad.subject.id === quad.object.id) {
            results.push(getSpatialEntity(store, quad.subject.id));
        }
    }, null, ccf.spatialEntity.reference_organ, null, null);
    return sortBy(results, ['rui_rank']);
}
/**
 * Creates a spatial entity data object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns The new entity.
 */
function getSpatialEntity(store, iri) {
    const result = getMappedResult(store, iri, 'SpatialEntity', mappings.spatialEntity);
    // Default mapping will come back as an IRI which we can look up for the full object
    if (result.object) {
        result.object = getSpatialObjectReference(store, result.object);
    }
    if (result.ccf_annotations) {
        result.ccf_annotations = store.getObjects(iri, ccf.spatialEntity.ccf_annotations, null).map(o => o.id);
    }
    store.forSubjects((subject) => (result.entityId = subject.id), entity.spatialEntity, iri, null);
    return result;
}
/**
 * Creates a spatial placement object.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @returns THe new placement object.
 */
function getSpatialPlacement(store, iri) {
    const result = getMappedResult(store, iri, 'SpatialPlacement', mappings.spatialPlacement);
    // Default mapping will come back as an IRI for source/target which we can look up for the full object
    if (result.source) {
        result.source = getSpatialEntity(store, result.source);
    }
    if (result.target) {
        result.target = getSpatialEntity(store, result.target);
    }
    return result;
}
/**
 * Creates a spatial entity based on another entity in the store.
 *
 * @param store The triple store.
 * @param entityIRI The indentifier of the store entity.
 * @returns A new entity.
 */
function getSpatialEntityForEntity(store, entityIRI) {
    const spatialEntityNodes = store.getObjects(DataFactory.namedNode(entityIRI), entity.spatialEntity, null);
    if (spatialEntityNodes.length > 0) {
        return getSpatialEntity(store, spatialEntityNodes[0].id);
    }
    else {
        return undefined;
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
function applySpatialPlacement(tx, placement) {
    const p = placement;
    let factor;
    switch (p.translation_units) {
        case 'centimeter':
            factor = 1 / 100;
            break;
        case 'millimeter':
            factor = 1 / 1000;
            break;
        case 'meter':
        default:
            factor = 1;
            break;
    }
    const T = [p.x_translation, p.y_translation, p.z_translation].map(t => t * factor);
    const R = [p.x_rotation, p.y_rotation, p.z_rotation].map(toRadians);
    const S = [p.x_scaling, p.y_scaling, p.z_scaling];
    return tx.translate(T).rotateXYZ(R).scale(S);
}
class CCFSpatialGraph {
    constructor(db) {
        this.db = db;
        this.createGraph();
    }
    createGraph() {
        this.graph = new DirectedGraph();
        const store = this.db.store;
        // Add all Spatial Object References
        store.forSubjects((subject) => {
            this.addNode(subject.id, 'SpatialObjectReference');
        }, rdf.type, ccf.SpatialObjectReference, null);
        // Add all Spatial Entities
        store.forSubjects((subject) => {
            this.addNode(subject.id, 'SpatialEntity');
        }, rdf.type, ccf.SpatialEntity, null);
        // Add all Spatial Placements
        const edgeSource = {};
        for (const quad of readQuads(store, null, ccf.spatialPlacement.source, null, null)) {
            edgeSource[quad.subject.id] = quad.object.id;
        }
        for (const quad of readQuads(store, null, ccf.spatialPlacement.target, null, null)) {
            const source = edgeSource[quad.subject.id];
            if (source) {
                this.addEdge(quad.subject.id, source, quad.object.id, 'SpatialPlacement');
            }
        }
    }
    addNode(id, type) {
        this.graph.mergeNode(id, { type });
    }
    addEdge(id, source, target, type) {
        this.graph.mergeDirectedEdge(source, target, { type, id });
    }
    getTransformationMatrix(sourceIRI, targetIRI) {
        if (sourceIRI === targetIRI) {
            return new Matrix4(Matrix4.IDENTITY); // identity
        }
        if (!this.graph.hasNode(sourceIRI) || !this.graph.hasNode(targetIRI)) {
            return undefined;
        }
        const store = this.db.store;
        const tx = new Matrix4(Matrix4.IDENTITY);
        const path = shortestPath(this.graph, sourceIRI, targetIRI);
        if (path && path.length > 0) {
            path.reverse();
            let target = '';
            for (const source of path) {
                if (target) {
                    const placementId = this.graph.getEdgeAttribute(source, target, 'id');
                    const placement = getSpatialPlacement(store, placementId);
                    applySpatialPlacement(tx, placement);
                }
                target = source;
            }
            return tx;
        }
        else {
            return undefined;
        }
    }
    getSpatialPlacement(source, targetIri) {
        const sourceIri = this.graph.hasNode(source['@id']) ? source['@id'] : undefined;
        const placement = get(source, 'placement[0]', get(source, 'placement', undefined));
        let matrix;
        if (placement && this.graph.hasNode(placement.target)) {
            matrix = this.getTransformationMatrix(placement.target, targetIri);
            if (matrix) {
                matrix = applySpatialPlacement(matrix, placement);
            }
        }
        else if (sourceIri) {
            matrix = this.getTransformationMatrix(sourceIri, targetIri);
        }
        if (matrix) {
            const euler = new Euler().fromRotationMatrix(matrix, Euler.XYZ);
            const T = matrix.getTranslation().map(n => n * 1000);
            const R = euler.toVector3().map(toDegrees);
            const S = matrix.getScale().map(n => n < 1 && n > 0.999999 ? 1 : n);
            return {
                '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
                '@id': `http://purl.org/ccf/1.5/${v4()}_placement`,
                '@type': 'SpatialPlacement',
                source: source['@id'],
                target: targetIri,
                placement_date: new Date().toISOString().split('T')[0],
                x_scaling: S[0],
                y_scaling: S[1],
                z_scaling: S[2],
                scaling_units: 'ratio',
                x_rotation: R[0],
                y_rotation: R[1],
                z_rotation: R[2],
                rotation_order: 'XYZ',
                rotation_units: 'degree',
                x_translation: T[0],
                y_translation: T[1],
                z_translation: T[2],
                translation_units: 'millimeter'
            };
        }
        else {
            return undefined;
        }
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
class CCFSpatialScene {
    constructor(db) {
        this.db = db;
    }
    getSpatialEntity(iri) {
        return getSpatialEntity(this.db.store, iri);
    }
    getExtractionSets(iri) {
        return getExtractionSets(this.db.store, iri);
    }
    getExtractionSet(iri) {
        return getExtractionSet(this.db.store, iri);
    }
    getAnatomicalStructures(iri) {
        return getAnatomicalStructures(this.db.store, iri);
    }
    getReferenceOrgans() {
        return getReferenceOrgans(this.db.store);
    }
    getReferenceBody(filter) {
        let bodyId;
        switch (filter === null || filter === void 0 ? void 0 : filter.sex) {
            case 'Male':
                bodyId = ccf.spatial.Male.id;
                break;
            case 'Female':
                bodyId = ccf.spatial.Female.id;
                break;
            case 'Both':
            default:
                bodyId = ccf.spatial.BothSexes.id;
                break;
        }
        return this.getSpatialEntity(bodyId);
    }
    getReferenceOrganSets(filter) {
        let organSet = this.getReferenceOrgans();
        switch (filter === null || filter === void 0 ? void 0 : filter.sex) {
            case 'Male':
                organSet = organSet.filter(s => s.sex === 'Male');
                break;
            case 'Female':
                organSet = organSet.filter(s => s.sex === 'Female');
                break;
            case 'Both':
            default:
                break;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.debug) {
            organSet = organSet.map(o => [[o], this.getAnatomicalStructures(o['@id'])])
                .reduce((acc, [organ, structures]) => acc.concat(structures.length > 0 ? structures : organ), []);
        }
        return organSet;
    }
    getReferenceSceneNodes(filter) {
        const body = this.getReferenceBody(filter);
        const skinNodes = [];
        let nodes = [
            ...this.getReferenceOrganSets(filter).map((organ) => {
                const isSkin = organ.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
                const sceneNode = this.getSceneNode(organ, body, {
                    color: [255, 255, 255, 255], opacity: isSkin ? 0.5 : 0.2, unpickable: true, _lighting: 'pbr', zoomBasedOpacity: !isSkin
                });
                if (isSkin && sceneNode) {
                    skinNodes.push(sceneNode);
                    return undefined;
                }
                else {
                    return sceneNode;
                }
            })
        ];
        if (skinNodes.length > 0) {
            nodes = [...skinNodes, ...nodes];
        }
        if (filter === null || filter === void 0 ? void 0 : filter.debug) {
            // Debug bounding boxes
            nodes = nodes.concat([
                this.getSceneNode(this.getSpatialEntity(ccf.base('VHRightKidney').id), body, { color: [0, 0, 255, 0.5 * 255], geometry: 'wireframe' }),
                this.getSceneNode(this.getSpatialEntity(ccf.base('VHLeftKidney').id), body, { color: [255, 0, 0, 0.5 * 255], geometry: 'wireframe' }),
                this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC1').id), body, { color: [0, 255, 0, 0.5 * 255], geometry: 'wireframe' }),
                this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC2').id), body, { color: [0, 255, 0, 0.5 * 255], geometry: 'wireframe' }),
                this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC3').id), body, { color: [0, 255, 0, 0.5 * 255], geometry: 'wireframe' })
            ]);
        }
        return nodes.filter(s => s !== undefined);
    }
    getReferenceOrganScene(organIri, filter) {
        var _a, _b;
        const hasSexFilter = (filter === null || filter === void 0 ? void 0 : filter.sex) !== undefined && ((_a = filter === null || filter === void 0 ? void 0 : filter.sex) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'both';
        const organs = this.getReferenceOrgans().filter((o) => o.representation_of === organIri && (!hasSexFilter || o.sex === (filter === null || filter === void 0 ? void 0 : filter.sex)));
        if (organs.length > 0) {
            const organ = organs[0];
            const isSkin = organ.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
            const organNode = this.getSceneNode(organ, organ, {
                color: [255, 255, 255, 255], opacity: isSkin ? 0.5 : 0.2, unpickable: true, _lighting: 'pbr'
            });
            const scene = ((_b = this.db.getSpatialEntities(filter)) !== null && _b !== void 0 ? _b : []).map((entity) => this.getSceneNode(entity, organ, { color: [255, 255, 255, 0.9 * 255] }));
            return [organNode].concat(scene).filter(n => n !== undefined);
        }
        else {
            return [];
        }
    }
    getEntitySceneNodes(filter) {
        const body = this.getReferenceBody(filter);
        return this.db.getSpatialEntities(filter).map((entity) => this.getSceneNode(entity, body, { color: [255, 255, 255, 0.9 * 255] })).filter(s => s !== undefined);
    }
    getSceneNode(source, target, nodeAttrs = {}) {
        var _a, _b, _c, _d;
        const has3dObject = (_b = (_a = source === null || source === void 0 ? void 0 : source.object) === null || _a === void 0 ? void 0 : _a.file_format) === null || _b === void 0 ? void 0 : _b.startsWith('model/gltf');
        const sourceID = has3dObject && source.object ? source.object['@id'] : source['@id'];
        let transform = this.db.graph.getTransformationMatrix(sourceID, target['@id']);
        if (transform) {
            if (has3dObject) {
                transform = new Matrix4(Matrix4.IDENTITY).rotateX(toRadians(90)).multiplyLeft(transform);
            }
            else {
                // Scale visible bounding boxes to the desired dimensions
                let factor;
                switch (source.dimension_units) {
                    case 'centimeter':
                        factor = 1 / 100;
                        break;
                    case 'millimeter':
                        factor = 1 / 1000;
                        break;
                    case 'meter':
                    default:
                        factor = 1;
                        break;
                }
                const scale = [source.x_dimension, source.y_dimension, source.z_dimension].map(dim => dim * factor / 2);
                transform.scale(scale);
            }
            return Object.assign({ '@id': source['@id'], '@type': 'SpatialSceneNode', entityId: source.entityId, ccf_annotations: source.ccf_annotations, representation_of: source.representation_of, reference_organ: source.reference_organ, scenegraph: has3dObject ? (_c = source.object) === null || _c === void 0 ? void 0 : _c.file : undefined, scenegraphNode: has3dObject ? (_d = source.object) === null || _d === void 0 ? void 0 : _d.file_subpath : undefined, transformMatrix: transform, tooltip: source.label }, nodeAttrs);
        }
        else {
            return undefined;
        }
    }
    getScene(filter) {
        return [
            ...this.getReferenceSceneNodes(filter),
            ...this.getEntitySceneNodes(filter)
        ];
    }
}

const HBM_PREFIX = 'https://entity.api.hubmapconsortium.org/entities/';
// eslint-disable-next-line max-len
const DR1_VU_THUMBS = new Set(['VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0009-LK-102-7-AF_preIMS_registered_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-PAS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-AF_preIMS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0013-LK-202-96-AF_preIMS_registered_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-PAS_registered_thumbnail.jpg', 'VAN0013-LK-202-97-AF_preMxIF_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0014-LK-203-108-AF_preIMS_registered_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-PAS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-AF_preIMS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg']);
// eslint-disable-next-line max-len
const UFL_THUMBS = { 'HBM558.SRZG.629': 'HBM558.SRZG.629_UFL0002-SP-3-4-1.jpg', 'HBM562.NTMH.548': 'HBM562.NTMH.548_UFL0006-SP-1-2-1.jpg', 'HBM685.KHRQ.684': 'HBM685.KHRQ.684_UFL0008-LY07-1-1.jpg', 'HBM278.SFQW.627': 'HBM278.SFQW.627_UFL0008-LY09-1-1.jpg', 'HBM427.SMGB.866': 'HBM427.SMGB.866_UFL0004-SP-1-4-1.jpg', 'HBM432.LLCF.677': 'HBM432.LLCF.677_UFL0001-SP-2-5-1.jpg', 'HBM586.ZSVS.996': 'HBM586.ZSVS.996_UFL0008-SP-1-1-1.jpg', 'HBM285.XMBT.542': 'HBM285.XMBT.542_UFL0006-TH-1-3-1.jpg', 'HBM289.BWJW.663': 'HBM289.BWJW.663_UFL0006-TH-1-2-1.jpg', 'HBM255.SRPR.985': 'HBM255.SRPR.985_UFL0005-TH-2-2-1.jpg', 'HBM799.WXHD.535': 'HBM799.WXHD.535_UFL0009-LY02-1-1.jpg', 'HBM294.RZFN.624': 'HBM294.RZFN.624_UFL0005-TH-1-1-1.jpg', 'HBM383.TRQG.424': 'HBM383.TRQG.424_UFL0006-SP-1-3-1.jpg', 'HBM647.MFQB.496': 'HBM647.MFQB.496_UFL0001-SP-1-2-1.jpg', 'HBM237.GGPR.739': 'HBM237.GGPR.739_UFL0006-LY01-1-1.jpg', 'HBM288.TPBD.654': 'HBM288.TPBD.654_UFL0003-SP-2-2-1.jpg', 'HBM974.NDXT.675': 'HBM974.NDXT.675_UFL0008-TH-2-2-1.jpg', 'HBM589.SLVV.423': 'HBM589.SLVV.423_UFL0008-LY10-1-1.jpg', 'HBM794.RLFN.358': 'HBM794.RLFN.358_UFL0006-LY03-1-1.jpg', 'HBM372.BQSR.778': 'HBM372.BQSR.778_UFL0007-SP-1-1-1.jpg', 'HBM499.TKDW.458': 'HBM499.TKDW.458_UFL0009-LY03-1-1.jpg', 'HBM342.PRQB.739': 'HBM342.PRQB.739_UFL0003-LY06-1-1.jpg', 'HBM633.CLVN.674': 'HBM633.CLVN.674_UFL0003-SP-3-6-1.jpg', 'HBM343.JQKM.578': 'HBM343.JQKM.578_UFL0009-LY01-1-1.jpg', 'HBM987.XGTH.368': 'HBM987.XGTH.368_UFL0002-SP-2-4-1.jpg', 'HBM964.CWCP.788': 'HBM964.CWCP.788_UFL0006-LY02-2-1.jpg', 'HBM244.TJLK.223': 'HBM244.TJLK.223_UFL0003-SP-1-4-1.jpg', 'HBM646.FSBQ.966': 'HBM646.FSBQ.966_UFL0007-SP-2-2-1.jpg', 'HBM572.GXSB.234': 'HBM572.GXSB.234_UFL0003-SP-3-2-1.jpg', 'HBM772.TKGJ.794': 'HBM772.TKGJ.794_UFL0008-SP-2-1-1.jpg', 'HBM239.CBWR.263': 'HBM239.CBWR.263_UFL0008-SP-1-2-1.jpg', 'HBM992.NRTT.383': 'HBM992.NRTT.383_UFL0006-SP-1-1-1.jpg', 'HBM283.DQXD.546': 'HBM283.DQXD.546_UFL0003-SP-1-2-1.jpg', 'HBM795.JHND.856': 'HBM795.JHND.856_UFL0007-SP-1-2-1.jpg', 'HBM267.BZKT.867': 'HBM267.BZKT.867_UFL0003-SP-2-6-1.jpg', 'HBM838.DLMJ.782': 'HBM838.DLMJ.782_UFL0008-TH-1-1-1.jpg', 'HBM337.FSXL.564': 'HBM337.FSXL.564_UFL0001-SP-3-8-2.jpg', 'HBM355.JDLK.244': 'HBM355.JDLK.244_UFL0004-SP-2-4-1.jpg', 'HBM599.PSZG.737': 'HBM599.PSZG.737_UFL0006-LY02-1-1.jpg' };
/** UUID to TMC mapping. */
const GROUP_UUID_MAPPING = {
    '03b3d854-ed44-11e8-8bce-0e368f3075e8': 'TMC-UCSD',
    '07a29e4c-ed43-11e8-b56a-0e8017bdda58': 'TMC-Florida',
    '308f5ffc-ed43-11e8-b56a-0e8017bdda58': 'TMC-CalTech',
    '5bd084c8-edc2-11e8-802f-0e368f3075e8': 'HBM-TestingGroup',
    '73bb26e4-ed43-11e8-8f19-0a7c1eab007a': 'TMC-Vanderbilt',
    'def5fd76-ed43-11e8-b56a-0e8017bdda58': 'TMC-Stanford',
    '5c106f29-ea2d-11e9-85e8-0efb3ba9a670': 'RTI-General Electric',
    '301615f9-c870-11eb-a8dc-35ce3d8786fe': 'TMC-UConn'
};
const ENTITY_CONTEXT = {
    '@base': 'http://purl.org/ccf/latest/ccf-entity.owl#',
    '@vocab': 'http://purl.org/ccf/latest/ccf-entity.owl#',
    ccf: 'http://purl.org/ccf/',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    label: 'rdfs:label',
    description: 'rdfs:comment',
    link: {
        '@id': 'rdfs:seeAlso',
        '@type': '@id'
    },
    samples: {
        '@reverse': 'has_donor'
    },
    sections: {
        '@id': 'has_tissue_section',
        '@type': '@id'
    },
    datasets: {
        '@id': 'has_dataset',
        '@type': '@id'
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    rui_location: {
        '@id': 'has_spatial_entity',
        '@type': '@id'
    },
    ontologyTerms: {
        '@id': 'has_ontology_term',
        '@type': '@id'
    },
    cellTypeTerms: {
        '@id': 'has_cell_type_term',
        '@type': '@id'
    },
    thumbnail: {
        '@id': 'has_thumbnail'
    }
};
/**
 * Converts a hubmap response object into JsonLd.
 *
 * @param data The hubmap data.
 * @returns The converted data.
 */
function hubmapResponseAsJsonLd(data, assetsApi = '', portalUrl = '', serviceToken, debug = false) {
    const entries = get(data, 'hits.hits', [])
        .map(e => get(e, '_source', {}))
        .sort((a, b) => a['uuid'].localeCompare(b['uuid']));
    const donorLookup = {};
    const unflattened = entries.map(e => new HuBMAPTissueBlock(e, assetsApi, portalUrl, serviceToken).toJsonLd());
    for (const donor of unflattened) {
        const donorId = donor['@id'];
        if (!donorLookup[donorId]) {
            donorLookup[donorId] = donor;
        }
        else {
            const samples = donorLookup[donorId].samples;
            samples.push(donor.samples[0]);
        }
    }
    const donors = Object.values(donorLookup);
    if (debug) {
        debugDonors(donors);
        console.log(donors.map(d => (Object.assign({ '@context': ENTITY_CONTEXT }, d))));
    }
    return { '@context': ENTITY_CONTEXT, '@graph': donors };
}
function debugDonors(donors) {
    let datasets = [];
    let deleted = 0;
    for (const donor of donors.filter(d => d.samples.length > 1)) {
        const samples = donor.samples;
        for (let i = 0; i < samples.length; i++) {
            const blockId = samples[i]['@id'];
            datasets = datasets.concat(samples[i].datasets);
            for (const section of samples[i].sections) {
                datasets = datasets.concat(section.datasets);
            }
            for (let j = i + 1; j < samples.length; j++) {
                const sections = samples[j].sections;
                if (sections.find(s => s['@id'] === blockId)) {
                    samples[i].deleteMe = true;
                    deleted++;
                }
            }
        }
        donor.samples = samples.filter(s => s.deleteMe !== true);
    }
    if (deleted > 0) {
        console.log(`⚠ ${deleted} sections identified as blocks`);
    }
}
class HuBMAPTissueBlock {
    constructor(data, assetsApi = '', portalUrl = '', serviceToken) {
        var _a, _b;
        this.data = data;
        this.bad = false;
        this['@type'] = 'Sample';
        this.sample_type = 'Tissue Block';
        const entityType = this.data.entity_type;
        if (entityType !== 'Sample') {
            this.bad = true;
            return;
        }
        const ancestors = (this.data.ancestors || []);
        const descendants = (this.data.descendants || []);
        const donor = ancestors.find(e => e.entity_type === 'Donor');
        this.donor = this.getDonor(donor, portalUrl);
        const ruiLocation = this.getRuiLocation(data, this.donor);
        if (!ruiLocation) {
            this.bad = true;
        }
        else {
            this.rui_location = ruiLocation;
        }
        if (!GROUP_UUID_MAPPING[data.group_uuid]) {
            GROUP_UUID_MAPPING[data.group_uuid] = data.group_name;
        }
        const dateEntered = new Date(data.last_modified_timestamp).toLocaleDateString();
        const groupName = GROUP_UUID_MAPPING[data.group_uuid] || data.group_name;
        const creator = data.created_by_user_displayname;
        this['@id'] = HBM_PREFIX + data.uuid;
        this.label = `Registered ${dateEntered}, ${creator}, ${groupName}`;
        this.link = `${portalUrl}browse/sample/${data.uuid}`;
        const sectionLookup = {};
        const sections = [];
        this.sections = sections;
        const datasets = [];
        this.datasets = datasets;
        for (const descendant of descendants.filter(d => d.entity_type === 'Sample')) {
            const section = this.getSection(descendant, data, portalUrl);
            const sectionId = descendant.submission_id;
            sectionLookup[sectionId] = section;
            sections.push(section);
            section.section_number = (_a = section.section_number) !== null && _a !== void 0 ? _a : sections.length;
        }
        for (const descendant of descendants) {
            if (descendant.entity_type === 'Dataset') {
                const dataset = this.getDataset(descendant, assetsApi, portalUrl, serviceToken);
                const sectionId = get(descendant, ['ingest_metadata', 'metadata', 'tissue_id']);
                if (sectionLookup[sectionId]) {
                    (_b = sectionLookup[sectionId].datasets) === null || _b === void 0 ? void 0 : _b.push(dataset);
                }
                else {
                    datasets.push(dataset);
                }
            }
        }
        const loc = ruiLocation !== null && ruiLocation !== void 0 ? ruiLocation : {};
        const dims = `${loc.x_dimension} x ${loc.y_dimension} x ${loc.z_dimension} ${loc.dimension_units}`;
        this.section_count = loc.slice_count || sections.length;
        const sSize = parseFloat((loc.slice_thickness ||
            ((loc.z_dimension || 0) / Math.max(this.section_count, 1)))
            .toFixed(1));
        this.section_size = sSize;
        const sUnits = loc.dimension_units || 'millimeter';
        this.section_units = sUnits;
        this.description = `${dims}, ${sSize} ${sUnits}, ${data.specimen_type}, ${this.section_count} Sections`;
        sections.forEach((section, index) => {
            section.description = `${loc.x_dimension} x ${loc.y_dimension} x ${sSize} ${sUnits}, ${sSize} ${sUnits}, ${section.description}`;
            section.section_number = index + 1;
        });
    }
    getSection(section, data, portalUrl) {
        const dateEntered = new Date(section.last_modified_timestamp).toLocaleDateString();
        const groupName = GROUP_UUID_MAPPING[section.group_uuid] || section.group_name;
        const creator = section.created_by_user_displayname;
        return {
            '@id': HBM_PREFIX + section.uuid,
            '@type': 'Sample',
            label: `Registered ${dateEntered}, ${creator}, ${groupName}`,
            description: `${data.specimen_type}`,
            link: `${portalUrl}browse/sample/${section.uuid}`,
            sample_type: 'Tissue Section',
            section_number: 1,
            samples: [],
            datasets: []
        };
    }
    getDataset(dataset, assetsApi = '', portalUrl = '', serviceToken) {
        var _a;
        const dateEntered = new Date(dataset.last_modified_timestamp).toLocaleDateString();
        const groupName = GROUP_UUID_MAPPING[dataset.group_uuid] || dataset.group_name;
        const creator = dataset.created_by_user_displayname;
        const types = [
            ...dataset.data_types,
            get(dataset, ['ingest_metadata', 'metadata', 'assay_type'], '')
        ];
        const typesSearch = types.join('|').toLowerCase();
        let technology;
        let thumbnail = 'assets/icons/ico-unknown.svg';
        if (typesSearch.indexOf('10x') !== -1) {
            technology = '10x';
            thumbnail = 'assets/icons/ico-bulk-10x.svg';
        }
        else if (typesSearch.indexOf('af') !== -1) {
            technology = 'AF';
            thumbnail = 'assets/icons/ico-spatial-af.svg';
        }
        else if (typesSearch.indexOf('codex') !== -1) {
            technology = 'CODEX';
            thumbnail = 'assets/icons/ico-spatial-codex.svg';
        }
        else if (typesSearch.indexOf('imc') !== -1) {
            technology = 'IMC';
            thumbnail = 'assets/icons/ico-spatial-imc.svg';
        }
        else if ((typesSearch.indexOf('lc') !== -1) && (typesSearch.indexOf('af') === -1)) {
            technology = 'LC';
            thumbnail = 'assets/icons/ico-bulk-lc.svg';
        }
        else if (typesSearch.indexOf('maldi') !== -1) {
            technology = 'MALDI';
        }
        else if (typesSearch.indexOf('pas') !== -1) {
            technology = 'PAS';
        }
        else {
            technology = 'OTHER';
        }
        thumbnail = (_a = this.getDatasetThumbnail(dataset, assetsApi, serviceToken)) !== null && _a !== void 0 ? _a : thumbnail;
        return {
            '@id': HBM_PREFIX + dataset.uuid,
            '@type': 'Dataset',
            label: `Registered ${dateEntered}, ${creator}, ${groupName}`,
            description: `Data/Assay Types: ${types.join(', ')}`,
            link: `${portalUrl}browse/dataset/${dataset.uuid}`,
            technology,
            thumbnail
        };
    }
    getDatasetThumbnail(dataset, assetsApi, serviceToken) {
        if (dataset.thumbnail_file) {
            const thumbnailFile = dataset.thumbnail_file;
            return `${assetsApi}/${thumbnailFile.file_uuid}/${thumbnailFile.filename}` + (serviceToken ? `?token=${serviceToken}` : '');
        }
        else if (dataset.group_uuid === '73bb26e4-ed43-11e8-8f19-0a7c1eab007a') { // TMC-Vanderbilt
            const tiffs = get(dataset, 'metadata.files', [])
                .filter(f => /\.(ome\.tif|ome\.tiff)$/.test(f.rel_path))
                .filter(f => !/(multilayer\.ome\.tif|_ac\.ome\.tif)/.test(f.rel_path))
                .filter(f => DR1_VU_THUMBS.has(f.rel_path.split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg')))
                .map(f => `${assetsApi}/${dataset.uuid}/${f.rel_path}` + (serviceToken ? `?token=${serviceToken}` : ''));
            if (tiffs.length > 0) {
                const thumb = tiffs[0].split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg');
                if (DR1_VU_THUMBS.has(thumb)) {
                    return `assets/thumbnails/TMC-Vanderbilt/DR1/${thumb}`;
                }
            }
        }
        else if (dataset.group_uuid === '07a29e4c-ed43-11e8-b56a-0e8017bdda58') { // TMC-Florida
            const thumb = UFL_THUMBS[dataset.hubmap_id];
            if (thumb) {
                return `assets/thumbnails/TMC-Florida/${thumb}`;
            }
        }
        return undefined;
    }
    getDonor(donor, portalUrl) {
        const donorDescription = (donor.description || '').toLowerCase();
        let sex;
        if (donorDescription.includes('female')) {
            sex = 'Female';
        }
        else if (donorDescription.includes('male')) {
            sex = 'Male';
        }
        const ageMatch = donorDescription.match(/age ([0-9]+)/);
        let age;
        if (ageMatch) {
            age = toNumber(ageMatch[1]);
        }
        let bmi;
        for (const md of get(donor, 'metadata.organ_donor_data', get(donor, 'metadata.living_donor_data', []))) {
            if (md.preferred_term === 'Feminine gender' || md.preferred_term === 'Female') {
                sex = 'Female';
            }
            else if (md.preferred_term === 'Masculine gender' || md.preferred_term === 'Male') {
                sex = 'Male';
            }
            else if (md.preferred_term === 'Current chronological age' || md.preferred_term === 'Age') {
                age = toNumber(md.data_value);
            }
            else if (md.preferred_term === 'Body mass index') {
                bmi = toNumber(md.data_value);
            }
        }
        let label = '';
        if (sex && age) {
            label += `${sex}, Age ${age}`;
            if (bmi) {
                label += `, BMI ${bmi.toFixed(1)}`;
            }
        }
        const dateEntered = new Date(donor.last_modified_timestamp).toLocaleDateString();
        const groupName = GROUP_UUID_MAPPING[donor.group_uuid] || donor.group_name;
        const creator = donor.created_by_user_displayname;
        return {
            '@id': HBM_PREFIX + donor.uuid,
            '@type': 'Donor',
            label,
            description: `Entered ${dateEntered}, ${creator}, ${groupName}`,
            link: `${portalUrl}browse/donor/${donor.uuid}`,
            age,
            sex,
            bmi,
            consortium_name: 'HuBMAP',
            provider_name: groupName,
            provider_uuid: donor.group_uuid,
            samples: []
        };
    }
    getRuiLocation(data, donor) {
        var _a;
        let spatialEntity;
        let ruiLocation = data.rui_location;
        if (ruiLocation) {
            // RUI Location may come in as an unparsed string
            if (typeof ruiLocation === 'string') {
                ruiLocation = JSON.parse(ruiLocation);
            }
            if (ruiLocation.alignment_id) { // Detect RUI 0.5 generated JSON
                console.log('Detected a deprecated rui_location', data.uuid);
            }
            else if (ruiLocation['@id']) { // Detect RUI 1.0+ generated JSON-LD
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                spatialEntity = ruiLocation;
            }
        }
        if (spatialEntity) {
            // Patch to fix RUI 0.5 Kidney and Spleen Placements
            const target = (_a = get(spatialEntity, ['placement', 'target'])) !== null && _a !== void 0 ? _a : '';
            if (target.startsWith('http://purl.org/ccf/latest/ccf.owl#VHSpleenCC')) {
                if (donor.sex === 'Male') {
                    set(spatialEntity, ['placement', 'target'], target.replace('#VHSpleenCC', '#VHMSpleenCC'));
                }
                else {
                    set(spatialEntity, ['placement', 'target'], target.replace('#VHSpleenCC', '#VHFSpleenCC'));
                }
            }
            else if (target === 'http://purl.org/ccf/latest/ccf.owl#VHLeftKidney' || target === 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney') {
                if (donor.sex === 'Male') {
                    set(spatialEntity, ['placement', 'target'], target.replace('#VH', '#VHM') + '_Patch');
                }
                else {
                    set(spatialEntity, ['placement', 'target'], target.replace('#VH', '#VHF') + '_Patch');
                }
            }
        }
        return spatialEntity;
    }
    getTissueBlock() {
        return omit(Object.assign({}, this), ['data', 'bad', 'donor']);
    }
    toJsonLd() {
        return Object.assign(Object.assign({}, this.donor), { samples: [this.getTissueBlock()] });
    }
}

// Reduce this value if including more data fields
const PER_API_SEARCH_REQUEST_COUNT = 250;
const INCLUDED_DATA_FIELDS = [
    'uuid', 'entity_type',
    'group_uuid', 'group_name',
    'last_modified_timestamp', 'created_by_user_displayname',
    'ancestors.entity_type',
    'ancestors.description',
    'ancestors.metadata.organ_donor_data.preferred_term',
    'ancestors.metadata.organ_donor_data.data_value',
    'ancestors.metadata.living_donor_data.preferred_term',
    'ancestors.metadata.living_donor_data.data_value',
    'ancestors.last_modified_timestamp',
    'ancestors.group_uuid',
    'ancestors.group_name',
    'ancestors.created_by_user_displayname',
    'ancestors.uuid',
    'descendants.entity_type',
    'descendants.ingest_metadata.metadata.tissue_id',
    'descendants.last_modified_timestamp',
    'descendants.group_uuid',
    'descendants.group_name',
    'descendants.created_by_user_displayname',
    'descendants.uuid',
    'descendants.data_types',
    'descendants.ingest_metadata.metadata.assay_type',
    'descendants.thumbnail_file',
    'descendants.metadata.files.rel_path',
    'rui_location', 'specimen_type'
];
const DEFAULT_API_SEARCH_QUERY = {
    exists: {
        field: 'rui_location'
    }
};
function getApiSearchHeaders(token) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
}
function getApiSearchBody(from, size, query) {
    const bodyObj = {
        version: true,
        from,
        size,
        stored_fields: ['*'],
        script_fields: {},
        docvalue_fields: [],
        query: query !== null && query !== void 0 ? query : DEFAULT_API_SEARCH_QUERY,
        _source: {
            includes: INCLUDED_DATA_FIELDS
        }
    };
    return JSON.stringify(bodyObj);
}
function doSearchRequest(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url, init);
            return res.ok ? (yield res.json()) : undefined;
        }
        catch (_error) {
            return undefined;
        }
    });
}
function doApiSearch(url, token, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const perReqCount = PER_API_SEARCH_REQUEST_COUNT;
        const headers = getApiSearchHeaders(token);
        const body = getApiSearchBody(0, perReqCount, query);
        const firstResult = yield doSearchRequest(url, { method: 'POST', headers, body });
        if (!firstResult) {
            return undefined;
        }
        const totalCount = firstResult.hits.total.value;
        if (totalCount <= perReqCount) {
            return firstResult;
        }
        const requests = [];
        for (let from = perReqCount; from < totalCount; from += perReqCount) {
            requests.push(doSearchRequest(url, {
                method: 'POST',
                headers,
                body: getApiSearchBody(from, perReqCount, query)
            }));
        }
        const results = yield Promise.all(requests);
        if (results.some(res => !res)) {
            return undefined;
        }
        const items = results.map(res => res.hits.hits);
        return Object.assign(Object.assign({}, firstResult), { hits: Object.assign(Object.assign({}, firstResult.hits), { hits: firstResult.hits.hits.concat(...items) }) });
    });
}
/**
 * Search the HuBMAP Search API and return CCF-compatible JSON-LD data
 *
 * @param dataUrl the search API url
 * @param serviceType 'static' if a statically saved response or 'search-api' if querying the search-api live
 * @param query the elastic search query to use
 * @param serviceToken the api key to the search-api
 * @param assetsApi the assets api endpoint
 * @param portalUrl the portal url to point to
 * @returns CCF-compatible JSON-LD data or undefined on error
 */
function searchHubmap(dataUrl, serviceType, query, serviceToken, assetsApi = '', portalUrl = '') {
    return __awaiter(this, void 0, void 0, function* () {
        let hubmapData;
        if (serviceType === 'static') {
            hubmapData = yield doSearchRequest(dataUrl);
        }
        else if (serviceType === 'search-api') {
            hubmapData = yield doApiSearch(dataUrl, serviceToken, query);
        }
        if (hubmapData) {
            return hubmapResponseAsJsonLd(hubmapData, assetsApi, portalUrl, serviceToken);
        }
        else {
            console.warn(`Unable to load ${dataUrl} as HuBMAP Data`);
            return undefined;
        }
    });
}
/**
 * Adds hubmap data from a url to the triple store.
 *
 * @param store The triple store.
 * @param dataUrl The data url.
 * @param serviceType The service type.
 */
function addHubmapDataToStore(store, dataUrl, serviceType, serviceToken, assetsApi = '', portalUrl = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const hubmapData = yield searchHubmap(dataUrl, serviceType, undefined, serviceToken, assetsApi, portalUrl);
        if (hubmapData) {
            yield addJsonLdToStore(hubmapData, store);
        }
    });
}

/* eslint-disable @typescript-eslint/naming-convention */
function getObjects(store, ids, predicate) {
    const objects = new Set();
    for (const id of ids) {
        for (const quad of readQuads(store, id, predicate, null, null)) {
            objects.add(quad.object.id);
        }
    }
    return objects;
}
/**
 * Computes aggregate results.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns The list of aggregate results.
 */
function getAggregateResults(ids, store) {
    const donors = getObjects(store, ids, entity.donor.id);
    const centers = getObjects(store, donors, entity.providerUUID.id);
    const tissueBlocks = new Set();
    for (const id of ids) {
        for (const quad of readQuads(store, id, entity.spatialEntity, null, null)) {
            tissueBlocks.add(quad.subject.id);
        }
    }
    const tissueSections = getObjects(store, tissueBlocks, entity.sections.id);
    const tissueDatasets = new Set([
        ...getObjects(store, tissueBlocks, entity.datasets.id),
        ...getObjects(store, tissueSections, entity.datasets.id)
    ]);
    const results = {
        'Tissue Data Providers': centers.size,
        Donors: donors.size,
        'Tissue Blocks': tissueBlocks.size,
        'Tissue Sections': tissueSections.size,
        'Tissue Datasets': tissueDatasets.size
    };
    return Object.entries(results).map(([label, count]) => ({ label, count }));
}
/**
 * Get a list of technology names used by datasets
 *
 * @param store The triple store.
 * @returns list of unique technology names in the data
 */
function getDatasetTechnologyNames(store) {
    const names = new Set();
    for (const quad of readQuads(store, null, entity.technology, null, null)) {
        names.add(quad.object.value);
    }
    return Array.from(names).sort();
}
/**
 * Get a list of provider names from the database
 *
 * @param store The triple store.
 * @returns list of unique provider names in the data
 */
function getProviderNames(store) {
    const names = new Set();
    for (const quad of readQuads(store, null, entity.providerName, null, null)) {
        names.add(quad.object.value);
    }
    return Array.from(names).sort();
}

const spatialEntityDimensions = {
    [ccf.spatialEntity.x_dimension.id]: 'x',
    [ccf.spatialEntity.y_dimension.id]: 'y',
    [ccf.spatialEntity.z_dimension.id]: 'z'
};
function getSpatialEntityDimensions(store, iri) {
    const dims = getMappedResult(store, iri, 'Dimensions', spatialEntityDimensions);
    return [dims.x, dims.y, dims.z];
}
function getOrientedBoundingBox(store, graph, sourceIri, targetIri) {
    const matrix = graph.getTransformationMatrix(sourceIri, targetIri);
    let result = undefined;
    if (matrix) {
        const center = matrix.getTranslation();
        const halfSize = getSpatialEntityDimensions(store, sourceIri).map(n => n / 1000 / 2);
        const quaternion = new Euler().fromRotationMatrix(matrix, Euler.XYZ).toQuaternion().normalize().calculateW();
        result = new OrientedBoundingBox().fromCenterHalfSizeQuaternion(center, halfSize, quaternion);
    }
    return result;
}
function filterByProbingSphere(store, graph, seen, search) {
    const { x, y, z, radius, target } = search;
    const newSeen = new Set();
    const radiusSquared = (radius / 1000) * (radius / 1000);
    for (const sourceIri of seen) {
        const boundingBox = getOrientedBoundingBox(store, graph, sourceIri, target);
        if (boundingBox) {
            const distanceSquared = boundingBox.distanceSquaredTo([x, y, z].map(n => n / 1000));
            if (distanceSquared <= radiusSquared) {
                newSeen.add(sourceIri);
            }
        }
    }
    return newSeen;
}

function filterWithDonor(store, seen, callback) {
    var _a, _b;
    const donor2entity = new Map();
    const donors = new Set();
    for (const subject of seen) {
        for (const quad of readQuads(store, subject, entity.donor, null, null)) {
            donors.add(quad.object.id);
            if (!donor2entity.has(quad.object.id)) {
                donor2entity.set(quad.object.id, [subject]);
            }
            else {
                (_a = donor2entity.get(quad.object.id)) === null || _a === void 0 ? void 0 : _a.push(subject);
            }
        }
    }
    const newDonors = callback(donors);
    const newSeen = new Set();
    for (const d of newDonors) {
        for (const s of (_b = donor2entity.get(d)) !== null && _b !== void 0 ? _b : []) {
            newSeen.add(s);
        }
    }
    return newSeen;
}
function filterWithSpatialEntity(store, seen, callback) {
    var _a, _b;
    const spatial2entity = new Map();
    const entities = new Set();
    for (const subject of seen) {
        for (const quad of readQuads(store, subject, entity.spatialEntity, null, null)) {
            entities.add(quad.object.id);
            if (!spatial2entity.has(quad.object.id)) {
                spatial2entity.set(quad.object.id, [subject]);
            }
            else {
                (_a = spatial2entity.get(quad.object.id)) === null || _a === void 0 ? void 0 : _a.push(subject);
            }
        }
    }
    const newSpatialEntities = callback(entities);
    const newSeen = new Set();
    for (const e of newSpatialEntities) {
        for (const s of (_b = spatial2entity.get(e)) !== null && _b !== void 0 ? _b : []) {
            newSeen.add(s);
        }
    }
    return newSeen;
}
function filterWithDataset(store, seen, callback) {
    var _a, _b;
    const dataset2entity = new Map();
    const datasets = new Set();
    const sectionAndBlockSeen = new Set(seen);
    for (const subject of seen) {
        for (const quad of readQuads(store, subject, entity.sections, null, null)) {
            sectionAndBlockSeen.add(quad.object.id);
        }
    }
    for (const subject of sectionAndBlockSeen) {
        for (const quad of readQuads(store, subject, entity.datasets, null, null)) {
            datasets.add(quad.object.id);
            if (!dataset2entity.has(quad.object.id)) {
                dataset2entity.set(quad.object.id, [subject]);
            }
            else {
                (_a = dataset2entity.get(quad.object.id)) === null || _a === void 0 ? void 0 : _a.push(subject);
            }
        }
    }
    const newDatasets = callback(datasets);
    const newSeen = new Set();
    for (const e of newDatasets) {
        for (const s of (_b = dataset2entity.get(e)) !== null && _b !== void 0 ? _b : []) {
            newSeen.add(s);
        }
    }
    return newSeen;
}
/**
 * Finds all ids of object matching a filter.
 *
 * @param store The triple store.
 * @param filter The filter to limit objects.
 * @returns A set of all ids matching the filter.
 */
function findIds(store, graph, filter) {
    var _a, _b, _c, _d, _e, _f, _g;
    let seen = getAllEntities(store);
    if (seen.size > 0) {
        seen = filterByHasSpatialEntity(store, seen);
    }
    if (seen.size > 0 && (filter.sex === 'Male' || filter.sex === 'Female')) {
        const sex = filter.sex;
        seen = filterWithDonor(store, seen, (donors) => filterBySex(store, donors, sex));
    }
    if (seen.size > 0 && ((_a = filter.tmc) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        seen = filterWithDonor(store, seen, (donors) => filterByGroupName(store, donors, filter.tmc));
    }
    if (seen.size > 0 && ((_b = filter.technologies) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        seen = filterWithDataset(store, seen, (datasets) => filterByTechnology(store, datasets, filter.technologies));
    }
    if (seen.size > 0 && ((_c = filter.spatialSearches) === null || _c === void 0 ? void 0 : _c.length) > 0) {
        seen = filterWithSpatialEntity(store, seen, (entities) => filterBySpatialSearches(store, graph, entities, filter.spatialSearches));
    }
    if (seen.size > 0 && ((_d = filter.ontologyTerms) === null || _d === void 0 ? void 0 : _d.length) > 0) {
        const terms = filter.ontologyTerms;
        if (terms.indexOf(rui.body.id) === -1) {
            seen = filterWithSpatialEntity(store, seen, (entities) => filterByOntologyTerms(store, entities, terms));
        }
    }
    if (seen.size > 0 && ((_e = filter.cellTypeTerms) === null || _e === void 0 ? void 0 : _e.length) > 0) {
        const terms = filter.cellTypeTerms;
        if (terms.indexOf(rui.cell.id) === -1) {
            seen = filterWithSpatialEntity(store, seen, (entities) => filterByCellTypeTerms(store, entities, terms));
        }
    }
    if (seen.size > 0 && ((_f = filter.ageRange) === null || _f === void 0 ? void 0 : _f.length) === 2 &&
        isFinite(filter.ageRange[0]) && isFinite(filter.ageRange[1])) {
        const maxAge = Math.max(...filter.ageRange);
        const minAge = Math.min(...filter.ageRange);
        // Age filter given by their default range will be ignored
        if (!(minAge === 1 && maxAge === 110)) {
            seen = filterWithDonor(store, seen, (donors) => filterByAge(store, donors, minAge, maxAge));
        }
    }
    if (seen.size > 0 && ((_g = filter.bmiRange) === null || _g === void 0 ? void 0 : _g.length) === 2 &&
        isFinite(filter.bmiRange[0]) && isFinite(filter.bmiRange[1])) {
        const maxBMI = Math.max(...filter.bmiRange);
        const minBMI = Math.min(...filter.bmiRange);
        // BMI filter given by their default range will be ignored
        if (!(minBMI === 13 && maxBMI === 83)) {
            seen = filterWithDonor(store, seen, (donors) => filterByBMI(store, donors, minBMI, maxBMI));
        }
    }
    return seen;
}
/**
 * Gets all object ids in a store.
 *
 * @param store The triple store.
 * @returns A set of all ids.
 */
function getAllEntities(store) {
    const seen = new Set();
    store.forSubjects((s) => seen.add(s.id), entity.spatialEntity, null, null);
    return seen;
}
/**
 * Creates a callback function that adds ids to a second set iff it exists in the first set.
 *
 * @param seen The first set of ids.
 * @param newSeen The second set to add ids to.
 * @returns The callback function.
 */
function differenceCallback(seen, newSeen) {
    return function (term) {
        if (seen.has(term.id)) {
            newSeen.add(term.id);
        }
    };
}
/**
 * Filters ids by sex.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param sex Sex to filter on.
 * @returns The subset of ids with the specified sex.
 */
function filterBySex(store, seen, sex) {
    const newSeen = new Set();
    store.forSubjects(differenceCallback(seen, newSeen), entity.sex, entity[sex], null);
    return newSeen;
}
/**
 * Filters ids by group names.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param groupNames Group names to filter on.
 * @returns The subset of ids with the specified group names.
 */
function filterByGroupName(store, seen, groupNames) {
    const newSeen = new Set();
    for (const groupName of groupNames) {
        const literal = DataFactory.literal(groupName);
        store.forSubjects(differenceCallback(seen, newSeen), entity.providerName, literal, null);
    }
    return newSeen;
}
/**
 * Filters ids by technology names.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param technologies Technology names to filter on.
 * @returns The subset of ids with the specified technology names.
 */
function filterByTechnology(store, seen, technologies) {
    const newSeen = new Set();
    for (const technology of technologies) {
        const literal = DataFactory.literal(technology);
        store.forSubjects(differenceCallback(seen, newSeen), entity.technology, literal, null);
    }
    return newSeen;
}
/**
 * Filters ids by ontology terms.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param terms Ontology terms to filter on.
 * @returns The subset of ids with the specified ontology terms.
 */
function filterByOntologyTerms(store, seen, terms) {
    const newSeen = new Set();
    for (const term of terms) {
        const namedNode = DataFactory.namedNode(term);
        store.forSubjects(differenceCallback(seen, newSeen), ccf.spatialEntity.ccf_annotations, namedNode, null);
    }
    return newSeen;
}
/**
 * Filters ids by cell type terms.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param terms Cell type terms to filter on.
 * @returns The subset of ids with the specified cell type terms.
 */
function filterByCellTypeTerms(store, seen, terms) {
    const asTerms = new Set();
    for (const term of terms) {
        store.forObjects((asTerm) => {
            asTerms.add(asTerm.id);
        }, term, ccf.asctb.located_in, null);
        if (term === rui.cell.id) {
            asTerms.add(rui.body.id);
        }
    }
    return filterByOntologyTerms(store, seen, [...asTerms]);
}
/**
 * Filters ids by age.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param minAge Minimum age.
 * @param maxAge Maximum age.
 * @returns The subset of ids with the specified age.
 */
function filterByAge(store, seen, minAge, maxAge) {
    const newSeen = new Set();
    for (const subject of seen) {
        for (const quad of readQuads(store, subject, entity.age, null, null)) {
            const value = fromRdf(quad.object);
            if (value >= minAge && value <= maxAge) {
                newSeen.add(subject);
            }
        }
    }
    return newSeen;
}
/**
 * Filters ids by BMI.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param minBMI Minimum BMI.
 * @param maxBMI Maximum BMI.
 * @returns The subset of ids with the specified BMI.
 */
function filterByBMI(store, seen, minBMI, maxBMI) {
    const newSeen = new Set();
    for (const subject of seen) {
        for (const quad of readQuads(store, subject, entity.bmi, null, null)) {
            const value = fromRdf(quad.object);
            if (value >= minBMI && value <= maxBMI) {
                newSeen.add(subject);
            }
        }
    }
    return newSeen;
}
/**
 * Filters ids by spatial entities.
 *
 * @param store The triple store.
 * @param seen All ids to choose from.
 * @param hasSpatialEntity Whether the filtered objects should have a spatial entity.
 * @returns The subset of ids with/without spatial entities.
 */
function filterByHasSpatialEntity(store, seen, hasSpatialEntity = true) {
    const newSeen = new Set();
    store.forSubjects(differenceCallback(seen, newSeen), entity.spatialEntity, null, null);
    if (!hasSpatialEntity) {
        const notNewSeen = new Set();
        seen.forEach((s) => !newSeen.has(s) ? notNewSeen.add(s) : undefined);
        return notNewSeen;
    }
    return newSeen;
}
function filterBySpatialSearches(store, graph, seen, spatialSearches) {
    const newSeen = new Set();
    for (const search of spatialSearches) {
        const thisSeen = filterByProbingSphere(store, graph, seen, search);
        thisSeen.forEach((s) => newSeen.add(s));
    }
    return newSeen;
}

function getSpatialEntityMapping(subjects, store) {
    const spatial2entity = new Map();
    for (const subject of subjects) {
        for (const quad of readQuads(store, subject, entity.spatialEntity, null, null)) {
            if (!spatial2entity.has(quad.object.id)) {
                spatial2entity.set(quad.object.id, new Set([subject]));
            }
            else {
                spatial2entity.get(quad.object.id).add(subject);
            }
        }
    }
    return spatial2entity;
}
function getAnatomicalStructureMapping(ids, store) {
    const spatial2entity = getSpatialEntityMapping(ids, store);
    const term2entity = new Map();
    for (const subject of spatial2entity.keys()) {
        const entities = spatial2entity.get(subject);
        for (const quad of readQuads(store, subject, ccf.spatialEntity.ccf_annotations, null, null)) {
            if (!term2entity.has(quad.object.id)) {
                term2entity.set(quad.object.id, new Set(entities));
            }
            else {
                const termEntities = term2entity.get(quad.object.id);
                entities.forEach((value) => termEntities.add(value));
            }
        }
    }
    return term2entity;
}
/**
 * Get number of occurrences of ontology terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
function getOntologyTermOccurences(ids, store) {
    const counts = {};
    const term2entities = getAnatomicalStructureMapping(ids, store);
    term2entities.forEach((value, key) => {
        counts[key] = value.size;
    });
    return counts;
}
/**
 * Get number of occurrences of cell type terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
function getCellTypeTermOccurences(ids, store) {
    var _a, _b;
    const asTerm2entities = getAnatomicalStructureMapping(ids, store);
    const ctTerm2entities = new Map();
    for (const asTerm of asTerm2entities.keys()) {
        const entities = asTerm2entities.get(asTerm);
        for (const quad of readQuads(store, null, ccf.asctb.located_in, asTerm, null)) {
            const cellType = quad.subject.id;
            if (!ctTerm2entities.has(cellType)) {
                ctTerm2entities.set(cellType, new Set(entities));
            }
            else {
                const termEntities = ctTerm2entities.get(cellType);
                entities.forEach((value) => termEntities.add(value));
            }
        }
    }
    const counts = {};
    ctTerm2entities.forEach((value, key) => {
        counts[key] = value.size;
    });
    counts[rui.cell.id] = (_b = (_a = asTerm2entities.get(rui.body.id)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
    return counts;
}

function getOntologyTreeNode(store, iri, relationshipIri) {
    const result = {
        '@id': iri, '@type': 'OntologyTreeNode', id: iri, parent: '',
        children: [], synonymLabels: [], label: ''
    };
    const ontologyTreeNodeResult = {
        [ccf.ontologyNode.label.id]: 'label',
        [relationshipIri]: 'parent',
        [ccf.ontologyNode.synonymLabels.id]: 'synonymLabels',
    };
    for (const [key, value] of getEntries(store, iri, ontologyTreeNodeResult)) {
        if (key === 'synonymLabels') {
            result.synonymLabels.push(value);
        }
        else {
            result[key] = value;
        }
    }
    result.children = store.getSubjects(relationshipIri, iri, null).map(s => s.id);
    return result;
}
function getOntologyTreeModel(store, rootIri, rootLabel, relationshipIri) {
    const result = { root: rootIri, nodes: {} };
    const seen = new Set();
    for (const quad of readQuads(store, null, relationshipIri, null, null)) {
        seen.add(quad.subject.id);
        seen.add(quad.object.id);
    }
    for (const iri of seen) {
        result.nodes[iri] = getOntologyTreeNode(store, iri, relationshipIri);
    }
    if (!result.nodes[rootIri]) {
        result.nodes[rootIri] = {
            '@id': rootIri,
            '@type': 'OntologyTreeNode',
            id: rootIri,
            label: rootLabel,
            children: [],
            synonymLabels: []
        };
    }
    const rootChildren = store
        .getSubjects(relationshipIri, rootIri, null).map(o => o.id)
        .sort((a, b) => result.nodes[a].label.localeCompare(result.nodes[b].label));
    result.nodes[rootIri].children = rootChildren;
    treeify(result);
    return result;
}
/**
 * Recursive function to ensure that the given ontology tree model is actually a tree by essentially using a BFS search.
 *
 * @param model the ontology tree model to mutate
 * @param nodeIri the tree node iri to modify. Starts at root in the base case
 * @param seen a set of IRIs that have been 'seen' so far to remove loops in the graph
 */
function treeify(model, nodeIri = undefined, seen = new Set()) {
    const node = model.nodes[nodeIri !== null && nodeIri !== void 0 ? nodeIri : model.root];
    if (node) {
        node.children = node.children.filter(n => !seen.has(n));
        node.children.forEach(n => seen.add(n));
        for (const childId of node.children) {
            treeify(model, childId, seen);
            if (model.nodes[childId]) {
                model.nodes[childId].parent = node['@id'];
            }
        }
    }
}
function getAnatomicalStructureTreeModelSlowly(store) {
    const model = getOntologyTreeModel(store, rui.body.id, 'body', ccf.asctb.part_of.id);
    model.nodes[rui.body.id].children = [
        'http://purl.obolibrary.org/obo/UBERON_0000955',
        'http://purl.obolibrary.org/obo/UBERON_0000029',
        // 'http://purl.obolibrary.org/obo/UBERON_0002509', // Mesenteric Lymph Node
        'http://purl.obolibrary.org/obo/UBERON_0000970',
        // 'http://purl.obolibrary.org/obo/UBERON_0004548', // Eye, L
        // 'http://purl.org/sig/ont/fma/fma54449', // Eye, R
        'http://purl.obolibrary.org/obo/UBERON_0003889',
        // 'http://purl.obolibrary.org/obo/UBERON_0001303', // Fallopian Tube, L
        // 'http://purl.obolibrary.org/obo/UBERON_0001302', // Fallopian Tube, R
        'http://purl.obolibrary.org/obo/UBERON_0000948',
        'http://purl.obolibrary.org/obo/UBERON_0002113',
        // 'http://purl.obolibrary.org/obo/UBERON_0004538', // Kidney, L
        // 'http://purl.obolibrary.org/obo/UBERON_0004539', // Kidney, R
        'http://purl.obolibrary.org/obo/UBERON_0001465',
        // 'http://purl.org/sig/ont/fma/fma24978', // Knee, L
        // 'http://purl.org/sig/ont/fma/fma24977', // Knee, R
        'http://purl.obolibrary.org/obo/UBERON_0002107',
        'http://purl.obolibrary.org/obo/UBERON_0002048',
        'http://purl.obolibrary.org/obo/UBERON_0001911',
        // 'http://purl.org/sig/ont/fma/fma57991', // Mammary Gland, L
        // 'http://purl.org/sig/ont/fma/fma57987', // Mammary Gland, R
        'http://purl.obolibrary.org/obo/UBERON_0000992',
        // 'http://purl.org/sig/ont/fma/fma7214', // Ovary, L
        // 'http://purl.org/sig/ont/fma/fma7213', // Ovary, R
        'http://purl.obolibrary.org/obo/UBERON_0001264',
        'http://purl.obolibrary.org/obo/UBERON_0001270',
        'http://purl.obolibrary.org/obo/UBERON_0001987',
        'http://purl.obolibrary.org/obo/UBERON_0002367',
        'http://purl.obolibrary.org/obo/UBERON_0002097',
        'http://purl.obolibrary.org/obo/UBERON_0002108',
        'http://purl.obolibrary.org/obo/UBERON_0002240',
        'http://purl.obolibrary.org/obo/UBERON_0000059',
        'http://purl.obolibrary.org/obo/UBERON_0002106',
        'http://purl.obolibrary.org/obo/UBERON_0002370',
        'http://purl.obolibrary.org/obo/UBERON_0000056',
        // 'http://purl.obolibrary.org/obo/UBERON_0001223', // Ureter, L
        // 'http://purl.obolibrary.org/obo/UBERON_0001222', // Ureter, R
        'http://purl.obolibrary.org/obo/UBERON_0001255',
        'http://purl.obolibrary.org/obo/UBERON_0000995',
        'http://purl.obolibrary.org/obo/UBERON_0004537' // Blood Vasculature
    ].filter(iri => iri in model.nodes);
    return model;
}
const getAnatomicalStructureTreeModel = memoize(getAnatomicalStructureTreeModelSlowly, () => '');
function getCellTypeTreeModel(store) {
    return getOntologyTreeModel(store, rui.cell.id, 'cell', ccf.asctb.ct_is_a.id);
}

/** Entity iri to property path. */
const listResultSet = {
    [entity.label.id]: 'label',
    [entity.description.id]: 'description',
    [entity.link.id]: 'link'
};
const donorResultSet = Object.assign(Object.assign({}, listResultSet), { [entity.providerName.id]: 'providerName' });
const datasetResultSet = Object.assign(Object.assign({}, listResultSet), { [entity.technology.id]: 'technology', [entity.thumbnail.id]: 'thumbnail' });
const tissueSectionResultSet = Object.assign(Object.assign({}, listResultSet), { [entity.sampleType.id]: 'sampleType', [entity.sectionNumber.id]: 'sectionNumber', [entity.datasets.id]: 'datasets' });
const tissueBlockResultSet = Object.assign(Object.assign({}, listResultSet), { [entity.sampleType.id]: 'sampleType', [entity.sectionCount.id]: 'sectionCount', [entity.sectionSize.id]: 'sectionSize', [entity.sectionUnits.id]: 'sectionUnits', [entity.donor.id]: 'donor', [entity.spatialEntity.id]: 'spatialEntityId', [entity.sections.id]: 'sections', [entity.datasets.id]: 'datasets' });
/**
 * Extracts a single donor result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
function getDonorResult(store, iri) {
    return getMappedResult(store, iri, 'Donor', donorResultSet);
}
/**
 * Extracts a single dataset result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
function getDatasetResult(store, iri) {
    return getMappedResult(store, iri, 'Dataset', datasetResultSet);
}
/**
 * Extracts a single tissue section result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
function getTissueSectionResult(store, iri) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const result = { '@id': iri, '@type': 'Sample', datasets: [] };
    for (const [key, value] of getEntries(store, iri, tissueSectionResultSet)) {
        if (key === 'datasets') {
            const dataset = getDatasetResult(store, value);
            result[key].push(dataset);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
/**
 * Extracts a single tissue block result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
function getTissueBlockResult(store, iri) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const result = { '@id': iri, '@type': 'Sample',
        sections: [], datasets: []
    };
    for (const [key, value] of getEntries(store, iri, tissueBlockResultSet)) {
        if (key === 'sections') {
            const section = getTissueSectionResult(store, value);
            result[key].push(section);
        }
        else if (key === 'datasets') {
            const dataset = getDatasetResult(store, value);
            result[key].push(dataset);
        }
        else if (key === 'donor') {
            result[key] = getDonorResult(store, value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}

class CCFDatabaseStatusTracker {
    constructor(database) {
        this.database = database;
        this.connect();
    }
    toJson() {
        return {
            status: this.status,
            message: this.message,
            checkback: this.status === 'Ready' || this.status === 'Error' ? 60 * 60 * 1000 : 2000,
            loadTime: this.loadTime
        };
    }
    connect() {
        this.status = 'Loading';
        this.message = 'Loading database';
        const startTime = Date.now();
        return this.database.connect()
            .then((loaded) => __awaiter(this, void 0, void 0, function* () {
            if (loaded) {
                // Warm up the database
                this.message = 'Building scene';
                yield this.database.getScene();
                this.message = 'Building tissue block results';
                yield this.database.getTissueBlockResults();
                this.message = 'Aggregating results';
                yield this.database.getAggregateResults();
                this.status = 'Ready';
                this.message = 'Database successfully loaded';
            }
            else {
                this.status = 'Error';
                this.message = 'Unknown error while loading database';
            }
        }))
            .catch((error) => {
            var _a;
            this.status = 'Error';
            this.message = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error while loading database';
        })
            .finally(() => {
            this.loadTime = Date.now() - startTime;
        });
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/** CCF v2.0 JSON-LD Context */
const CCF_CONTEXT = {
    '@context': {
        '@base': 'http://purl.org/ccf/',
        '@vocab': 'http://purl.org/ccf/',
        'ccf': 'http://purl.org/ccf/',
        'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
        'dcterms': 'http://purl.org/dc/terms/',
        'label': 'rdfs:label',
        'description': 'rdfs:comment',
        'link': 'ccf:url',
        'sex': 'ccf:sex',
        'age': 'ccf:age',
        'bmi': 'ccf:bmi',
        'consortium_name': 'ccf:consortium_name',
        'provider_name': 'ccf:tissue_provider_name',
        'provider_uuid': 'ccf:tissue_provider_uuid',
        'donor': {
            '@id': 'ccf:comes_from',
            '@type': '@id'
        },
        'samples': {
            '@reverse': 'donor'
        },
        'sections': {
            '@id': 'ccf:subdivided_into_sections',
            '@type': '@id'
        },
        'datasets': {
            '@id': 'ccf:generates_dataset',
            '@type': '@id'
        },
        'sample_type': 'ccf:sample_type',
        'section_count': 'ccf:section_count',
        'section_size': 'ccf:section_size',
        'section_units': 'ccf:section_size_unit',
        'section_number': 'ccf:section_number',
        'rui_location': {
            '@id': 'ccf:has_registration_location',
            '@type': '@id'
        },
        'ccf_annotations': {
            '@id': 'ccf:collides_with',
            '@type': '@id',
            '@container': '@set'
        },
        'representation_of': {
            '@id': 'ccf:representation_of',
            '@type': '@id'
        },
        'reference_organ': {
            '@id': 'ccf:has_reference_organ',
            '@type': '@id'
        },
        'extraction_set_for': {
            '@id': 'ccf:extraction_set_for',
            '@type': '@id'
        },
        'extraction_set': {
            '@id': 'ccf:has_extraction_set',
            '@type': '@id'
        },
        'organ_owner_sex': 'ccf:organ_owner_sex',
        'side': 'ccf:organ_side',
        'rui_rank': 'ccf:rui_rank',
        'slice_thickness': 'ccf:slice_thickness',
        'slice_count': 'ccf:slice_count',
        'object': {
            '@id': 'ccf:has_object_reference',
            '@type': '@id'
        },
        'creation_date': 'dcterms:created',
        'updated_date': 'ccf:updated_date',
        'creator': 'dcterms:creator',
        'creator_first_name': 'ccf:creator_first_name',
        'creator_last_name': 'ccf:creator_last_name',
        'placement': {
            '@reverse': 'ccf:placement_for'
        },
        'placement_date': 'dcterms:created',
        'rotation_order': 'ccf:rotation_order',
        'dimension_units': 'ccf:dimension_unit',
        'rotation_units': 'ccf:rotation_unit',
        'scaling_units': 'ccf:scaling_unit',
        'translation_units': 'ccf:translation_unit',
        'source': {
            '@id': 'ccf:placement_for',
            '@type': '@id'
        },
        'target': {
            '@id': 'ccf:placement_relative_to',
            '@type': '@id'
        },
        'x_rotation': 'ccf:x_rotation',
        'y_rotation': 'ccf:y_rotation',
        'z_rotation': 'ccf:z_rotation',
        'x_scaling': 'ccf:x_scaling',
        'y_scaling': 'ccf:y_scaling',
        'z_scaling': 'ccf:z_scaling',
        'x_translation': 'ccf:x_translation',
        'y_translation': 'ccf:y_translation',
        'z_translation': 'ccf:z_translation',
        'x_dimension': 'ccf:x_dimension',
        'y_dimension': 'ccf:y_dimension',
        'z_dimension': 'ccf:z_dimension',
        'ontology_terms': {
            '@id': 'ccf:has_ontology_term',
            '@type': '@id'
        },
        'technology': 'ccf:technology',
        'thumbnail': 'ccf:thumbnail',
        'file': 'ccf:file_url',
        'file_format': 'ccf:file_format',
        'file_subpath': 'ccf:file_subpath'
    }
};
/* eslint-enable @typescript-eslint/naming-convention */
/**
 * Function which takes JSON-LD data and makes patches to update from CCF v1.x to v2.0 automatically
 *
 * @param jsonLdString the input JSON-LD as a string
 * @returns A JSON-LD object derived from the given string with updated data to be compatible with CCF v2.0
 */
function patchJsonLd(jsonLdString) {
    return JSON.parse(jsonLdString, (key, value) => {
        if (key === 'ccf_annotations' && Array.isArray(value)) {
            return value.map((iri) => {
                if (iri === null || iri === void 0 ? void 0 : iri.startsWith('http://purl.obolibrary.org/obo/FMA_')) {
                    return iri.replace('http://purl.obolibrary.org/obo/FMA_', 'http://purl.org/sig/ont/fma/fma');
                }
                else {
                    return iri;
                }
            });
        }
        else if (key === '@context' && value && (value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-entity-context.jsonld'
            || value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld'
            || value === 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld'
            || value['@base'] === 'http://purl.org/ccf/latest/ccf-entity.owl#')) {
            return CCF_CONTEXT;
        }
        return value;
    });
}

/**
 * Function to add additional ccf_annotations to rui locations based on the
 * reference organ it was placed relative to.
 *
 * @param store the triple store holding the CCF.OWL data
 */
function enrichRuiLocations(store) {
    var _a, _b, _c;
    const tree = getAnatomicalStructureTreeModel(store);
    const refOrganMap = new Map();
    // Build a map from reference organ to ccf annotations via representation_of and the AS partonomy
    for (const { subject: organ, object: term } of readQuads(store, null, ccf.spatialEntity.representation_of, null, null)) {
        const annotations = new Set([term.id]);
        let parent = (_a = tree.nodes[term.id]) === null || _a === void 0 ? void 0 : _a.parent;
        while (parent) {
            if (annotations.has(parent)) {
                break;
            }
            else {
                annotations.add(parent);
                parent = (_b = tree.nodes[parent]) === null || _b === void 0 ? void 0 : _b.parent;
            }
        }
        refOrganMap.set(organ.id, [...annotations].map(s => DataFactory.namedNode(s)));
    }
    // Add AS terms for rui locations based on the reference organs they are placed relative to
    for (const { object: ruiLocation } of readQuads(store, null, entity.spatialEntity, null, null)) {
        for (const { subject: placement } of readQuads(store, null, ccf.spatialPlacement.source, ruiLocation, null)) {
            for (const { object: organ } of readQuads(store, placement, ccf.spatialPlacement.target, null, null)) {
                for (const term of (_c = refOrganMap.get(organ.id)) !== null && _c !== void 0 ? _c : []) {
                    store.addQuad(DataFactory.namedNode(ruiLocation.id), ccf.spatialEntity.ccf_annotations, term);
                }
            }
        }
    }
}

/** Default initialization options. */
const DEFAULT_CCF_DB_OPTIONS = {
    ccfOwlUrl: 'https://purl.org/ccf/latest/ccf.owl',
    ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
    dataSources: [],
    hubmapDataService: 'static',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '',
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
};
/** Database provider. */
class CCFDatabase {
    /**
     * Creates an instance of ccfdatabase.
     *
     * @param [options] Initialization options.
     */
    constructor(options = DEFAULT_CCF_DB_OPTIONS) {
        this.options = options;
        this.store = new Store(undefined, { factory: DataFactory });
        this.graph = new CCFSpatialGraph(this);
        this.scene = new CCFSpatialScene(this);
    }
    /**
     * Connects the database.
     *
     * @param [options] Options used to initialize.
     * @returns A promise resolving to true if data has been loaded into the database.
     */
    connect(options, cached = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options) {
                this.options = options;
            }
            if (!this.initializing) {
                if (cached) {
                    this.initializing = this.cachedConnect();
                }
                else {
                    this.initializing = this.doConnect();
                }
            }
            yield this.initializing;
            return this.store.size > 0;
        });
    }
    cachedConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date().getTime();
            const lastModifiedKey = 'ccf-database.last_modified';
            const ccfDatabaseKey = 'ccf-database';
            const lastModified = yield get$1(lastModifiedKey).catch(() => undefined);
            let serializedDb;
            if (lastModified && start - new Date(+lastModified).getTime() > 60 * 60 * 1000) {
                yield delMany([ccfDatabaseKey, lastModifiedKey]).catch(() => undefined);
            }
            else {
                serializedDb = yield get$1(ccfDatabaseKey).catch(() => undefined);
            }
            if (serializedDb) {
                yield this.deserialize(serializedDb);
            }
            else {
                yield this.doConnect();
                setMany([
                    [ccfDatabaseKey, this.serialize()],
                    [lastModifiedKey, '' + start]
                ]).catch(() => undefined);
            }
        });
    }
    /**
     * Actually connects to the database.
     *
     * @returns A promise resolving to void when connected.
     */
    doConnect() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const ops = [];
            const sources = (_b = (_a = this.options.dataSources) === null || _a === void 0 ? void 0 : _a.concat()) !== null && _b !== void 0 ? _b : [];
            const ccfOwlUrl = this.options.ccfOwlUrl;
            if (ccfOwlUrl.startsWith('{')) {
                // serialized n3 store was provided as the ccfOwlUrl
                this.store = deserializeN3Store(ccfOwlUrl, DataFactory);
            }
            else if (ccfOwlUrl.endsWith('.n3store.json')) {
                const storeString = yield fetch(ccfOwlUrl).then(r => r.text())
                    .catch(() => console.log('Couldn\'t locate serialized store.'));
                if (storeString) {
                    this.store = deserializeN3Store(storeString, DataFactory);
                }
            }
            else if ((ccfOwlUrl === null || ccfOwlUrl === void 0 ? void 0 : ccfOwlUrl.length) > 0) {
                sources.push(ccfOwlUrl);
            }
            if (this.options.hubmapDataUrl) {
                if (this.options.hubmapDataUrl.endsWith('jsonld')) {
                    sources.push(this.options.hubmapDataUrl);
                }
                else {
                    ops.push(searchHubmap(this.options.hubmapDataUrl, this.options.hubmapDataService, this.options.hubmapQuery, this.options.hubmapToken, this.options.hubmapAssetsUrl, this.options.hubmapPortalUrl).then((jsonld) => {
                        if (jsonld) {
                            return this.addDataSources([jsonld]);
                        }
                        else {
                            return undefined;
                        }
                    }));
                }
            }
            ops.push(this.addDataSources(sources));
            yield Promise.all(ops);
            yield this.synchronize();
        });
    }
    addDataSources(sources, inputStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = inputStore !== null && inputStore !== void 0 ? inputStore : this.store;
            yield Promise.all(sources.map((source) => __awaiter(this, void 0, void 0, function* () {
                if (typeof source === 'string') {
                    if ((source.startsWith('http') || source.startsWith('assets/')) && source.includes('jsonld')) {
                        source = yield fetch(source).then(r => r.text());
                        source = patchJsonLd(source);
                        yield addJsonLdToStore(source, store);
                    }
                    else if (source.endsWith('n3')) {
                        yield addN3ToStore(source, store);
                    }
                    else if (source.endsWith('rdf') || source.endsWith('owl') || source.endsWith('xml')) {
                        yield addRdfXmlToStore(source, store);
                    }
                    else {
                        // Passthrough assumes a JSON-LD response
                        source = patchJsonLd(source);
                        yield addJsonLdToStore(source, store);
                    }
                }
                else {
                    source = patchJsonLd(JSON.stringify(source));
                    yield addJsonLdToStore(source, store);
                }
            })));
            return this;
        });
    }
    synchronize() {
        return __awaiter(this, void 0, void 0, function* () {
            // Add a small delay to allow the triple store to settle
            yield new Promise(r => {
                setTimeout(r, 500);
            });
            this.graph.createGraph();
            enrichRuiLocations(this.store);
            return this;
        });
    }
    serialize() {
        return serializeN3Store(this.store);
    }
    deserialize(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store = deserializeN3Store(value, DataFactory);
            this.graph = new CCFSpatialGraph(this);
            this.scene = new CCFSpatialScene(this);
            yield new Promise(r => {
                setTimeout(r, 10);
            });
        });
    }
    /**
     * Gets all ids matching the filter.
     *
     * @param [filter] The filter.
     * @returns A set of all matching ids.
     */
    getIds(filter = {}) {
        return findIds(this.store, this.graph, filter);
    }
    /**
     * Gets the data for an object.
     *
     * @param id The id of the requested object.
     * @returns The object data.
     */
    get(id) {
        return this.store.getQuads(DataFactory.namedNode(id), null, null, null);
    }
    /**
     * Gets the data for objects matching a filter.
     *
     * @param [filter] The filter.
     * @returns An array of data.
     */
    search(filter = {}) {
        return [...this.getIds(filter)].map((s) => this.get(s));
    }
    /**
     * Gets all spatial entities for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of spatial entities.
     */
    getSpatialEntities(filter) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        filter = Object.assign(Object.assign({}, filter), { hasSpatialEntity: true });
        return [...this.getIds(filter)].map((s) => getSpatialEntityForEntity(this.store, s));
    }
    getDatabaseStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.status) {
                this.status = new CCFDatabaseStatusTracker(this);
            }
            return this.status.toJson();
        });
    }
    /**
     * Get a list of technology names used by datasets
     *
     * @returns list of unique technology names in the data
     */
    getDatasetTechnologyNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return getDatasetTechnologyNames(this.store);
        });
    }
    /**
     * Get a list of provider names from the database
     *
     * @returns list of unique provider names in the data
     */
    getProviderNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return getProviderNames(this.store);
        });
    }
    /**
     * Gets all tissue block results for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of results.
     */
    getTissueBlockResults(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            filter = Object.assign(Object.assign({}, filter), { hasSpatialEntity: true });
            return [...this.getIds(filter)].map((s) => getTissueBlockResult(this.store, s));
        });
    }
    /**
     * Gets all aggregate results for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of aggregate data.
     */
    getAggregateResults(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return getAggregateResults(this.getIds(filter), this.store);
        });
    }
    /**
     * Get number of occurrences of ontology terms for a set of ids.
     *
     * @param [filter] The filter.
     * @returns Ontology term counts.
     */
    getOntologyTermOccurences(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return getOntologyTermOccurences(this.getIds(filter), this.store);
        });
    }
    /**
     * Get number of occurrences of cell type terms for a set of ids.
     *
     * @param [filter] The filter.
     * @returns Cell type term counts.
     */
    getCellTypeTermOccurences(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTypeTermOccurences(this.getIds(filter), this.store);
        });
    }
    /**
     * Get ontology term tree nodes
     *
     * @returns Ontology term counts.
     */
    getOntologyTreeModel() {
        return __awaiter(this, void 0, void 0, function* () {
            return getAnatomicalStructureTreeModel(this.store);
        });
    }
    /**
     * Get cell type term tree nodes
     *
     * @returns Ontology term counts.
     */
    getCellTypeTreeModel() {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTypeTreeModel(this.store);
        });
    }
    /**
     * Get reference organs
     *
     * @returns Ontology term counts.
     */
    getReferenceOrgans() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.scene.getReferenceOrgans();
        });
    }
    /**
     * Get all nodes to form the 3D scene of reference body, organs, and tissues
     *
     * @param [filter] The filter.
     * @returns A list of Spatial Scene Nodes for the 3D Scene
     */
    getScene(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.graph.createGraph();
            return this.scene.getScene(filter);
        });
    }
    /**
     * Get all nodes to form the 3D scene of reference organ and tissues
     *
     * @param [organIri] The Reference Organ IRI
     * @param [filter] The filter.
     * @returns A list of Spatial Scene Nodes for the 3D Scene
     */
    getReferenceOrganScene(organIri, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.graph.createGraph();
            return this.scene.getReferenceOrganScene(organIri, filter);
        });
    }
    getSpatialPlacement(source, targetIri) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.graph.getSpatialPlacement(source, targetIri);
        });
    }
}

const gold = [240, 183, 98, 255];
const red$1 = [213, 0, 0, 255];
const green$1 = [29, 204, 101, 255];
const blue$1 = [41, 121, 255, 255];
/**
 * Create a set of scene nodes for the body-ui to show the probing sphere and lines around it
 * for a given spatial search.
 * @param node the Spatial Entity (usually a reference organ) that the sphere is probing into
 * @param sphere the Spatial Search that defines where and how big the probing sphere is
 * @returns a set of scene nodes for the body-ui
 */
function getProbingSphereScene(node, sphere) {
    var _a;
    const sceneWidth = node.x_dimension / 1000;
    const sceneHeight = node.y_dimension / 1000;
    const sceneDepth = node.z_dimension / 1000;
    const defaultSphereRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.07;
    const sphereLineRadius = defaultSphereRadius * 0.05;
    const sphereLineLength = defaultSphereRadius * 2;
    const sphereConeRadius = sphereLineRadius * 4;
    if (!sphere) {
        sphere = {
            target: (_a = node.representation_of) !== null && _a !== void 0 ? _a : node['@id'],
            radius: defaultSphereRadius,
            x: sceneWidth / 2,
            y: sceneHeight / 2,
            z: sceneDepth / 2
        };
    }
    else {
        sphere = Object.assign(Object.assign({}, sphere), { radius: sphere.radius / 1000, x: sphere.x / 1000, y: sphere.y / 1000, z: sphere.z / 1000 });
    }
    return [
        // Probing Sphere
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingSphere',
            '@type': 'SpatialSceneNode',
            unpickable: false,
            geometry: 'sphere',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([sphere.x, sphere.y, sphere.z]).scale(sphere.radius),
            color: gold
        },
        // Probing Sphere Positive X Axis (D)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXD',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x + sphere.radius + sphereLineLength / 2, sphere.y, sphere.z])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: red$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x + sphere.radius + sphereLineLength, sphere.y, sphere.z])
                .rotateZ(toRadians(-90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: red$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'D',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.y, sphere.z])
                .scale(sphereConeRadius),
            color: red$1
        },
        // Probing Sphere Negative X Axis (A)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXA',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x - sphere.radius - sphereLineLength / 2, sphere.y, sphere.z])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: red$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXACone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x - sphere.radius - sphereLineLength, sphere.y, sphere.z])
                .rotateZ(toRadians(90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: red$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXALabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'A',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.y, sphere.z])
                .scale(sphereConeRadius),
            color: red$1
        },
        // Probing Sphere Positive Y Axis (W)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYW',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength / 2, sphere.z])
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: green$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength, sphere.z])
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: green$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'W',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.z])
                .scale(sphereConeRadius),
            color: green$1
        },
        // Probing Sphere Negative Y Axis (S)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYS',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength / 2, sphere.z])
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: green$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength, sphere.z])
                .rotateZ(toRadians(180))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: green$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'S',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.z])
                .scale(sphereConeRadius),
            color: green$1
        },
        // Probing Sphere Positive Z Axis (E)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZE',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength / 2])
                .rotateX(toRadians(90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: blue$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZECone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength])
                .rotateX(toRadians(90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: blue$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZELabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'E',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength + sphereConeRadius * 3])
                .scale(sphereConeRadius),
            color: blue$1
        },
        // Probing Sphere Negative Z Axis (Q)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength / 2])
                .rotateX(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: blue$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength])
                .rotateX(toRadians(-90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: blue$1
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'Q',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength - sphereConeRadius * 3.5])
                .scale(sphereConeRadius),
            color: blue$1
        }
    ];
}

const gray = [204, 204, 204, 255];
const red = [213, 0, 0, 255];
const green = [29, 204, 101, 255];
const blue = [41, 121, 255, 255];
/**
 * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
 * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
 * @param includeLetters whether to show the keyboard letters associated with the origin points
 * @returns a set of scene nodes for the body-ui
 */
function getOriginScene(node, includeLetters = false) {
    const sceneWidth = node.x_dimension / 1000;
    const sceneHeight = node.y_dimension / 1000;
    const sceneDepth = node.z_dimension / 1000;
    const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.05;
    const lineRadius = originRadius * 0.1;
    return [
        // Origin Sphere
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginSphere',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'sphere',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).scale(originRadius),
            color: gray
        },
        // Origin X Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginX',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sceneWidth / 2, 0, 0])
                .rotateZ(toRadians(-90))
                .scale([lineRadius, sceneWidth, lineRadius]),
            color: red
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sceneWidth, 0, 0])
                .rotateZ(toRadians(-90))
                .scale([originRadius, originRadius * 3, originRadius]),
            color: red
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXALabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'A',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([-originRadius * 2, 0, 0]).scale(originRadius),
            color: red
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXDLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'D',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([sceneWidth + originRadius * 2, 0, 0]).scale(originRadius),
            color: red
        },
        // Origin Y Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginY',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, sceneHeight / 2, 0])
                .scale([lineRadius, sceneHeight, lineRadius]),
            color: green
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, sceneHeight, 0])
                .scale([originRadius, originRadius * 3, originRadius]),
            color: green
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYSLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'S',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([originRadius * 1.5, originRadius * 1.5, 0]).scale(originRadius),
            color: green
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYWLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'W',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([0, sceneHeight + originRadius * 2, 0]).scale(originRadius),
            color: green
        },
        // Origin Z Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, 0, sceneDepth / 2])
                .rotateX(toRadians(90))
                .scale([lineRadius, sceneDepth, lineRadius]),
            color: blue
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([0, 0, sceneDepth])
                .rotateX(toRadians(90))
                .scale([originRadius, originRadius * 3, originRadius]),
            color: blue
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZQLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'Q',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([originRadius * 1.5, -originRadius * 1.5, 0]).scale(originRadius),
            color: blue
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZELabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'E',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([0, 0, sceneDepth + originRadius * 2]).scale(originRadius),
            color: blue
        }
    ].filter(n => (includeLetters && n.geometry === 'text' && n.text) || !n.text);
}

/*
 * Public API Surface of ccf
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CCFDatabase, CCFDatabaseStatusTracker, CCFSpatialScene, DEFAULT_CCF_DB_OPTIONS, addHubmapDataToStore, getOriginScene, getProbingSphereScene, searchHubmap };
//# sourceMappingURL=ccf-database.js.map
