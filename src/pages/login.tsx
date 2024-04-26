import LoginForm from '../components/login-form'
import LoginBanner from '../components/login-banner'

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <LoginBanner />
      <LoginForm />
    </div>
  )
}

export default Login
