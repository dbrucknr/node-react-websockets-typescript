import { attemptServiceRequest } from "./attemptServiceRequest";

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegistrationCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const BASE_URL = "http://localhost:8000";
const headers = {
  "Content-Type": "application/json",
};

export const AuthService = () => {
  const loginService = async (credentials: ILoginCredentials) =>
    await attemptServiceRequest(async () => {
      const response = await fetch(`${BASE_URL}/login/user`, {
        method: "POST",
        headers,
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    });
  const registrationService = async (credentials: IRegistrationCredentials) =>
    await attemptServiceRequest(async () => {
      const response = await fetch(`${BASE_URL}/register/user`, {
        method: "POST",
        headers,
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    });
  const logoutService = async () =>
    // Test / Watch for removal of cookie assigned by server
    await attemptServiceRequest(async () => {
      const response = await fetch(`${BASE_URL}/login/user`, {
        method: "POST",
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    });

  return { loginService, registrationService, logoutService };
};
