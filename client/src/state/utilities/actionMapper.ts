import { IThreadState } from "../reducers/threadReducer";
import { IParticipant, IThread } from "../../models/thread";
import { IUser } from "../../models/user";

export enum StatusOptions {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export const actionMapper = () => {
  const getOnlineUsers = (state: IThreadState, payload: number[]) => {
    console.log("TEST2 - inside getOnlineUsers", payload);
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
    console.log("TEST - inside setUserStatus", payload);

    let selectedThreadCopy = { ...state.selectedThread };
    const threadsCopy = state.threads.map((thread) => {
      // This is not applying the status property to the embedded user
      const participants = thread.participants.map((participant) => {
        if (participant.user.id === payload.id) {
          return {
            ...participant,
            status: StatusOptions.ONLINE,
          };
        }
        console.log(participant.user);
        return participant;
      });
      console.log("checking participants in setUserStatus", participants);

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

    console.log("Do status updates make it to threadsCopy", threadsCopy);
    return {
      ...state,
      threads: threadsCopy,
      selectedThread: selectedThreadCopy,
    };
  };

  return { setUserStatus, getOnlineUsers };
};
