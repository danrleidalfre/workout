import { getTokenStorage } from "@/storages/token";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://10.0.0.143:3333'
})

api.interceptors.request.use(async config => {
  const token = await getTokenStorage()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  await new Promise(resolve =>
    setTimeout(resolve, Math.round(Math.random() * 0))
  )

  return config
})

export { api };
