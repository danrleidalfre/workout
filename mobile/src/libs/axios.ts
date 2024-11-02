import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.15.3:3333'
})

api.interceptors.request.use(async config => {
  await new Promise(resolve =>
    setTimeout(resolve, Math.round(Math.random() * 0))
  )

  return config
})

export { api };
