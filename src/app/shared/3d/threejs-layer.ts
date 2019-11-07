import { CustomLayerInterface, Map, MercatorCoordinate, LngLatLike } from 'mapbox-gl';
import { Camera, Matrix4, Scene, Vector3, WebGLRenderer } from 'three';

interface ThreeJsLayerOptions {
  id: string;
  position?: LngLatLike;
}

export class ThreeJsLayer implements CustomLayerInterface {
  readonly id: string;
  readonly type = 'custom';
  readonly renderingMode = '3d';
  map?: Map;

  readonly scene = new Scene();
  readonly camera = new Camera();
  unitScale?: number;
  private renderer!: WebGLRenderer;
  private transformMatrix!: Matrix4;

  constructor(readonly options: ThreeJsLayerOptions) {
    this.id = options.id;
  }

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

  onRemove(_map: Map, _gl: WebGLRenderingContext): void {
    this.scene.dispose();
    this.renderer.dispose();
  }

  render(_gl: WebGLRenderingContext, matrixElements: number[]): void {
    const matrix = new Matrix4().fromArray(matrixElements)
      .multiply(this.transformMatrix);

    this.camera.projectionMatrix = matrix;
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }
}
