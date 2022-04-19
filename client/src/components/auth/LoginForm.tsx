import { FormEvent, useState } from "react";
import "../../styles/login-form.css";
import image from "../../assets/typescript-vs-javascript-comparison_.jpeg";
import { AuthActions } from "../../state/actions/authActions";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = AuthActions();

  const handleLoginEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ email, password });
  };

  return (
    <>
      <div id="login-form-container">
        <div id="form-card">
          <div id="image-container">
            <img src={image} alt="ts vs js" className="login" />
          </div>
          <h2>Welcome back</h2>
          <hr />
          <form onSubmit={handleLoginEvent}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
