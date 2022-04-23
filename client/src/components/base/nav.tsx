import { Link } from "react-router-dom";
import "../../styles/navigation.css";
import logo from "../../assets/typescript-logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export const Navigation = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const authStatus = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  return (
    <>
      <div id="navigation">
        <div id="top-left">
          <img src={logo} alt="logo" />
          <span>Messenger.io</span>
        </div>
      </div>
      <div id="selections">
        {authStatus ? (
          <div id="welcome-message">Welcome {user.firstName}</div>
        ) : (
          <div>
            <p>
              <Link to={"/login"}>Login</Link>
            </p>
            <p>
              <Link to={"/register"}>Register</Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};
