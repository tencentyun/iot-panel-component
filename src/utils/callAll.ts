export function callAll<T extends (...args: any[]) => any>(...fns: T[]): T {
  return ((...args: any[]) => {
    let lastResult: any;
    for (const fn of fns) {
      if (typeof fn === 'function') {
        lastResult = fn(...args);
      }
    }
    return lastResult;
  }) as T;
}
