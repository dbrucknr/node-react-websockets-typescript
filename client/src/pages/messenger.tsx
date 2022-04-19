import { useSelector } from "react-redux";
import { RootState } from "../state/store";
export const Messenger = () => {
  const currentUser = useSelector(
    (state: RootState) => state.authentication.user
  );
  console.log("messenger currentUser", currentUser);
  return (
    <div>
      <h1>Messenger Page</h1>
    </div>
  );
};
