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

export type RegisterResponse = {
  id: number
  username: string
  email: string
  password: string
}

export type MoviePage = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
