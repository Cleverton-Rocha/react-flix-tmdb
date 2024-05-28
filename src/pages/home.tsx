import GenreCarousel from '../components/genre-carousel'
import Header from '../components/header'
import HomeBanner from '../components/home-banner'
import MovieCarousel from '../components/movie-carousel'
import { RequireAuth } from '../components/requrieAuth'
import { useFetchTopRatedMovies } from '../queries/movie'

const Home: React.FC = () => {
  const { data } = useFetchTopRatedMovies()

  return (
    <RequireAuth>
      <div className="h-full bg-black px-12">
        <Header />
        <HomeBanner />
        <div className="flex flex-col gap-4">
          <MovieCarousel
            label="Top rated movies"
            redirectTo="/top-rated"
            results={data?.results ?? []}
          />
          <GenreCarousel />
        </div>
      </div>
    </RequireAuth>
  )
}

export default Home
