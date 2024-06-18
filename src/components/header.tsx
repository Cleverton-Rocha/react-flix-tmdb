import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const searchSchema = z.object({
  search: z.string().min(1, { message: 'Write at least one letter.' }),
})

type SearchFormValues = z.infer<typeof searchSchema>

const Header: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
  })

  const navigate = useNavigate()

  const onSubmit = (data: SearchFormValues) => {
    navigate(`/search/${data.search}`)
  }

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    toast.success('Logged out successfully.')
    setTimeout(() => {
      navigate('/')
    }, 5000)
  }

  return (
    <div className="flex h-24 justify-around gap-6 bg-black md:gap-0">
      <Link
        to="/home"
        className="my-auto hidden select-none text-4xl text-white md:block"
      >
        React <span className="text-red-700">Flix</span>
      </Link>
      <form
        className="flex h-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            {...register('search')}
            type="text"
            placeholder="Search for a movie"
            className="h-12 w-[280px] rounded-full border border-[#131313] bg-black px-6 text-white outline-none placeholder:text-[#9392a3] md:w-[450px]"
          />
          <button
            type="submit"
            className="absolute right-4 h-12 text-[#9392a3]"
          >
            <Search className="transition duration-200 hover:text-white" />
          </button>
        </div>
        {errors.search && (
          <span className="hidden justify-center px-4 text-sm font-semibold text-red-700 md:flex">
            {errors.search.message}
          </span>
        )}
      </form>
      <Link
        to="/"
        className="mr-12 flex items-center text-sm font-semibold text-white transition duration-200 hover:text-red-700 md:text-base"
        onClick={() => handleLogout()}
      >
        Log out
      </Link>
    </div>
  )
}

export default Header
