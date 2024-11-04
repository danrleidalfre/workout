import axios from "axios";

const api = axios.create({
  baseURL: 'http://10.0.0.142:3333'
})

api.interceptors.request.use(async config => {
  await new Promise(resolve =>
    setTimeout(resolve, Math.round(Math.random() * 0))
  )

  return config
})

export { api };
