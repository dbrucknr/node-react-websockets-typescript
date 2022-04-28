import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import http from "http";

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
    socket.emit("noArg");

    socket.on("join", async () => {
      console.log("join event detected");
    });
  });
};
