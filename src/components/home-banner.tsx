const HomeBanner = () => {
  return (
    <div className="grid select-none grid-cols-1 px-4 md:grid-cols-2 md:px-80">
      <span className="my-auto w-full text-2xl text-white md:w-[700px] md:p-12 md:text-6xl">
        Take your movie experience to the next{' '}
        <span className="text-red-700">level</span>
      </span>
      <img
        className="h-[300px] object-cover md:block md:h-[600px]"
        src="https://image.tmdb.org/t/p/original/qi6Edc1OPcyENecGtz8TF0DUr9e.jpg"
        alt="Movie Banner"
      />
    </div>
  )
}

export default HomeBanner
