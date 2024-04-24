import axios from 'axios'
import Cookies from 'js-cookie'

import {
  LoginData,
  LoginResponse,
  MoviePage,
  RegisterData,
  RegisterResponse,
} from '../utils/types'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

const token = Cookies.get('token')

export async function register(registerData: RegisterData) {
  const { data } = await api.post<RegisterResponse>('/api/user', registerData)
  return data
}

export async function login(loginData: LoginData) {
  const { data } = await api.post<LoginResponse>('/login', loginData)
  return data
}

export async function getTopRatedMovies(pageNumber: number = 1) {
  const { data } = await api.get<MoviePage>(
    `/api/movies/top-rated?page=${pageNumber}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return data
}
