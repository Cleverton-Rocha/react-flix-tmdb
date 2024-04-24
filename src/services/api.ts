import axios from 'axios'

import { LoginData, RegisterData } from '../utils/types'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export async function register(registerData: RegisterData) {
  const { data } = await api.post('/api/user', registerData)
  return data
}

export async function login(loginData: LoginData) {
  const { data } = await api.post('/login', loginData)
  return data
}
