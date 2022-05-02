import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import http from "http";
import { User } from "../database/entities/user.entity";
import { SocketEventHandler } from "./socketEventHandler";

export const SocketServer = (server: http.Server) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected");
    socket.emit("noArg"); // TODO: create an emit for alerting client of connect success
    const { handleJoin, handleDisconnect } = SocketEventHandler(socket, io);

    socket.on("join", async (user: User) => handleJoin(user));
    socket.on("disconnect", async () => handleDisconnect());
  });
};
