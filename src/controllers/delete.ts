import { Request, Response } from 'express'
import { isValidatePathId } from '../utils'
import { formatError } from '../lib/error'
import { fetchUser, UserModel } from '../models/user'

export async function deleteUser(req: Request, res: Response) {
    const { error } = isValidatePathId(req.params)
    if (error) {
        return formatError(error.message, res, 400)
    }

    const { error: userError, user } = await fetchUser(req.params.id, res)
    if (userError) {
        return userError
    }

    await UserModel.findOneAndDelete({ id: user.id })
        .then(() =>
            res.status(200).json({
                message: `Resource with id - ${user.id} - successfully deleted`
            })
        )
        .catch((e) => formatError(e.message, res, 500))
}
