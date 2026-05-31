import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

const featuredMovies = [
  {
    title: "Interstellar",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    overview:
      "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    rating: 8.7,
    release_date: "2014-11-05",
    runtime: 169
  },
  {
    title: "The Dark Knight",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    rating: 9.0,
    release_date: "2008-07-18",
    runtime: 152
  },
  {
    title: "Inception",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: inception, the implantation of another person's idea into a target's subconscious.",
    rating: 8.8,
    release_date: "2010-07-16",
    runtime: 148
  },
  {
    title: "Parasite",
    distance: 0,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    overview:
      "A poor family gradually infiltrates the lives of a wealthy household with unexpected consequences.",
    rating: 8.5,
    release_date: "2019-05-30",
    runtime: 133
  },
];

export default function Hero({
    movie,
    setMovie,
    setRecommendations,
    setMessage,
    setSelectedMovie
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
                            Start With
                        </h2>

                        <div className="h-px flex-1 bg-white/30" />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {featuredMovies.map((movie, index) => (
                            <MovieCard
                                key={index}
                                movieDetail={movie}
                                featured
                                onClick={() =>
                                    setSelectedMovie(movie)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}