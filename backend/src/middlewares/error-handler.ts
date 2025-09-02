import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import logger from '../utils/logger'

interface ErrorType extends Error {
  statusCode?: number
  code?: string
  details?: { message: string }[]
}

const getErrorResponse = (err: ErrorType) => {
  const types: Record<string, { statusCode: number; message: string }> = {
    HttpError: {
      statusCode: err.statusCode || 400,
      message: err.message
    },
    ZodError: {
      statusCode: 400,
      message: 'Validation error'
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'Internal server error'
    }
  }

  return types[err.name] || types['default']
}

const getZodErrorMessage = (error: ZodError): string => {
  return error.issues
    .map(issue => {
      return `${issue.message}`
    })
    .join(', ')
}

const getZodErrorResponse = (err: ZodError) => {
  return {
    statusCode: 400,
    message: getZodErrorMessage(err)
  }
}

const errorHandler = (
  err: ErrorType | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500
  let message = 'Internal server error'

  if (err instanceof ZodError) {
    const { statusCode: errStatusCode, message: errMessage } = getZodErrorResponse(err)
    statusCode = errStatusCode
    message = errMessage
    logger.error('Validation Error ->', getZodErrorMessage(err))
  } else {
    const { statusCode: errStatusCode, message: errMessage } = getErrorResponse(err)
    statusCode = errStatusCode
    message = errMessage
  }

  logger.error(err.message)
  return res.status(statusCode).json({ status: 'error', message })
}

export default errorHandler
