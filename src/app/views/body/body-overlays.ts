import { Overlay } from './overlays.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BodyOverlays {

    /**
     * Readonly property to define the kidney string.
     */
    readonly kidney = 'kidney';

    /**
     * Readonly property to define the kidney string.
     */
    readonly heart = 'heart';


    /**
     * Overlays path of body overlays.
     */
    readonly overlaysPath = 'assets/ccf/body/overlays/';

    /**
     * Overlays  of body that will be displayed on the top of body image.
     */
    overlays: Overlay[] = [{
        id : this.kidney,
        class: this.kidney + '-icon',
        path: this.overlaysPath + this.kidney + '/' + this.kidney + '.png',
        x: 233,
        y: 400
    },
    {
        id : this.heart,
        class: this.heart + '-icon',
        path: this.overlaysPath + this.heart + '/' + this.heart + '.png',
        x: 233,
        y: 250
    }];
}
