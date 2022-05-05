export const attemptQuery = (fn: Function, ...args: any[]) => {
  try {
    return fn(...args);
  } catch (error) {
    return console.log(error);
  }
};
