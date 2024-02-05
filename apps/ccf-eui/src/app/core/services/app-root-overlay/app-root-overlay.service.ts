/* eslint-disable no-underscore-dangle */
import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable, ElementRef } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppRootOverlayContainer extends OverlayContainer {
  private rootElement!: ElementRef<HTMLElement>;
  private attached = false;

  setRootElement(el: ElementRef<HTMLElement>): void {
    if (this.attached) {
      this.rootElement.nativeElement.removeChild(this._containerElement);
      this.attached = false;
    }

    this.rootElement = el;
    this.rootElement.nativeElement.style.display = 'block';
    this.rootElement.nativeElement.style.position = 'contents';
    this.rootElement.nativeElement.style.height = '100%';
    this.appendToRoot();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected override _createContainer(): void {
    super._createContainer();
    this.appendToRoot();
  }

  private appendToRoot(): void {
    if (!this._containerElement || !this.rootElement) {
      return;
    }

    this.rootElement.nativeElement.appendChild(this._containerElement);
    this.attached = true;
  }
}
