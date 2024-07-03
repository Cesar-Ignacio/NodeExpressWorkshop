import z from 'zod'
import Joi from "joi";
export const loginSchemaZod = z.object({
  email: z.string().min(1, { message: "El correo es requerido" }).email({ message: "Email is invalid" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});


export const loginSchemaJoi = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El email no puede estar vacío',
    'string.email': 'Email inválido',
    'any.required': 'El campo email es obligatorio'
  }),
  password: Joi.string().required().messages({
    'any.required': 'El campo contraseña es obligatorio'
  })
});