import { Request, Response } from 'express'
import { formatResponse, isValidatePathId } from '../utils'
import { formatError } from '../lib/error'
import { fetchUser } from '../models/user'

export async function read(req: Request, res: Response) {
    const { error } = isValidatePathId(req.params)
    if (error) {
        return formatError(error.message, res, 400)
    }

    const { error: userError, user } = await fetchUser(req.params.id, res)
    if (userError) {
        return userError
    }
    return formatResponse(user, res)
}
