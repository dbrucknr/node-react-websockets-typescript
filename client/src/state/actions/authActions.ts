import { AuthService } from "../../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { IAuthActions } from "../reducers/authReducer";
import { ILoginCredentials } from "../../services/auth.service";

export const AuthActions = () => {
  const dispatch = useDispatch();
  const { loginService } = AuthService();

  const login = async (credentials: ILoginCredentials) => {
    const response = await loginService(credentials);
    if (response.ok) {
      dispatch({ type: IAuthActions.LOGIN, payload: response.body });
    }
    // Add Failure Dispatch
  };
  return { login };
};
