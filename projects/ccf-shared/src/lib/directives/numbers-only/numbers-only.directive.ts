import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[ccfNumbersOnly]'
})
export class NumberDirective {
  constructor(private _el: ElementRef<HTMLInputElement>) { }

  // tslint:disable-next-line: no-unsafe-any
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
