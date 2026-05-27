import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";




const featuredMovies = [
  {
    title: "Interstellar",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.7,
    release_date: "2014-11-05",
  },
  {
    title: "The Dark Knight",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    overview:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
    rating: 9.0,
    release_date: "2008-07-18",
  },
  {
    title: "Inception",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given an impossible task.",
    rating: 8.8,
    release_date: "2010-07-16",
  },
  {
    title: "Parasite",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    overview:
      "A poor family gradually infiltrates the lives of a wealthy household with unexpected consequences.",
    rating: 8.5,
    release_date: "2019-05-30",
  },
];

export default function Hero({
    movie,
    setMovie,
    setRecommendations
}: any) {

    return (
        <section className="w-[95%] mx-auto mt-6">

            <div className="flex gap-4">

                {/* LEFT PANEL */}
                <div className="w-[40%]">

                    <h1 className="pt-14 font-['Bebas_Neue'] text-6xl tracking-wide leading-[0.9] uppercase text-white">
                        FIND YOUR NEXT
                        <br />
                        FAVORITE MOVIE.
                    </h1>

                    <p className="font-['Orbitron'] text-zinc-300 leading-relaxed font-light max-w-[590px] mt-6 text-base">
                        Personalized recommendations.
                        Hidden gems.
                        Top rated classics.
                    </p>

                    <div className="mt-8">
                        <SearchBar
                            movie={movie}
                            setMovie={setMovie}
                            setRecommendations={setRecommendations}
                        />
                    </div>
                </div>
                
                {/* RIGHT PANEL */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="font-['Bebas_Neue'] text-3xl tracking-wide text-white uppercase whitespace-nowrap">
                            Featured Movies
                        </h2>

                        <div className="h-px flex-1 bg-white/30" />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {featuredMovies.map((movie, index) => (
                            <MovieCard
                                key={index}
                                movieDetail={movie}
                                featured
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}