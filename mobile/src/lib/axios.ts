import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(async config => {
  await new Promise(resolve =>
    setTimeout(resolve, Math.round(Math.random() * 0))
  )

  return config
})

export { api };
