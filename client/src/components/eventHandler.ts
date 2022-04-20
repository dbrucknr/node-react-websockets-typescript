import { FormEvent } from "react";

export const EventHandler = () => {
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    fn: Function,
    ...args: any[]
  ) => {
    try {
      event.preventDefault();
      await fn(...args);
    } catch (error) {
      console.error("Unable to handle submit event", error);
    }
  };

  return { handleSubmit };
};
