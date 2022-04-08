import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().required(),
});
