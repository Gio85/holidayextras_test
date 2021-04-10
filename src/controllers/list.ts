import { Request, Response } from 'express'
import { formatResponse } from '../utils'
import { UserModel } from '../models/user'

export async function list(req: Request, res: Response) {
    const users = await UserModel.find()
    return formatResponse(users, res)
}
