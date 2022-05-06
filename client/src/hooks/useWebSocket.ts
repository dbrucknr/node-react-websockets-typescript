import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../models/socket";
import { IUser } from "../models/user";
import { RootState } from "../state/store";
import { IThreadActions } from "../state/reducers/threadReducer";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.authReducer.user);

  useEffect(() => {
    (async () => {
      try {
        const connection = socket.getSocket();
        connection.emit("join", currentUser);
        connection.emit("findOnlineUsers");

        connection.on("noArg", () => {
          console.log("Server issued noArg event");
        });

        connection.on("basicEmit", (args) => {
          console.log("Server issued basicEmit event", args);
        });

        connection.on("online", (user: IUser) => {
          dispatch({
            type: IThreadActions.SET_PARTICIPANT_ONLINE,
            payload: user,
          });
        });

        connection.on("offline", (user: IUser) => {
          console.log("server issued a offline event");

          dispatch({
            type: IThreadActions.SET_PARTICIPANT_OFFLINE,
            payload: user,
          });
        });

        connection.on("participantsOnline", (participantIds: number[]) => {
          console.log("Attempting to see all users online", participantIds);
          dispatch({
            type: IThreadActions.PARTICIPANTS_ONLINE,
            payload: participantIds,
          });
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
};
