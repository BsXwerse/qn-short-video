export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): T {
  let lastCallTime = 0;

  return function (...args: Parameters<T>): any {
    const now = new Date().getTime();

    if (now - lastCallTime >= delay) {
      func(...args);
      lastCallTime = now;
    }
  } as T;
}
