import { env } from '@/env'
import axios, { type AxiosInstance } from 'axios'

type ApiInstanceProps = AxiosInstance & {
  interceptToken: (logout: () => void) => () => void
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
}) as ApiInstanceProps

api.interceptToken = logout => {
  const interceptor = api.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 401) {
        logout()
      }
      return Promise.reject(error)
    }
  )

  return () => api.interceptors.response.eject(interceptor)
}

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  await new Promise(resolve =>
    setTimeout(resolve, Math.round(Math.random() * 0))
  )

  return config
})
