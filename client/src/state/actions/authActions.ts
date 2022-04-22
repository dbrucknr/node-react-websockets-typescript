import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IAuthActions } from "../reducers/authReducer";
import {
  ILoginCredentials,
  IRegistrationCredentials,
} from "../../services/auth.service";
import { RootState } from "../store";

export const AuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
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
      dispatch({ type: IAuthActions.LOGIN, payload: response.user });
      navigate("/");
      return true;
    } else {
      navigate("/login");
      return false;
    }
    // return null;
  };

  return { login, register, setUserData, authenticated };
};
