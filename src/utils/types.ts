export type LoginData = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  username: string
  expiresIn: string
}

export type RegisterData = {
  email: string
  username: string
  password: string
}
