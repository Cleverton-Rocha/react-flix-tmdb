import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

import { login, register } from '../../services/api'
import { LoginData, LoginResponse, RegisterData } from '../../utils/types'

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => {
      return register(data)
    },
    onSuccess: () => {
      toast.success('Registration successful!')
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        typeof error.response?.data === 'string'
          ? error.response.data
          : 'An error occurred. Please try again.'
      toast.error(errorMessage)
    },
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => {
      return login(data)
    },
    onSuccess: (response: LoginResponse) => {
      Cookies.set('token', response.accessToken, { expires: 1 / 12 })
      Cookies.set('username', response.username, { expires: 1 / 12 })
      toast.success('Login successful!')
      setTimeout(() => {
        window.location.href = '/home'
      }, 1500)
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        typeof error.response?.data === 'string'
          ? error.response.data
          : 'An error occurred. Please try again.'
      toast.error(errorMessage)
    },
  })
}
