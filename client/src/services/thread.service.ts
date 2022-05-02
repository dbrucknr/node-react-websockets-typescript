import { attemptServiceRequest } from "./attemptServiceRequest";

export interface IThreadMessages {
  id: number;
}

const BASE_URL = "http://localhost:8000";
// const headers = {
//   "Content-Type": "application/json",
// };

export const ThreadService = () => {
  const retrieveThreadMessages = async (id: number) =>
    await attemptServiceRequest(async () => {
      const response = await fetch(`${BASE_URL}/thread/messages/${id}`, {
        credentials: "include",
      });

      if (response.ok) {
        const messages = await response.json();
        console.log(
          "retrieveThreadMessages",
          messages["threadMessages"][0]["messages"]
        );
        return messages["threadMessages"][0]["messages"];
      }
      return false;
    });

  return { retrieveThreadMessages };
};
