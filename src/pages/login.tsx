import LoginForm from '../components/login-form'
import MoviePoster from '../components/movie-poster'

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <MoviePoster />
      <LoginForm />
    </div>
  )
}

export default Login
