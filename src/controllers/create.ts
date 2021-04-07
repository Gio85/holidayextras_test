import { Request, Response } from 'express'
import { formatResponse, isValidateRequestSchema } from '../utils'
import { createUserValidationSchema, UserModel } from '../models/user'
import { formatError } from '../lib/error'
import { IUser } from '../types'

export async function create(req: Request, res: Response) {
    const { error } = isValidateRequestSchema(req, createUserValidationSchema)
    if (error) {
        return formatError(error.message, res, 400)
    }

    const { email, familyName, givenName } = req.body as Partial<IUser>
    const foundUser = await UserModel.findOne({ email })
    if (foundUser) {
        return formatError(`User with email - ${email} - already in use`, res, 409)
    }

    const newUser = await new UserModel({
        givenName,
        familyName,
        email: email.toLocaleLowerCase()
    }).save()

    return formatResponse(newUser, res)
}
