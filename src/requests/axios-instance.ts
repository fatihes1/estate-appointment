import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/appkTtnhXACqj0kag/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_APP_AIRTABLE_ACCESS_TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axiosInstance
