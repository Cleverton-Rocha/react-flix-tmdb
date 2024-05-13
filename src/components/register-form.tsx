import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useState } from 'react'

import { useRegister } from '../queries/user'

import PasswordToggle from './password-toggle'

const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address.' }),
    username: z
      .string()
      .min(3, { message: 'Username must have at least 3 characters.' })
      .max(55, { message: 'Username must have at most 55 characters.' })
      .transform((username) => username.replace(/\s/g, ''))
      .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
        message: 'Username only accepts letters and numbers',
      }),
    password: z
      .string()
      .min(8, { message: 'Password must have at least 8 characters.' })
      .max(100, { message: 'Password must have at most 100 characters.' })
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
      .min(8, { message: 'Password must have at least 8 characters.' })
      .max(100, { message: 'Password must have at most 100 characters.' }),
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

  const registerUser = useRegister()

  const onSubmit = (data: RegisterFormValues) => {
    registerUser.mutate(data)
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-black text-white md:h-screen">
        <div className="flex h-[780px] w-[400px] flex-col gap-5 rounded-lg p-10 lg:w-[450px]">
          <div className="flex flex-col items-center gap-4 ">
            <h1 className="text-3xl font-semibold md:text-4xl">
              React <span className="text-red-700">Flix</span>
            </h1>
            <span className="text-sm md:text-base">
              Already have an account?{' '}
              <Link
                to={'/'}
                className="font-bold transition duration-200 hover:border-b hover:border-white"
              >
                Sign in
              </Link>
            </span>
          </div>

          <div className="relative flex items-center text-xs md:text-base">
            <div className="flex-grow border-t border-[#131313]"></div>
            <span className="mx-2 flex-shrink text-white">Or</span>
            <div className="flex-grow border-t border-[#131313]"></div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="email" className="text-xs md:text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="E.g. example@email.com"
                  {...register('email')}
                  className="mb-2 mt-3 w-full rounded-full border border-[#131313] bg-black px-4 py-2 text-lg text-white outline-none placeholder:text-sm placeholder:text-white/50 md:placeholder:text-base"
                />
                {errors.email && (
                  <span className="flex justify-center px-4 text-xs text-red-700  md:text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="username" className="text-xs md:text-sm">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="E.g. your_username123"
                  {...register('username')}
                  className="mb-2 mt-3 w-full rounded-full border border-[#131313] bg-black px-4 py-2 text-lg text-white outline-none  placeholder:text-sm placeholder:text-white/50 md:placeholder:text-base"
                />
                {errors.username && (
                  <span className="flex justify-center px-4 text-xs text-red-700  md:text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
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

              <div>
                <label htmlFor="password" className="text-xs md:text-sm">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type={inputType}
                    placeholder="Confirm your password"
                    className="mb-2 mt-3 w-full rounded-full border border-[#131313] bg-black px-4 py-2 text-lg text-white outline-none placeholder:text-sm placeholder:text-white/50 md:placeholder:text-base"
                  />
                </div>

                {errors.confirmPassword && (
                  <span className="flex justify-center px-4 text-xs text-red-700 md:text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <PasswordToggle
                inputType={inputType}
                setInputType={setInputType}
                className="px-2"
              />

              <div className="mt-2 flex cursor-pointer justify-center transition">
                <button
                  type="submit"
                  className="w-2/3 rounded-full border-2 border-[#131313] p-2 text-xl font-semibold hover:bg-white hover:text-black"
                >
                  <div className="flex items-center justify-center text-base md:text-xl">
                    <span>Sign up</span>
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

export default RegisterForm
