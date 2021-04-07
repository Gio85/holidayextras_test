import { Request, Response } from 'express'
import { formatResponse, isValidatePathId, isValidateRequestSchema } from '../utils'
import { formatError } from '../lib/error'
import { fetchUser, UserModel, userUpdateValidationSchema } from '../models/user'
import { IUser } from '../types'

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const { error: pathError } = isValidatePathId(req.params)
    if (pathError) {
        return formatError(pathError.message, res, 400)
    }

    const { error: updateError } = isValidateRequestSchema(req, userUpdateValidationSchema)
    if (updateError) {
        return formatError(updateError.message, res, 400)
    }

    const { email, givenName, familyName } = req.body as IUser

    const { error: userError } = await fetchUser(req.params.id, res)
    if (userError) {
        return userError
    }

    const foundUser = await UserModel.findOne({ email })
    if (foundUser && foundUser.id !== id) {
        return formatError(`User with email - ${email} - already in use`, res, 409)
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { id },
        {
            email,
            givenName,
            familyName
        },
        { new: true }
    )

    return formatResponse(updatedUser, res)
}
