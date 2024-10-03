import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use(async config => {
  await new Promise(resolve =>
    setTimeout(resolve, Math.round(Math.random() * 5000))
  )

  return config
})
