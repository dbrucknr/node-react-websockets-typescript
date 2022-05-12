import { IThreadState } from "../reducers/threadReducer";
import { IUser } from "../../models/user";

export enum StatusOptions {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export const actionMapper = () => {
  const getOnlineUsers = (state: IThreadState, payload: number[]) => {
    // Payload will be an array of ID's
    const threads = state.threads.map((thread) => {
      return {
        ...thread,
        participants: thread.users.map((participant) => {
          if (payload.includes(participant.id)) {
            return {
              ...participant,
              status: StatusOptions.ONLINE,
            };
          }
          return {
            ...participant,
            status: StatusOptions.OFFLINE,
          };
        }),
      };
    });
    return {
      ...state,
      threads: threads,
    };
  };

  const setUserStatus = (
    state: IThreadState,
    payload: IUser,
    status: StatusOptions
  ) => {
    let selectedThreadCopy = { ...state.selectedThread };
    const threadsCopy = state.threads.map((thread) => {
      const participants = thread.users.map((participant) => {
        if (participant.id === payload.id) {
          return {
            ...participant,
            status: status, // TODO - Test and set with param 'status'
          };
        }
        return participant;
      });

      if (thread.id === selectedThreadCopy.id) {
        selectedThreadCopy = {
          ...selectedThreadCopy,
          users: participants,
        };
      }
      return {
        ...thread,
        participants,
      };
    });
    return {
      ...state,
      threads: threadsCopy,
      selectedThread: selectedThreadCopy,
    };
  };

  return { setUserStatus, getOnlineUsers };
};
