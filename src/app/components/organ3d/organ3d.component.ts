import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Map, Style } from 'mapbox-gl';
import { AmbientLight, Color, Scene } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { BLANK_MAPBOX_STYLE } from '../../app-render-init.module';
import { centerObject, setObjectOpacity, setObjectRotation, setObjectSize } from '../../shared/3d/object3d-util';
import { ThreeJsLayer } from '../../shared/3d/threejs-layer';

@Component({
  selector: 'ccf-organ3d',
  templateUrl: './organ3d.component.html',
  styleUrls: ['./organ3d.component.scss']
})
export class Organ3dComponent implements OnChanges {
  @Input() base: string;
  @Input() baseRotation: { x?: number, y?: number, z?: number };

  @Input() lightColor: string | number | Color = 0x404040;
  @Input() lightIntensity = 10;

  // Mapbox config
  readonly center = [-0.000016948963462937172, 0.0008592520813976989];
  readonly zoom = [18.5];
  readonly pitch = 60;

  // Scene config
  readonly sceneSize = 100;
  readonly sceneOpacity = 0.5;

  private map!: Map;
  private layer!: ThreeJsLayer;
  private baseScene?: Scene;

  constructor(@Inject(BLANK_MAPBOX_STYLE) readonly style: Style) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('base' in changes && this.layer) {
      this.layer.scene.remove(this.baseScene);
      this.loadBase();
    } else if ('baseRotation' in changes && this.baseScene) {
      this.resetPositionScaleRotation(this.baseScene);
      this.setPositionScaleRotation(this.baseScene, this.sceneSize, this.baseRotation);
    }
  }

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

  private addLight(color: string | number | Color = this.lightColor, intensity = this.lightIntensity): void {
    const light = new AmbientLight(color, intensity);
    this.layer.scene.add(light);
  }

  private loadGltf(source: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(source, resolve, undefined, reject);
    });
  }

  private async loadBase(): Promise<void> {
    const gltf = await this.loadGltf(this.base);
    const scene = this.baseScene = gltf.scene;
    setObjectOpacity(scene, this.sceneOpacity, true);
    this.setPositionScaleRotation(scene, this.sceneSize, this.baseRotation);
    this.layer.scene.add(scene);
  }

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

  private resetPositionScaleRotation(scene: Scene): void {
    scene.position.setScalar(0);
    scene.scale.setScalar(1);
    scene.rotation.set(0, 0, 0);
  }
}
