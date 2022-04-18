import { Link } from "react-router-dom";
import "../../styles/navigation.css";
import logo from "../../assets/typescript-logo.svg";

export const Navigation = () => {
  return (
    <>
      <div id="navigation">
        <div id="top-left">
          <img src={logo} alt="logo" />
          <span>Messenger.io</span>
        </div>
      </div>
      <div id="selections">
        <p>
          <Link to={"/login"}>Login</Link>
        </p>
        <p>
          <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </>
  );
};
