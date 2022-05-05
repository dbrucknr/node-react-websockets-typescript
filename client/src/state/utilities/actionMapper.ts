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
        participants: thread.participants.map((participant) => {
          if (payload.includes(participant.user.id)) {
            return {
              ...participant,
              status: StatusOptions.ONLINE,
            };
          }
          return participant;
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
      const participants = thread.participants.map((participant) => {
        if (participant.user.id === payload.id) {
          return {
            ...participant,
            status: StatusOptions.ONLINE, // TODO - Test and set with param 'status'
          };
        }
        return participant;
      });

      if (thread.id === selectedThreadCopy.id) {
        selectedThreadCopy = {
          ...selectedThreadCopy,
          participants,
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
