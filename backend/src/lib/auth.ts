import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from '../utils/config'
import { JWTPayload } from '../middlewares/auth'

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, config.JWT_SECRET!, {
    expiresIn: '7d'
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET!) as JWTPayload
}
