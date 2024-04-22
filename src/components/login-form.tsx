import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must have at least 3 characters' })
    .max(55, { message: 'Username must have at most 55 characters' })
    .transform((username) => username.replace(/\s/g, ''))
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: 'Username only accepts letters and numbers',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' })
    .max(100, { message: 'Password must have at most 100 characters' })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password),
      {
        message:
          'Password must have at least one uppercase letter, one lowercase letter and one number.',
      },
    ),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-[520px] w-[420px] flex-col gap-5 rounded-lg p-10 shadow-xl">
        <div>
          <h1 className="text-[30px] font-semibold">Access your account</h1>
        </div>

        <div className="flex flex-col gap-8">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div>
              <input
                type="text"
                placeholder="Username"
                {...register('username')}
                className="mb-2 mt-3 w-full border-b border-black border-opacity-20 py-2 text-lg outline-none placeholder:text-base"
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="mt-8">
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="mb-2 mt-3 w-full border-b border-black border-opacity-20 py-2 text-lg outline-none placeholder:text-base"
              />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                type="submit"
                className="w-full rounded bg-blue-600 p-2 text-xl font-semibold  transition duration-200 hover:bg-blue-700"
              >
                <div className="flex items-center justify-center text-white">
                  <span>Login</span>
                </div>
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center justify-center gap-2 p-3 text-sm font-medium">
            <Link
              to={'/forgot-password'}
              className="flex items-center text-blue-600 transition duration-200 hover:text-blue-700"
            >
              <span>Forgot password</span>
              {/*adicionar função de esqueci senha */}
            </Link>
            <span>or</span>
            <Link
              to={'/create-account'}
              className="flex items-center text-blue-600 transition duration-200 hover:text-blue-700"
            >
              <span>Register a new account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
