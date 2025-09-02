import { hashPassword, comparePassword, generateToken } from '../lib/auth'
import { registerSchema, loginSchema, updateProfileSchema } from '../schemas/user.schema'
import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'
import { ExpressRequest } from '../middlewares/auth'

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, fullName, password } = registerSchema.parse(req.body)

    const existingUser = await userService.getUserByEmail(email)
    if (existingUser) {
      throw new HttpError(409, 'User already exists')
    }

    const hashedPassword = await hashPassword(password)

    const user = await userService.createNewUser({
      email,
      fullName,
      username: email.split('@')[0],
      password: hashedPassword
    })

    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await userService.getUserByEmail(email)
    if (!user) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const token = generateToken({ email: user.email, username: user.username, id: user.id })

    return res.status(200).json({ token, user })
  } catch (err) {
    next(err)
  }
}

// If you’re managing sessions/tokens in memory or DB, implement logout logic accordingly.
// For stateless JWT, logout is client-side (e.g. deleting the token).
async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // Example: clear token from client (depends on frontend logic)
    return res.status(200).json({ message: 'Logout successful' })
  } catch (err) {
    next(err)
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers()

    return res.status(200).json({ users })
  } catch (err) {
    next(err)
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id

    const user = await userService.getUserById(userId)

    if (!user) {
      throw new HttpError(404, 'User not found')
    }

    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

async function getProfile(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id

    if (!userId) {
      throw new HttpError(401, 'Unauthorized')
    }

    const user = await userService.getUserById(userId)

    if (!user) {
      throw new HttpError(404, 'User not found')
    }

    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

async function updateProfile(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id

    if (!userId) {
      throw new HttpError(401, 'Unauthorized')
    }

    const data = updateProfileSchema.parse(req.body)

    const updatedUser = await userService.updateUserProfile(userId, data)

    return res.status(200).json({ user: updatedUser })
  } catch (err) {
    next(err)
  }
}

async function deleteAccount(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id

    if (!userId) {
      throw new HttpError(401, 'Unauthorized')
    }

    await userService.deleteUser(userId)

    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
  logout,
  getUsers,
  getUser,
  getProfile,
  updateProfile,
  deleteAccount
}
