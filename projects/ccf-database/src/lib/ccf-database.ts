/* eslint-disable @typescript-eslint/member-ordering */
import { delMany, get, setMany } from 'idb-keyval';
import { JsonLd } from 'jsonld/jsonld-spec';
import {
  addJsonLdToStore, addN3ToStore, addRdfXmlToStore, DataFactory, deserializeN3Store, Quad, serializeN3Store, Store
} from 'triple-store-utils';

import { CCFSpatialGraph } from './ccf-spatial-graph';
import { CCFSpatialScene, SpatialSceneNode } from './ccf-spatial-scene';
import { searchHubmap } from './hubmap/hubmap-data-import';
import { AggregateResult, Filter, OntologyTreeModel, TissueBlockResult } from './interfaces';
import { getAggregateResults, getDatasetTechnologyNames, getProviderNames } from './queries/aggregate-results-n3';
import { findIds } from './queries/find-ids-n3';
import { getOntologyTermOccurences } from './queries/ontology-term-occurences-n3';
import { getOntologyTreeModel } from './queries/ontology-tree-n3';
import { getSpatialEntityForEntity } from './queries/spatial-result-n3';
import { getTissueBlockResult } from './queries/tissue-block-result-n3';
import { SpatialEntity } from './spatial-types';


/** Database initialization options. */
export interface CCFDatabaseOptions {
  /** A url to load data from. */
  ccfOwlUrl: string;
  /** Context. */
  ccfContextUrl: string;
  /** A list of data sources (in n3, rdf, xml, owl, or jsonld format) */
  dataSources: (string|JsonLd)[];
  /** Data service type. */
  hubmapDataService: 'static' | 'search-api';
  /** HuBMAP Elastic Search Query */
  hubmapQuery?: unknown;
  /** Hubmap Portal url. */
  hubmapPortalUrl: string;
  /** Hubmap data url. */
  hubmapDataUrl: string;
  /** Hubmap assets api url. */
  hubmapAssetsUrl: string;
  /** HuBMAP Service Token. */
  hubmapToken?: string;
}

/** Default initialization options. */
export const DEFAULT_CCF_DB_OPTIONS: CCFDatabaseOptions = {
  ccfOwlUrl: 'https://purl.org/ccf/latest/ccf.owl',
  ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
  dataSources: [],
  hubmapDataService: 'static',
  hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
  hubmapDataUrl: '',
  hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
};

/** Database provider. */
export class CCFDatabase {
  /** The triple store. */
  store: Store;
  /** The spatial graph */
  graph: CCFSpatialGraph;
  /** Creates SpatialEntity Scenes */
  scene: CCFSpatialScene;
  /** If the database is initialized */
  private initializing?: Promise<void>;

