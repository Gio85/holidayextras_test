import Mongoose, { Document } from 'mongoose'
import Joi from 'joi'
import { IUserDocument } from '../types'
import { v4 } from 'uuid'
import { formatError } from '../lib/error'
import { Response } from 'express'

export const userValidationSchema = Joi.object({
    id: Joi.string().uuid().required(),
    givenName: Joi.string().alphanum().required(),
    familyName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    createdAt: Joi.date().required()
})

export const userUpdateValidationSchema = Joi.object({
    id: Joi.string().uuid(),
    givenName: Joi.string().alphanum(),
    familyName: Joi.string().alphanum(),
    email: Joi.string().email(),
    createdAt: Joi.date()
})

export const createUserValidationSchema = userValidationSchema.keys({
    createdAt: Joi.forbidden(),
    id: Joi.forbidden()
})

export const userDefinitionSchema = {
    givenName: {
        type: String,
        required: true,
        validate: (value: string) => userValidationSchema.extract('givenName').validate(value)
    },
    familyName: {
        type: String,
        required: true,
        validate: (value: string) => userValidationSchema.extract('familyName').validate(value)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value: string) => userValidationSchema.extract('email').validate(value)
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: () => new Date()
    },
    id: {
        type: String,
        required: true,
        immutable: true,
        default: () => v4()
    }
}

const userSchema = new Mongoose.Schema(userDefinitionSchema)

export const UserModel = Mongoose.model<IUserDocument>('User', userSchema)

export async function fetchUser(id: string, res: Response): Promise<Partial<{user: Document; error: string }>> {
    const foundUser = await UserModel.findOne({ id })
    if (!foundUser) {
        return { error: formatError(`User with id - ${id} - not found`, res, 404) }
    }
    return { user: foundUser }
}
