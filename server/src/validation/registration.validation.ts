import Joi from "joi";

export const registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  passwordConfirm: Joi.ref("password"),
})
  .with("firstName", "lastName")
  .xor("password", "access_token")
  .with("password", "passwordConfirm");
