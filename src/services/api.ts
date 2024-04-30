import axios from 'axios'
import Cookies from 'js-cookie'

import {
  LoginData,
  LoginResponse,
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

export async function getTopRatedMovies({ pageParam }: { pageParam: number }) {
  const { data } = await api.get(`/api/movies/top-rated?page=${pageParam}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export async function getMovieByGenre({
  genreName,
  pageParam,
}: {
  genreName: string
  pageParam: number
}) {
  const { data } = await api.get(`/api/genre/${genreName}?page=${pageParam}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
