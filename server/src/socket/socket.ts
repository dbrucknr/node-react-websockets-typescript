import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import http from "http";
import { User } from "../database/entities/user.entity";

const users = new Map();
const userSockets = new Map();

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

    socket.on("join", async (user: User) => {
      let sockets = [];
      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);

        sockets = [...existingUser.sockets, ...[socket.id]];
        userSockets.set(socket.id, user.id);
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
        sockets.push(socket.id);
        userSockets.set(socket.id, user.id);
      }
      console.log("join event detected");
      socket.emit("noArg");
      socket.emit("basicEmit", 1, "2", Buffer.from([3]));
      socket.emit("withAck", "4", (e) => {
        // e is inferred as number
        console.log(e);
      });
    });
  });
};
