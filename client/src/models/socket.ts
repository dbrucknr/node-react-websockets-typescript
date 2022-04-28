import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  join: () => void;
}

let instance: Websocket;

class Websocket {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:8000/",
    {
      transports: ["websocket"],
      withCredentials: true,
      upgrade: false,
    }
  );
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }
  getInstance() {
    return this;
  }
  getSocket() {
    return this.socket;
  }
}

export const socket = Object.freeze(new Websocket());