  /**
   * Creates an instance of ccfdatabase.
   *
   * @param [options] Initialization options.
   */
  constructor(public options: CCFDatabaseOptions = DEFAULT_CCF_DB_OPTIONS) {
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
  async connect(options?: CCFDatabaseOptions, cached = false): Promise<boolean> {
    if (options) {
      this.options = options;
    }
    if (!this.initializing) {
      if (cached) {
        this.initializing = this.cachedConnect();
      } else {
        this.initializing = this.doConnect();
      }
    }
    await this.initializing;
    return this.store.size > 0;
  }

  private async cachedConnect(): Promise<void> {
    const start = new Date().getTime();
    const lastModifiedKey = 'ccf-database.last_modified';
    const ccfDatabaseKey = 'ccf-database';

    const lastModified = await get(lastModifiedKey).catch(() => undefined);
    let serializedDb: string | undefined;

    if (lastModified && start - new Date(+lastModified).getTime() > 60*60*1000) {
      await delMany([ccfDatabaseKey, lastModifiedKey]).catch(() => undefined);
    } else {
      serializedDb = await get(ccfDatabaseKey).catch(() => undefined);
    }

    if (serializedDb) {
      await this.deserialize(serializedDb);
    } else {
      await this.doConnect();

      setMany([
        [ccfDatabaseKey, this.serialize()],
        [lastModifiedKey, '' + start]
      ]).catch(() => undefined);
    }
  }

  /**
   * Actually connects to the database.
   *
   * @returns A promise resolving to void when connected.
   */
  private async doConnect(): Promise<void> {
    const ops: Promise<unknown>[] = [];
    const sources: (string|JsonLd)[] = this.options.dataSources?.concat() ?? [];

    const ccfOwlUrl = this.options.ccfOwlUrl;
    if (ccfOwlUrl.endsWith('.n3store.json')) {
      const storeString = await fetch(ccfOwlUrl).then(r => r.text())
        .catch(() => console.log('Couldn\'t locate serialized store.'));
      if (storeString) {
        this.store = deserializeN3Store(storeString, DataFactory);
      }
    } else if (ccfOwlUrl?.length > 0) {
      sources.push(ccfOwlUrl);
    }
    if (this.options.hubmapDataUrl) {
      if (this.options.hubmapDataUrl.endsWith('jsonld')) {
        sources.push(this.options.hubmapDataUrl);
      } else {
        ops.push(searchHubmap(
          this.options.hubmapDataUrl,
          this.options.hubmapDataService,
          this.options.hubmapQuery,
          this.options.hubmapToken,
          this.options.hubmapAssetsUrl,
          this.options.hubmapPortalUrl
        ).then((jsonld) => {
          if (jsonld) {
            return this.addDataSources([jsonld]);
          } else {
            return undefined;
          }
        }));
      }
    }
    ops.push(this.addDataSources(sources));
    await Promise.all(ops);
    await this.synchronize();
  }

  async addDataSources(sources: (string|JsonLd)[], inputStore?: Store): Promise<this> {
    const store: Store = inputStore ?? this.store;
    await Promise.all(
      sources.map(async (source) => {
        if (typeof source === 'string') {
          if (source.endsWith('jsonld')) {
            source = await(fetch(source).then(r => r.json()));
            source['@context'] = {
                "@base": "http://purl.org/ccf/latest/ccf.owl#",
                "@vocab": "http://purl.org/ccf/latest/ccf.owl#",
                "ccf": "http://purl.org/ccf/",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "dcterms": 'http://purl.org/dc/terms/',
                "label": "rdfs:label",
                "description": "rdfs:comment",
                "link": "ccf:url",
                "sex": "ccf:sex",
                "age": "ccf:age",
                "bmi": "ccf:bmi",
                "consortium_name": "ccf:consortium_name",
                "provider_name": "ccf:tissue_provider_name",
                "provider_uuid": "ccf:tissue_provider_uuid",
                "donor": { "@id": "ccf:comes_from", "@type": "@id" },
                "samples": { "@reverse": "donor" },
                "sections": { "@id": "ccf:subdivided_into_sections", "@type": "@id"},
                "datasets": { "@id": "ccf:generates_dataset", "@type": "@id" },
                "sample_type": "ccf:sample_type",
                "section_count": "ccf:section_count",
                "section_size": "ccf:section_size",
                "section_units": "ccf:section_size_unit",
                "section_number": "ccf:section_number",
                "rui_location": { "@id": "ccf:has_registration_location", "@type": "@id" },
                "ccf_annotations": "ccf:collides_with",
                "representation_of": { "@id": "ccf:representation_of", "@type": "@id" },
                "reference_organ": { "@id": "ccf:has_reference_organ", "@type": "@id" },
                "extraction_set_for": { "@id": "ccf:extraction_set_for", "@type": "@id" },
                "extraction_set": { "@id": "ccf:has_extraction_set", "@type": "@id" },
                "organ_owner_sex": "ccf:organ_owner_sex",
                "side": "ccf:organ_side",
                "rui_rank": "ccf:rui_rank",
                "slice_thickness": "ccf:slice_thickness",
                "slice_count": "ccf:slice_count",
                "object": { "@id": "ccf:has_object_reference", "@type": "@id" },
                "creation_date": "dcterms:created",
                "updated_date": "ccf:updated_date",
                "creator": "dcterms:creator",
                "creator_first_name": "ccf:creator_first_name",
                "creator_last_name": "ccf:creator_last_name",
                "placement": { "@id": "ccf:has_placement", "@type": "@id" },
                "placement_date": "dcterms:created",
                "rotation_order": "ccf:rotation_order",
                "dimension_units": "ccf:dimension_unit",
                "rotation_units": "ccf:rotation_unit",
                "scaling_units": "ccf:scaling_unit",
                "translation_units": "ccf:translation_unit",
                "source": { "@id": "ccf:placement_relative_to", "@type": "@id" },
                "target": { "@id": "ccf:placement_for", "@type": "@id" },
                "x_rotation": "ccf:x_rotation",
                "y_rotation": "ccf:y_rotation",
                "z_rotation": "ccf:z_rotation",
                "x_scaling": "ccf:x_scaling",
                "y_scaling": "ccf:y_scaling",
                "z_scaling": "ccf:z_scaling",
                "x_translation": "ccf:x_translation",
                "y_translation": "ccf:y_translation",
                "z_translation": "ccf:z_translation",
                "x_dimension": "ccf:x_dimension",
                "y_dimension": "ccf:y_dimension",
                "z_dimension": "ccf:z_dimension",
                "ontology_terms": { "@id": "ccf:has_ontology_term", "@type": "@id" },
                "technology": "ccf:technology",
                "thumbnail": "ccf:thumbnail",
                "file": "ccf:file_url",
                "file_format": "ccf:file_format",
                "file_subpath": "ccf:file_subpath"
            };
            await addJsonLdToStore(source, store);
          } else if (source.endsWith('n3')) {
            await addN3ToStore(source, store);
          } else if (source.endsWith('rdf') || source.endsWith('owl') || source.endsWith('xml')) {
            await addRdfXmlToStore(source, store);
          } else {
            // Passthrough assumes a JSON-LD response
            await addJsonLdToStore(source, store);
          }
        } else {
          await addJsonLdToStore(source, store);
        }
      })
    );
    console.log(store);
    return this;
  }

  async synchronize(): Promise<this> {
    // Add a small delay to allow the triple store to settle
    await new Promise(r => {
      setTimeout(r, 500);
    });
    this.graph.createGraph();
    return this;
  }

  serialize(): string {
    return serializeN3Store(this.store);
  }

  async deserialize(value: string): Promise<void> {
    this.store = deserializeN3Store(value, DataFactory);
    this.graph = new CCFSpatialGraph(this);
    this.scene = new CCFSpatialScene(this);
    await new Promise(r => {
      setTimeout(r, 10);
    });
  }

  /**
   * Gets all ids matching the filter.
   *
   * @param [filter] The filter.
   * @returns A set of all matching ids.
   */
  getIds(filter: Filter = {} as Filter): Set<string> {
    return findIds(this.store, filter);
  }

  /**
   * Gets the data for an object.
   *
   * @param id The id of the requested object.
   * @returns The object data.
   */
  get(id: string): Quad[] {
    return this.store.getQuads(DataFactory.namedNode(id), null, null, null);
  }

  /**
   * Gets the data for objects matching a filter.
   *
   * @param [filter] The filter.
   * @returns An array of data.
   */
  search(filter: Filter = {} as Filter): Quad[][] {
    return [...this.getIds(filter)].map((s) => this.get(s));
  }

  /**
   * Gets all spatial entities for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of spatial entities.
   */
  getSpatialEntities(filter?: Filter): SpatialEntity[] {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    filter = { ...filter, hasSpatialEntity: true } as Filter;
    return [...this.getIds(filter)].map((s) => getSpatialEntityForEntity(this.store, s) as SpatialEntity);
  }

  /**
   * Get a list of technology names used by datasets
   *
   * @returns list of unique technology names in the data
   */
  async getDatasetTechnologyNames(): Promise<string[]> {
    return getDatasetTechnologyNames(this.store);
  }

  /**
   * Get a list of provider names from the database
   *
   * @returns list of unique provider names in the data
   */
  async getProviderNames(): Promise<string[]> {
    return getProviderNames(this.store);
  }

  /**
   * Gets all tissue block results for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of results.
   */
  async getTissueBlockResults(filter?: Filter): Promise<TissueBlockResult[]> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    filter = { ...filter, hasSpatialEntity: true } as Filter;
    return [...this.getIds(filter)].map((s) => getTissueBlockResult(this.store, s));
  }

