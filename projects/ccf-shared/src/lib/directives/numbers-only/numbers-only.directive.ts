import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Directive for restricting an input element to integer only values.
 */
@Directive({
  selector: 'input[ccfNumbersOnly]'
})
export class NumberDirective {
  /**
   * Creates an instance of number directive.
   *
   * @param _el Reference to input element
   */
  constructor(private _el: ElementRef<HTMLInputElement>) { }

  /**
   * Listens to input changes and updates the text to only include numbers.
   *
   * @param event The input event
   */
  // tslint:disable-next-line: no-unsafe-any
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
