import { Router } from 'express'
import userController from '../controllers/user.controller'

import authMiddleware from '../middlewares/auth'

const userRouter: Router = Router()

userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUser)
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

// Authenticated user routes - require authentication only
userRouter.use(authMiddleware.authenticateToken)

userRouter.post('/logout', userController.logout)
userRouter.get('/profile', userController.getProfile)
userRouter.put('/profile', userController.updateProfile)
userRouter.delete('/account', userController.deleteAccount)

export default userRouter
