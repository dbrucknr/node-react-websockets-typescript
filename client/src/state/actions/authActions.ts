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
    if (response) {
      dispatch({ type: IAuthActions.LOGIN, payload: response });
      navigate("/");
      return true;
    } else {
      navigate("/login");
      return false;
    }
  };

  return { login, register, setUserData, authenticated, self };
};
