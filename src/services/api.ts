import axios from 'axios'

import { loginData } from '../utils/types'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export async function login(loginData: loginData) {
  const { data } = await api.post('/login', loginData)
  return data
}
