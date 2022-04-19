import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IAuthActions } from "../reducers/authReducer";
import { ILoginCredentials } from "../../services/auth.service";

export const AuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginService } = AuthService();
  const { retrieveUserData } = UserService();

  const login = async (credentials: ILoginCredentials) => {
    const response = await loginService(credentials);
    console.log("Examining response", response);
    if (response) {
      console.log("Within response.ok");
      await setUserData();
      // dispatch({ type: IAuthActions.LOGIN, payload: response });
      // return navigate("/");
    }
    // Add Failure Dispatch
    navigate("/login");
  };

  const setUserData = async () => {
    // I think I need a way of dealing with cookies
    const response = await retrieveUserData();
    console.log("setUserData", response);
    if (response) {
      dispatch({ type: IAuthActions.LOGIN, payload: response.body });
      return navigate("/");
    }
    navigate("/login");
  };
  return { login };
};
