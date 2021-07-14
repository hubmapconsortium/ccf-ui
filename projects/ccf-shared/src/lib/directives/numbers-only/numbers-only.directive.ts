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
   * @param el Reference to input element
   */
  constructor(private el: ElementRef<HTMLInputElement>) { }

  /**
   * Listens to input changes and updates the text to only include numbers.
   *
   * @param event The input event
   */
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
