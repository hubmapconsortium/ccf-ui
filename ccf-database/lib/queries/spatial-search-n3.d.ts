import { OrientedBoundingBox } from '@math.gl/culling';
import { Store } from 'triple-store-utils';
import { CCFSpatialGraph } from '../ccf-spatial-graph';
import { SpatialSearch } from '../interfaces';
export declare function getOrientedBoundingBox(store: Store, graph: CCFSpatialGraph, sourceIri: string, targetIri: string): OrientedBoundingBox | undefined;
export declare function filterByProbingSphere(store: Store, graph: CCFSpatialGraph, seen: Set<string>, search: SpatialSearch): Set<string>;
