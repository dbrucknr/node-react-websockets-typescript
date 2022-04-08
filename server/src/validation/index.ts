import { registrationSchema } from "./registration.validation";
import { loginSchema } from "./login.validation";

export const handler = {
  register: registrationSchema,
  login: loginSchema,
};
