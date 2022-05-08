import express, { Application } from "express";
import cors from "cors";
import { routes } from "../routes/routes";
import cookieParser from "cookie-parser";
import { SocketServer } from "../socket/socket";
import http from "http";

export const startApplication = () => {
  try {
    const app: Application = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:3000"],
      })
    );

    // Routes
    routes(app);

    // Socket.io
    const server = http.createServer(app);
    SocketServer(server);

    server.listen(8000, () => {
      console.log("API Active and listening to Port 8000");
    });

    return server;
  } catch (error) {
    console.error("Unable to start application", error);
  }
};
