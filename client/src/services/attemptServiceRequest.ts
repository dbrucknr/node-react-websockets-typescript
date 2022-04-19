export const attemptServiceRequest = async (fn: Function, ...args: any[]) => {
  try {
    return await fn(...args);
  } catch (error) {
    console.error(error);
  }
};
