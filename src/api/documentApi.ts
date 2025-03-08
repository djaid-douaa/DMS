import api from './axios'
import { mockDocuments } from './mockData'

export const getDocuments = async () => {
  try {
    // In a real app, this would be an API call
    return mockDocuments
  } catch (error) {
    throw error
  }
}

export const createDocument = async (documentData: any) => {
  try {
    // In a real app, this would be an API call
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...documentData,
    }
  } catch (error) {
    throw error
  }
}

export const updateDocument = async (id: string, documentData: any) => {
  try {
    // In a real app, this would be an API call
    return {
      id,
      ...documentData,
    }
  } catch (error) {
    throw error
  }
}

export const deleteDocument = async (id: string) => {
  try {
    // In a real app, this would be an API call
    return true
  } catch (error) {
    throw error
  }
}

export const uploadDocument = async (file: File) => {
  try {
    // In a real app, this would upload the file to a server
    return {
      url: URL.createObjectURL(file),
      filename: file.name,
    }
  } catch (error) {
    throw error
  }
}