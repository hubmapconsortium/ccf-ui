import { Shallow } from 'shallow-render';

import { NumberDirective } from './numbers-only.directive';
import { NumbersOnlyModule } from './numbers-only.module';

describe('NumbersOnlyDirective', () => {
  let shallow: Shallow<NumberDirective>;

  beforeEach(() => {
    shallow = new Shallow(NumberDirective, NumbersOnlyModule);
  });

  it('should not accept letters in input', async () => {
    const { element } = await shallow.render('<input ccfNumbersOnly>');
    const input = element.nativeElement as HTMLInputElement;
    input.value = 'test';
    element.triggerEventHandler('input', { target: input, stopPropagation(): void { /* empty */ } });

    expect(input.value).toEqual('');
  });

  it('should not accept symbols in input', async () => {
    const { element } = await shallow.render('<input ccfNumbersOnly>');
    const input = element.nativeElement as HTMLInputElement;
    input.value = '!@#$%$^&*(';
    element.triggerEventHandler('input', { target: input, stopPropagation(): void { /* empty */ } });

    expect(input.value).toEqual('');
  });

  it('should accept numbers in input', async () => {
    const { element } = await shallow.render('<input ccfNumbersOnly>');
    const input = element.nativeElement as HTMLInputElement;
    input.value = '1234567890';
    element.triggerEventHandler('input', { target: input, stopPropagation(): void { /* empty */ } });

    expect(input.value).toEqual('1234567890');
  });
});
