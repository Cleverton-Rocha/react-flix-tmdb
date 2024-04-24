import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { useLogin } from '../queries/user'

import PasswordToggle from './password-toggle'

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
    .min(8, { message: 'Password must have at least 8 characters' }),
})

export type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
  const [inputType, setInputType] = useState('password')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const login = useLogin()

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data)
  }
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-[#131127] text-white">
        <div className="flex h-[550px] w-[450px] flex-col gap-5 rounded-lg p-10">
          <div className="flex flex-col items-center gap-4 text-white">
            <h1 className="text-4xl font-semibold">React Flix!</h1>
            <span>
              Don't have account yet?{' '}
              <Link
                to={'/create-account'}
                className="font-bold transition duration-200 hover:border-b hover:border-black"
              >
                Sign up
              </Link>
            </span>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2 flex-shrink text-white">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="flex flex-col"
            >
              <div>
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="E.g. your_username123"
                  {...register('username')}
                  className="mb-2 mt-3 w-full rounded-full bg-[#221f3a] px-4 py-2 text-lg outline-none placeholder:text-base"
                />
                {errors.username && (
                  <span className="flex justify-center px-4 text-sm  text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  {...register('password')}
                  type={inputType}
                  placeholder="Enter your password"
                  className="mb-2 mt-3 w-full rounded-full bg-[#221f3a] px-4 py-2 text-lg outline-none placeholder:text-base"
                />

                {errors.password && (
                  <span className="flex justify-center px-4 text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <PasswordToggle
                inputType={inputType}
                setInputType={setInputType}
                className="p-2"
              />

              <div className="mt-4 flex cursor-pointer justify-center transition hover:text-black">
                <button
                  type="submit"
                  className="w-2/3 rounded-full border-2 p-2 text-xl font-semibold hover:bg-white "
                >
                  <div className="flex items-center justify-center">
                    <span>Sign in</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
