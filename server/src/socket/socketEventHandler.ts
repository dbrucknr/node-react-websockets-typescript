import { Message } from "../database/entities/message.entity";
import { User } from "../database/entities/user.entity";
import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";

export const SocketEventHandler = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  const usersOnline = new Map();
  const userSockets = new Map();

  const handleJoin = async (user: User) => {
    console.log("join event detected");
  };

  const handleDisconnect = async () => {
    console.log("disconnect event detected");
  };

  const handleMessage = async (message: Message) => {
    console.log("message event detected");
  };

  return { handleJoin, handleDisconnect, handleMessage };
};
