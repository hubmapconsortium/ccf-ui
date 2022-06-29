// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => any;

/**
 * Small utility for creating callables that construct a new action
 *
 * @param type Action type
 * @returns Callable that creates a new action when called
 */
export function actionAsFn<T extends Constructor>(
  type: T
): (...args: ConstructorParameters<T>) => InstanceType<T> {
  return (...args) => new type(...args);
}
