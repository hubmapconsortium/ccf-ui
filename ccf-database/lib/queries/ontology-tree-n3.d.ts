import { Store } from 'triple-store-utils';
import { OntologyTreeModel, OntologyTreeNode } from '../interfaces';
export declare function getOntologyTreeNode(store: Store, iri: string, relationshipIri: string): OntologyTreeNode;
export declare function getOntologyTreeModel(store: Store, rootIri: string, rootLabel: string, relationshipIri: string): OntologyTreeModel;
export declare function getAnatomicalStructureTreeModelSlowly(store: Store): OntologyTreeModel;
export declare const getAnatomicalStructureTreeModel: typeof getAnatomicalStructureTreeModelSlowly & import("lodash").MemoizedFunction;
export declare function getCellTypeTreeModel(store: Store): OntologyTreeModel;
