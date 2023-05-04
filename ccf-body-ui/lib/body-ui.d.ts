/// <reference types="deck.gl" />
import { Deck } from '@deck.gl/core';
import { Matrix4 } from '@math.gl/core';
import { SpatialSceneNode } from './shared/spatial-scene-node';
export interface BodyUIProps {
    id: string;
    canvas: string | HTMLCanvasElement;
    parent: HTMLElement;
    debugSceneNodeProcessing?: boolean;
    target: Matrix4 | number[];
    interactive: boolean;
    rotation: number;
    minRotationX: number;
    maxRotationX: number;
    zoom: number;
    legacyLighting?: boolean;
    camera: string;
}
export interface PickInfo<D> {
    layer: unknown;
    index: number;
    object: D;
    x: number;
    y: number;
    coordinate?: unknown;
    picked?: boolean;
}
export declare type NodeDragEvent = {
    node: SpatialSceneNode;
    info: PickInfo<SpatialSceneNode>;
    e: MouseEvent;
};
export declare type NodeClickEvent = {
    node: SpatialSceneNode;
    ctrlClick: boolean;
};
/**
 * A convenience wrapper class for the CCF Body UI
 */
export declare class BodyUI {
    private deckProps;
    deck: Deck;
    private readonly bodyUILayer;
    private readonly nodeClickSubject;
    private readonly nodeHoverStartSubject;
    private readonly nodeHoverStopSubject;
    private readonly sceneRotationSubject;
    private readonly nodeDragStartSubject;
    private readonly nodeDragSubject;
    private readonly nodeDragEndSubject;
    readonly nodeClick$: import("rxjs").Observable<NodeClickEvent>;
    readonly nodeHoverStart$: import("rxjs").Observable<SpatialSceneNode>;
    readonly nodeHoverStop$: import("rxjs").Observable<SpatialSceneNode>;
    readonly sceneRotation$: import("rxjs").Observable<[number, number]>;
    readonly nodeDragStart$: import("rxjs").Observable<NodeDragEvent>;
    readonly nodeDrag$: import("rxjs").Observable<NodeDragEvent>;
    readonly nodeDragEnd$: import("rxjs").Observable<NodeDragEvent>;
    private cursor?;
    private lastHovered?;
    constructor(deckProps: Partial<BodyUIProps>);
    initialize(): Promise<void>;
    finalize(): void;
    setScene(data: SpatialSceneNode[]): void;
    debugSceneNodeProcessing(data: SpatialSceneNode[], zoomOpacity: number): void;
    zoomTo(node: SpatialSceneNode): void;
    setRotation(value: number): void;
    setRotationX(value: number): void;
    setZoom(value: number): void;
    setTarget(value: number[]): void;
    setInteractive(value: boolean): void;
    private _onHover;
    private _onClick;
    private _onViewStateChange;
    private _onDragStart;
    private _onDrag;
    private _onDragEnd;
    private _dragEvent;
}
