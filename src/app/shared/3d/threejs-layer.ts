import { CustomLayerInterface, Map, MercatorCoordinate, LngLatLike } from 'mapbox-gl';
import { Camera, Matrix4, Scene, Vector3, WebGLRenderer } from 'three';

/**
 * Options for the threejs layer.
 */
interface ThreeJsLayerOptions {
  /** Identifier for this layer. */
  id: string;
  /** Map position of this layer. */
  position?: LngLatLike;
}

/**
 * A mapbox custom layer for adding threejs scenes to a map.
 */
export class ThreeJsLayer implements CustomLayerInterface {
  /** Identifier for this layer. */
  readonly id: string;
  /** Custom layer type. */
  readonly type = 'custom';
  /** 3D rendering */
  readonly renderingMode = '3d';
  /** Mapbox map instance on which the layer is attached. */
  map?: Map;

  /** The threejs scene on which objects can be added. */
  readonly scene = new Scene();
  /** The threejs camera for this layer. */
  readonly camera = new Camera();
  /** The unit scale for converting between scene values and map values. */
  unitScale?: number;
  /** The renderer used for drawing the scene. */
  private renderer!: WebGLRenderer;
  /** Transformation matrix for correct camera views. */
  private transformMatrix!: Matrix4;

  /**
   * Creates an instance of ThreeJsLayer.
   *
   * @param options The layer options.
   */
  constructor(readonly options: ThreeJsLayerOptions) {
    this.id = options.id;
  }

  /**
   * Adds this layer to a map. Automatically called by mapbox.
   *
   * @param map The map.
   * @param gl The rendering context.
   */
  onAdd(map: Map, gl: WebGLRenderingContext): void {
    this.map = map;
    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true
    });
    this.renderer.autoClear = false;

    // Create the transform matrix
    const position = this.options.position || map.getCenter();
    const coordinates = MercatorCoordinate.fromLngLat(position);
    const { x, y, z } = coordinates;
    const scale = this.unitScale = coordinates.meterInMercatorCoordinateUnits();
    this.transformMatrix = new Matrix4().makeTranslation(x, y, z)
      .scale(new Vector3(scale, -scale, scale));
  }

  /**
   * Cleans up the resources used be this layer. Automatically called by mapbox.
   *
   * @param _map The map.
   * @param _gl The rendering context.
   */
  onRemove(_map: Map, _gl: WebGLRenderingContext): void {
    this.scene.dispose();
    this.renderer.dispose();
  }

  /**
   * Renders the threejs scene onto the map. Automatically called by mapbox.
   *
   * @param _gl The rendering context.
   * @param matrixElements The current projection matrix.
   */
  render(_gl: WebGLRenderingContext, matrixElements: number[]): void {
    const matrix = new Matrix4().fromArray(matrixElements)
      .multiply(this.transformMatrix);

    this.camera.projectionMatrix = matrix;
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }
}
