import { FormEvent, ChangeEvent, useState } from "react";
import { AuthActions } from "../../state/actions/authActions";

export const RegistrationForm = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { register } = AuthActions();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((credentials) => ({
      ...credentials,
      [name]: value,
    }));
  };

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, email, password, passwordConfirm } =
      credentials;
    await register({ firstName, lastName, email, password, passwordConfirm });
  };
  return (
    <>
      <div>
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => handleInput(e)}
            defaultValue={credentials.firstName}
            required
            autoComplete="on"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => handleInput(e)}
            value={credentials.lastName}
            required
            autoComplete="on"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleInput(e)}
            value={credentials.email}
            required
            autoComplete="on"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
            value={credentials.password}
            required
            autoComplete="on"
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirmation"
            onChange={(e) => handleInput(e)}
            value={credentials.passwordConfirm}
            required
            autoComplete="on"
          />
          <button>Register</button>
        </form>
      </div>
    </>
  );
};
