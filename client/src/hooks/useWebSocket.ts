import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../models/socket";
import { RootState } from "../state/store";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.authReducer.user);

  useEffect(() => {
    (async () => {
      try {
        const connection = socket.getSocket();
        connection.emit("join", currentUser);
        connection.on("noArg", () => {
          console.log("Server issued noArg event");
        });
        connection.on("basicEmit", (args) => {
          console.log("Server issued basicEmit event", args);
        });

        connection.on("online", () => {});

        connection.on("participants", () => {});
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
};
