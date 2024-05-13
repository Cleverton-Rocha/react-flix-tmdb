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
      <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
        <div className="flex h-[550px] w-[400px] flex-col gap-5 rounded-lg p-10 md:w-[450px]">
          <div className="flex flex-col items-center gap-4 text-white">
            <h1 className="text-3xl font-semibold md:text-4xl">
              React <span className="text-red-700">Flix</span>
            </h1>
            <span className="text-sm md:text-base">
              Don't have account yet?{' '}
              <Link
                to={'/create-account'}
                className="font-bold transition duration-200 hover:border-b hover:border-white"
              >
                Sign up
              </Link>
            </span>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#131313]"></div>
            <span className="mx-2 flex-shrink text-white">or</span>
            <div className="flex-grow border-t border-[#131313]"></div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="flex flex-col"
            >
              <div>
                <label htmlFor="username" className="text-xs md:text-sm">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  {...register('username')}
                  className="mb-2 mt-3 w-full rounded-full border border-[#131313] bg-black px-4 py-2 text-lg text-white outline-none placeholder:text-sm placeholder:text-white/50 md:placeholder:text-base"
                />
                {errors.username && (
                  <span className="flex justify-center px-4 text-xs text-red-700 md:text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="password" className="text-xs md:text-sm">
                  Password
                </label>
                <input
                  {...register('password')}
                  type={inputType}
                  placeholder="Enter your password"
                  className="mb-2 mt-3 w-full rounded-full border border-[#131313] bg-black px-4 py-2 text-lg text-white outline-none placeholder:text-sm placeholder:text-white/50 md:placeholder:text-base"
                />

                {errors.password && (
                  <span className="flex justify-center px-4 text-xs text-red-700 md:text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <PasswordToggle
                inputType={inputType}
                setInputType={setInputType}
                className="p-2"
              />

              <div className="mt-4 flex cursor-pointer justify-center transition">
                <button
                  type="submit"
                  className="w-2/3 rounded-full border-2 border-[#131313] p-2 text-xl font-semibold hover:bg-white hover:text-black"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-base md:text-lg">Sign in</span>
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