  /**
   * Gets all aggregate results for a filter.
   *
   * @param [filter] The filter.
   * @returns A list of aggregate data.
   */
  async getAggregateResults(filter?: Filter): Promise<AggregateResult[]> {
    return getAggregateResults(this.getIds(filter), this.store);
  }

  /**
   * Get number of occurrences of ontology terms for a set of ids.
   *
   * @param [filter] The filter.
   * @returns Ontology term counts.
   */
  async getOntologyTermOccurences(filter?: Filter): Promise<Record<string, number>> {
    return getOntologyTermOccurences(this.getIds(filter), this.store);
  }

  /**
   * Get ontology term tree nodes
   *
   * @returns Ontology term counts.
   */
  async getOntologyTreeModel(): Promise<OntologyTreeModel> {
    return getOntologyTreeModel(this.store);
  }

  /**
   * Get reference organs
   *
   * @returns Ontology term counts.
   */
  async getReferenceOrgans(): Promise<SpatialEntity[]> {
    return this.scene.getReferenceOrgans();
  }

  /**
   * Get all nodes to form the 3D scene of reference body, organs, and tissues
   *
   * @param [filter] The filter.
   * @returns A list of Spatial Scene Nodes for the 3D Scene
   */
  async getScene(filter?: Filter): Promise<SpatialSceneNode[]> {
    this.graph.createGraph();
    return this.scene.getScene(filter);
  }

  /**
   * Get all nodes to form the 3D scene of reference organ and tissues
   *
   * @param [organIri] The Reference Organ IRI
   * @param [filter] The filter.
   * @returns A list of Spatial Scene Nodes for the 3D Scene
   */
  async getReferenceOrganScene(organIri: string, filter?: Filter): Promise<SpatialSceneNode[]> {
    this.graph.createGraph();
    return this.scene.getReferenceOrganScene(organIri, filter);
  }
}
