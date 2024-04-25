import Header from '../components/header'
import MovieCard from '../components/movie-card'

const Home: React.FC = () => {
  return (
    <div className="h-full bg-[#131127]">
      <Header />
      <MovieCard />
    </div>
  )
}

export default Home
