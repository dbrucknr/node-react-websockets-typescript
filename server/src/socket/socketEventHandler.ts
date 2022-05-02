import { Message } from "../database/entities/message.entity";
import { User } from "../database/entities/user.entity";
import { Socket, Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import { ParticipantRepository } from "../database/repositories/repository";

type socketIO = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const usersOnline = new Map();
const userSockets = new Map();

export const SocketEventHandler = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  io: socketIO
) => {
  // const usersOnline = new Map();
  // const userSockets = new Map();

  const handleJoin = async (user: User) => {
    console.log("join event detected");
    const onlineParticipantsIds: number[] = [];
    let sockets = [];

    const setIncomingUserOnline = () => {
      usersOnline.set(user.id, { id: user.id, sockets: [socket.id] });
      sockets.push(socket.id);
      userSockets.set(socket.id, user.id);
    };

    const updateExistingUserSockets = () => {
      const existingUser = usersOnline.get(user.id);
      existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
      usersOnline.set(user.id, existingUser);
      sockets = [...existingUser.sockets, ...[socket.id]];
      userSockets.set(socket.id, user.id);
    };

    // Check joining User status:
    if (usersOnline.has(user.id)) {
      // Update existing user's socket
      console.log("User already online");

      updateExistingUserSockets();
    } else {
      // Set User Online
      console.log("Setting user online");

      setIncomingUserOnline();
    }

    console.log("usersOnline", usersOnline);

    // TODO: This block of logic is not type-safe
    // Find all users that are participants in joining user's thread(s)
    const participants = await findParticipants(user);
    console.log("participants", participants);

    // Notify other thread participants a thread member has come online:
    for (let i = 0; i < participants.length; i++) {
      if (usersOnline.has(participants[i])) {
        console.log("usersOnline has participant");

        const participant = usersOnline.get(participants[i]);

        participant.sockets.forEach((socket) => {
          try {
            console.log("Emitting online event to specific socket", user);
            io.to(socket).emit("online", user);
          } catch (error) {
            console.error("Error notifying friends user came online", error);
          }
          onlineParticipantsIds.push(participant.id);
        });
      }
    }
    // Send to user sockets which friends are online
    // TODO: This block of logic is not type-safe
    sockets.forEach((socket) => {
      try {
        io.to(socket).emit("participantsOnline", onlineParticipantsIds);
      } catch (error) {
        console.error(
          "Error notifying user which participants are online",
          error
        );
      }
    });
  };

  const handleDisconnect = async () => {
    console.log("disconnect event detected");
  };

  const handleMessage = async (message: Message) => {
    console.log("message event detected");
  };

  const findParticipants = async (user: User): Promise<User[]> => {
    try {
      const results = await ParticipantRepository.query(`
        SELECT p."userId" FROM "participant" as p
        INNER JOIN (
            SELECT t."id" FROM "thread" as t
            WHERE EXISTS (
                SELECT "u"."id" FROM "user" as u
                INNER JOIN "participant" on "u"."id" = "participant"."userId"
                WHERE u.id = ${user.id} AND t.id = "participant"."threadId"
              )
            ) AS pjoin on pjoin.id = "p"."threadId"
            WHERE p."userId" != ${user.id};
      `);
      return results.length > 0 ? results.map((value) => value.userId) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { handleJoin, handleDisconnect, handleMessage };
};
