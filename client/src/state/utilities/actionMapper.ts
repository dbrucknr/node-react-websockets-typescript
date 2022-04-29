import { IThreadState } from "../reducers/threadReducer";
import { IParticipant, IThread } from "../../models/thread";
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
              status: "online",
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
    payload: IParticipant,
    status: StatusOptions
  ) => {
    let selectedThreadCopy = { ...state.selectedThread };
    const threadsCopy = state.threads.map((thread) => {
      let { participants } = thread;

      participants.map((person) => {
        if (person.id === payload.id) {
          return {
            ...person,
            status: status,
          };
        }
        return person;
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
