import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSchema = z.object({
  search: z
    .string()
    .min(1, { message: 'Search must have at least 1 character' }),
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

  const onSubmit = (data: SearchFormValues) => {
    console.log(data)
  }

  //terminar lógica do search, terá que colocar uma rota para a página de search
  //fazer componente de user que terá endpoints do user na api

  return (
    <div className="flex h-24 justify-around bg-black">
      <h1 className="my-auto text-4xl text-white">
        React <span className="text-red-700">Flix</span>
      </h1>
      <form
        className="flex h-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            {...register('search')}
            type="text"
            placeholder="Search for a movie"
            className="h-12 w-[450px] rounded-full border border-[#131313] bg-black px-6 text-white outline-none placeholder:text-[#9392a3]"
          />
          <button
            type="submit"
            className="absolute right-4 h-12 text-[#9392a3]"
          >
            <Search className="transition duration-200 hover:text-white" />
          </button>
        </div>
        {errors.search && (
          <span className="flex justify-center px-4 text-sm text-red-500">
            {errors.search.message}
          </span>
        )}
      </form>
      <div className="mr-12 flex items-center text-white"></div>
    </div>
  )
}

export default Header
