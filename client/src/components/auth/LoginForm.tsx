import { FormEvent, useState } from "react";
import "../../styles/login-form.css";
import image from "../../assets/typescript-vs-javascript-comparison_.jpeg";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <form onSubmit={login}>
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
