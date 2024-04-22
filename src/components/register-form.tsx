import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useState } from 'react'

import PasswordToggle from './password-toggle'

const registerSchema = z
  .object({
    email: z.string().email(),
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
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must have at least 8 characters' })
      .max(100, { message: 'Password must have at most 100 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm: React.FC = () => {
  const [inputType, setInputType] = useState('password')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-[#F9F9F9]">
        <div className="flex h-[800px] w-[450px] flex-col gap-5 rounded-lg p-10">
          <div className="flex flex-col items-center gap-4 ">
            <h1 className="text-4xl font-semibold">React Flix!</h1>
            <span>
              Already have an account?{' '}
              <Link
                to={'/'}
                className="font-bold transition duration-200 hover:border-b hover:border-black"
              >
                Sign in
              </Link>
            </span>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2 flex-shrink text-gray-600">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="flex flex-col"
            >
              <div>
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="E.g. example@email.com"
                  {...register('email')}
                  className="mb-2 mt-3 w-full rounded-full border bg-[#f1f1f1] px-4 py-2 text-lg outline-none placeholder:text-base"
                />
                {errors.email && (
                  <span className="flex justify-center px-4 text-sm  text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="E.g. your_username123"
                  {...register('username')}
                  className="mb-2 mt-3 w-full rounded-full border bg-[#f1f1f1] px-4 py-2 text-lg outline-none placeholder:text-base"
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
                  className="mb-2 mt-3 w-full rounded-full border bg-[#f1f1f1] px-4 py-2 text-lg outline-none placeholder:text-base"
                />

                {errors.password && (
                  <span className="flex justify-center px-4 text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="password" className="text-sm">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type={inputType}
                    placeholder="Confirm your password"
                    className="mb-2 mt-3 w-full rounded-full border bg-[#f1f1f1] px-4 py-2 text-lg outline-none placeholder:text-base"
                  />
                </div>

                {errors.confirmPassword && (
                  <span className="flex justify-center px-4 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <PasswordToggle
                inputType={inputType}
                setInputType={setInputType}
                className="p-2"
              />

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-2/3 rounded-full bg-black p-2 text-xl font-semibold transition duration-200 hover:scale-105"
                >
                  <div className="flex items-center justify-center text-white">
                    <span>Sign up</span>
                  </div>
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center justify-center text-sm font-medium"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
