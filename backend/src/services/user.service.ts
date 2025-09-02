import { prisma } from '../lib/prisma'
import { RegisterInput, UpdateProfileInput } from '../schemas/user.schema'

async function createNewUser(user: RegisterInput) {
  return await prisma.user.create({
    data: user
  })
}

async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      isOnline: true,
      lastSeen: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      isOnline: true,
      lastSeen: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      isOnline: true,
      lastSeen: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

async function updateUserProfile(userId: string, data: UpdateProfileInput) {
  return await prisma.user.update({
    where: { id: userId },
    data
  })
}

async function deleteUser(userId: string) {
  return await prisma.user.delete({
    where: { id: userId }
  })
}

export default {
  createNewUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserProfile,
  deleteUser
}
