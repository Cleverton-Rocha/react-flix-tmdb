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

const Header = () => {
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
    <div className="flex h-24 justify-between bg-[#131127]">
      <h1 className="flex h-full items-center px-4 text-2xl font-bold text-white">
        React Flix.
      </h1>
      <form
        className="mx-auto flex h-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            {...register('search')}
            type="text"
            placeholder="Search here..."
            className="h-10 w-[300px] rounded-full bg-[#221f3a] p-4 text-white outline-none placeholder:text-[#9392a3]"
          />
          <button
            type="submit"
            className="absolute right-4 h-10 rounded-r-md text-[#9392a3]"
          >
            <Search />
          </button>
        </div>
        {errors.search && (
          <span className="flex justify-center px-4 text-sm text-red-500">
            {errors.search.message}
          </span>
        )}
      </form>
      <div className="flex items-center px-4 text-white">user icon</div>
    </div>
  )
}

export default Header
