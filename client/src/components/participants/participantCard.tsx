import { IParticipant } from "../../models/thread";
import { FC } from "react";
import { IUser } from "../../models/user";

interface ParticipantCardProps {
  participant: IUser;
}

export const ParticipantCard: FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <div id="participant">
      {participant.firstName} {participant.lastName}
      <h1>{participant.status}</h1>
    </div>
  );
};
