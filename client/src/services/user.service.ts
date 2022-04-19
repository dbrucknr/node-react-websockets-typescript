import { attemptServiceRequest } from "./attemptServiceRequest";

const BASE_URL = "http://localhost:8000";
const headers = {
  "Content-Type": "application/json",
  credentials: "same-origin",
};

export const UserService = () => {
  const retrieveUserData = async () =>
    await attemptServiceRequest(async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return false;
    });

  return { retrieveUserData };
};
