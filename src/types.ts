import Mongoose from 'mongoose'

export interface IUser {
    id?: any
    email: string
    givenName: string
    familyName: string
    createdAt: Date
}

export interface IUserDocument extends Mongoose.Document, IUser {}
