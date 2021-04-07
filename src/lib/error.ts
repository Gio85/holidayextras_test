import {  Response } from 'express'

export function formatError(errorMessage: string, res: Response, statusCode: number): any {
    return res.status(statusCode).json({
        status: 'error',
        message: errorMessage
    })
}