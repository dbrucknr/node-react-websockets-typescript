import { attemptServiceRequest } from "../../services/attemptServiceRequest";
import { UserService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";

export const UserActions = () => {
  const dispatch = useDispatch();
  const { retrieveUserData } = UserService();

  const setUserData = async () => {
    const response = await retrieveUserData();

    if (response) {
      // dispatch({ type: })
    }
  };

  return { setUserData };
};
