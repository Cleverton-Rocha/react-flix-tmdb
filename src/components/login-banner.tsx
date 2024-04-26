import moviePoster from '../public/images/movie-poster.png'

const LoginBanner: React.FC = () => {
  return (
    <>
      <div>
        <img
          src={moviePoster}
          alt="Movies"
          className="hidden h-screen w-full object-cover object-center lg:block"
        />
      </div>
    </>
  )
}

export default LoginBanner
