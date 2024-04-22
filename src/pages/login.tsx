import LoginForm from '../components/login-form'
import LoginPoster from '../components/login-poster'

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <LoginPoster />
      <LoginForm />
    </div>
  )
}

export default Login
