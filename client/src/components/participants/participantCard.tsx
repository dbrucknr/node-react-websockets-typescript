import { IParticipant } from "../../models/thread";
import { FC } from "react";

interface ParticipantCardProps {
  participant: IParticipant;
}

export const ParticipantCard: FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <div id="participant">
      {participant.user.firstName} {participant.user.lastName}
    </div>
  );
};
