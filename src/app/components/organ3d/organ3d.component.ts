import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Map, Style } from 'mapbox-gl';
import { AmbientLight, Color, Scene } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { BLANK_MAPBOX_STYLE } from '../../app-render-init.module';
import { centerObject, setObjectOpacity, setObjectRotation, setObjectSize } from '../../shared/3d/object3d-util';
import { ThreeJsLayer } from '../../shared/3d/threejs-layer';

/**
 * A component displaying a 3-dimensional organ model.
 */
@Component({
  selector: 'ccf-organ3d',
  templateUrl: './organ3d.component.html',
  styleUrls: ['./organ3d.component.scss']
})
export class Organ3dComponent implements OnChanges {
  /** URL to the base model. */
  @Input() base: string;
  /** Rotation of the base model. */
  @Input() baseRotation: { x?: number, y?: number, z?: number };

  /** Scene light color. */
  @Input() lightColor: string | number | Color = 0x404040;
  /** Scene light intensity. */
  @Input() lightIntensity = 10;

  // Mapbox config
  /** Center of the map. */
  readonly center = [-0.000016948963462937172, 0.0008592520813976989];
  /** Initial zoom of the map. */
  readonly zoom = [18.5];
  /** Initial pitch of the map. */
  readonly pitch = 60;

  // Scene config
  /** Size of threejs scenes added to the map. */
  readonly sceneSize = 100;
  /** Opacity of the threejs scenes added to the map. */
  readonly sceneOpacity = 0.5;

  /** The map instance. */
  private map!: Map;
  /** The threejs map layer. */
  private layer!: ThreeJsLayer;
  /** The base model scene. */
  private baseScene?: Scene;

  /**
   * Constructs a new 3D organ component.
   *
   * @param style The default mapbox style.
   */
  constructor(@Inject(BLANK_MAPBOX_STYLE) readonly style: Style) {}

  /**
   * OnChange lifecycle hook.
   *
   * @param changes The updated properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('base' in changes && this.layer) {
      this.layer.scene.remove(this.baseScene);
      this.loadBase();
    } else if ('baseRotation' in changes && this.baseScene) {
      this.resetPositionScaleRotation(this.baseScene);
      this.setPositionScaleRotation(this.baseScene, this.sceneSize, this.baseRotation);
    }
  }

  /**
   * Initializes the different map layers/scenes.
   *
   * @param map The mapbox map instance.
   */
  onMapLoad(map: Map): void {
    this.map = map;
    this.layer = new ThreeJsLayer({
      id: 'base-layer',
      position: [0, 0]
    });

    this.map.addLayer(this.layer);
    this.addLight();
    this.loadBase();
  }

  /**
   * Adds an ambient light to the scene.
   *
   * @param [color] The color value of the light.
   * @param [intensity] The intensity of the light.
   */
  private addLight(color: string | number | Color = this.lightColor, intensity = this.lightIntensity): void {
    const light = new AmbientLight(color, intensity);
    this.layer.scene.add(light);
  }

  /**
   * Loads a GLTF asset.
   *
   * @param source The asset url.
   * @returns The loaded asset.
   */
  private loadGltf(source: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(source, resolve, undefined, reject);
    });
  }

  /**
   * Loads the base GLTF model and adds it to the scene.
   */
  private async loadBase(): Promise<void> {
    const gltf = await this.loadGltf(this.base);
    const scene = this.baseScene = gltf.scene;
    setObjectOpacity(scene, this.sceneOpacity, true);
    this.setPositionScaleRotation(scene, this.sceneSize, this.baseRotation);
    this.layer.scene.add(scene);
  }

  /**
   * Sets the position, scale, and rotation of a scene.
   *
   * @param scene The scene to change.
   * @param size The size of the new bounding box.
   * @param [rotation] The rotation of the scene.
   */
  private setPositionScaleRotation(
    scene: Scene, size: number,
    rotation?: { x?: number, y?: number, z?: number }
  ): void {
    if (rotation !== undefined) {
      const { x, y, z } = rotation;
      setObjectRotation(scene, x, y, z);
    }

    setObjectSize(scene, size);
    centerObject(scene);
  }

  /**
   * Resets the position, scale, and rotation of a scene.
   *
   * @param scene The scene to reset.
   */
  private resetPositionScaleRotation(scene: Scene): void {
    scene.position.setScalar(0);
    scene.scale.setScalar(1);
    scene.rotation.set(0, 0, 0);
  }
}
