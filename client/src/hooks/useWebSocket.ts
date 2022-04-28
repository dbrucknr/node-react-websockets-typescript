import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { socket } from "../models/socket";

export const useWebSocket = () => {
  //   const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const connection = socket.getSocket();
      connection.emit("join");
    })();
  }, []);
};
