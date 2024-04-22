import MoviePoster from '../components/movie-poster'
import RegisterForm from '../components/register-form'

const Register: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <MoviePoster />
      <RegisterForm />
    </div>
  )
}

export default Register
