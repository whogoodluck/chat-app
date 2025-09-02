import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'
import config from '../utils/config'

export interface JWTPayload {
  id: string
  email: string
  username: string
}

export interface ExpressRequest extends Request {
  user?: JWTPayload
}

async function authenticateToken(
  req: ExpressRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      throw new HttpError(401, 'Access token is required')
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as JWTPayload

    const user = await userService.getUserByEmail(decoded.email)

    if (!user || !user.isActive) {
      throw new HttpError(401, 'Invalid or expired token or user is inactive')
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username
    }

    next()
  } catch (err) {
    next(err)
  }
}

export default {
  authenticateToken
}
