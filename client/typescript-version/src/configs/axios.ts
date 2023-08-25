import axios from 'axios'

const baseURL = 'http://localhost:5000'

export const instance = axios.create({
  baseURL,
  withCredentials: true // 서버로 쿠키를 보내려면 true로 설정
})

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      try {
        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true
        })
        console.log(response)
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError)
      }
    }

    return Promise.reject(error)
  }
)
