
import Joi from "@hapi/joi";
import validateWith from '../../../../utils/handle-varidate'

const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required().trim()
        .messages({ 'any.required': 'You have to enter a username or email' })
        .messages({ 'string.empty': 'You have to enter a username or email' }),

    password: Joi.string().required().messages({ 'string.empty': 'You have to enter a password' })
})

const validateLogin = input => validateWith(loginSchema)(input)

export default validateLogin