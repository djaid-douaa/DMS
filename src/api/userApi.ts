import api from './axios'
import { mockUsers } from './mockData'

export const getUsers = async () => {
  try {
    // In a real app, this would be an API call
    return mockUsers
  } catch (error) {
    throw error
  }
}

export const createUser = async (userData: any) => {
  try {
    // In a real app, this would be an API call
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
    }
  } catch (error) {
    throw error
  }
}

export const updateUser = async (id: string, userData: any) => {
  try {
    // In a real app, this would be an API call
    return {
      id,
      ...userData,
    }
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    // In a real app, this would be an API call
    return true
  } catch (error) {
    throw error
  }
}