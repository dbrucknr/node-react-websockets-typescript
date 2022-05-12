import {
  AuthService,
  ILoginCredentials,
  IRegistrationCredentials,
} from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IAuthActions } from "../reducers/authReducer";
import { RootState } from "../store";
import { User } from "../../models/user";
import { IThreadActions } from "../reducers/threadReducer";

export const AuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  const self = useSelector(
    (state: RootState) => new User(state.authReducer.user)
  );

  const { loginService, registrationService } = AuthService();
  const { retrieveUserData } = UserService();

  const register = async (credentials: IRegistrationCredentials) => {
    const response = await registrationService(credentials);
    if (response) {
      navigate("/login");
    }
    navigate("/register");
  };

  const login = async (credentials: ILoginCredentials) => {
    const response = await loginService(credentials);
    if (response) {
      return await setUserData();
    }
    // Add Failure Dispatch
    navigate("/login");
  };

  const setUserData = async () => {
    const response = await retrieveUserData();
    console.log(response);
    if (response) {
      dispatch({ type: IAuthActions.LOGIN, payload: response });

      // This may imply a data structuring adjustment - there are now
      // two copies of threads - one nested in the user object and
      // one more in the thread state
      const { threads } = response;
      console.log("THREADS", threads);

      dispatch({ type: IThreadActions.SET_THREADS, payload: threads });

      navigate("/");
      return true;
    } else {
      navigate("/login");
      return false;
    }
  };

  return { login, register, setUserData, authenticated, self };
};
