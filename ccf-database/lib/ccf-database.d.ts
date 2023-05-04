import { JsonLd } from 'jsonld/jsonld-spec';
import { Quad, Store } from 'triple-store-utils';
import { CCFSpatialGraph } from './ccf-spatial-graph';
import { CCFSpatialScene, SpatialSceneNode } from './ccf-spatial-scene';
import { AggregateResult, DatabaseStatus, Filter, OntologyTreeModel, TissueBlockResult } from './interfaces';
import { FlatSpatialPlacement, SpatialEntity } from './spatial-types';
/** Database initialization options. */
export interface CCFDatabaseOptions {
    /** A url to load data from. */
    ccfOwlUrl: string;
    /** Context. */
    ccfContextUrl: string;
    /** A list of data sources (in n3, rdf, xml, owl, or jsonld format) */
    dataSources: (string | JsonLd)[];
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
export declare const DEFAULT_CCF_DB_OPTIONS: CCFDatabaseOptions;
/** Database provider. */
export declare class CCFDatabase {
    options: CCFDatabaseOptions;
    /** The triple store. */
    store: Store;
    /** The spatial graph */
    graph: CCFSpatialGraph;
    /** Creates SpatialEntity Scenes */
    scene: CCFSpatialScene;
    /** If the database is initialized */
    private initializing?;
    private status;
    /**
     * Creates an instance of ccfdatabase.
     *
     * @param [options] Initialization options.
     */
    constructor(options?: CCFDatabaseOptions);
    /**
     * Connects the database.
     *
     * @param [options] Options used to initialize.
     * @returns A promise resolving to true if data has been loaded into the database.
     */
    connect(options?: CCFDatabaseOptions, cached?: boolean): Promise<boolean>;
    private cachedConnect;
    /**
     * Actually connects to the database.
     *
     * @returns A promise resolving to void when connected.
     */
    private doConnect;
    addDataSources(sources: (string | JsonLd)[], inputStore?: Store): Promise<this>;
    synchronize(): Promise<this>;
    serialize(): string;
    deserialize(value: string): Promise<void>;
    /**
     * Gets all ids matching the filter.
     *
     * @param [filter] The filter.
     * @returns A set of all matching ids.
     */
    getIds(filter?: Filter): Set<string>;
    /**
     * Gets the data for an object.
     *
     * @param id The id of the requested object.
     * @returns The object data.
     */
    get(id: string): Quad[];
    /**
     * Gets the data for objects matching a filter.
     *
     * @param [filter] The filter.
     * @returns An array of data.
     */
    search(filter?: Filter): Quad[][];
    /**
     * Gets all spatial entities for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of spatial entities.
     */
    getSpatialEntities(filter?: Filter): SpatialEntity[];
    getDatabaseStatus(): Promise<DatabaseStatus>;
    /**
     * Get a list of technology names used by datasets
     *
     * @returns list of unique technology names in the data
     */
    getDatasetTechnologyNames(): Promise<string[]>;
    /**
     * Get a list of provider names from the database
     *
     * @returns list of unique provider names in the data
     */
    getProviderNames(): Promise<string[]>;
    /**
     * Gets all tissue block results for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of results.
     */
    getTissueBlockResults(filter?: Filter): Promise<TissueBlockResult[]>;
    /**
     * Gets all aggregate results for a filter.
     *
     * @param [filter] The filter.
     * @returns A list of aggregate data.
     */
    getAggregateResults(filter?: Filter): Promise<AggregateResult[]>;
    /**
     * Get number of occurrences of ontology terms for a set of ids.
     *
     * @param [filter] The filter.
     * @returns Ontology term counts.
     */
    getOntologyTermOccurences(filter?: Filter): Promise<Record<string, number>>;
    /**
     * Get number of occurrences of cell type terms for a set of ids.
     *
     * @param [filter] The filter.
     * @returns Cell type term counts.
     */
    getCellTypeTermOccurences(filter?: Filter): Promise<Record<string, number>>;
    /**
     * Get ontology term tree nodes
     *
     * @returns Ontology term counts.
     */
    getOntologyTreeModel(): Promise<OntologyTreeModel>;
    /**
     * Get cell type term tree nodes
     *
     * @returns Ontology term counts.
     */
    getCellTypeTreeModel(): Promise<OntologyTreeModel>;
    /**
     * Get reference organs
     *
     * @returns Ontology term counts.
     */
    getReferenceOrgans(): Promise<SpatialEntity[]>;
    /**
     * Get all nodes to form the 3D scene of reference body, organs, and tissues
     *
     * @param [filter] The filter.
     * @returns A list of Spatial Scene Nodes for the 3D Scene
     */
    getScene(filter?: Filter): Promise<SpatialSceneNode[]>;
    /**
     * Get all nodes to form the 3D scene of reference organ and tissues
     *
     * @param [organIri] The Reference Organ IRI
     * @param [filter] The filter.
     * @returns A list of Spatial Scene Nodes for the 3D Scene
     */
    getReferenceOrganScene(organIri: string, filter?: Filter): Promise<SpatialSceneNode[]>;
    getSpatialPlacement(source: SpatialEntity, targetIri: string): Promise<FlatSpatialPlacement | undefined>;
}
