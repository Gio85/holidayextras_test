import { Request, Response } from 'express'
import Joi, { ValidationResult } from 'joi'
import { Document } from 'mongoose'
import { ParamsDictionary } from 'express-serve-static-core'

export function isValidatePathId(params: ParamsDictionary): ValidationResult {
    return Joi.object({
        id: Joi.string().uuid()
    }).validate(params)
}

export function isValidateRequestSchema(req: Request, schema: Joi.Schema): ValidationResult {
    const options = {
        abortEarly: false,
        allowUnknown: false
    }
    return schema.validate(req.body, options)
}

export function formatResponse(doc: Document | Document[], res: Response): Record<string, any> {
    if (Array.isArray(doc)) {
        const documents = doc.map((document) => {
            const { _id, __v, ...rest } = document.toObject()
            return rest
        })

        return res.json({ data: documents })
    }
    const { _id, __v, ...rest } = doc.toObject()
    return res.json({ data: rest })
}
