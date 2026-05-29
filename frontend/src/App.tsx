import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero.tsx";
import MovieCard from "./components/MovieCard";
import type { Movie } from "./types/movie.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { useEffect } from "react";
import MovieModal from "./components/MovieModal.tsx";

const backgrounds = [
  "/backgrounds/Interstellar.png",
  "/backgrounds/bladerunner.png",
  "/backgrounds/inception.png",
  "/backgrounds/dune.png",
  "/backgrounds/endgame.png",
  "/backgrounds/batman.jpg",
  "/backgrounds/django.png",
];


function App() {

  const [movie, setMovie] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  const [currentBg, setCurrentBg] = useState(0);
  const [fade, setFade] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    console.log(recommendations);
  }, [recommendations]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentBg(
          (prev) => (prev + 1) % backgrounds.length
        );
        setFade(false);
      },400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <div className="fixed inset-0 z-[-1] bg-black" />
      <div
        className={`fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400
          ${fade ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: `url(${backgrounds[currentBg]})`,
        }}
      />
        <div
        className="fixed inset-0 z-10 bg-black/30"
    />
    <div
        className="fixed inset-0 z-20 bg-gradient-to-b from-black/10 via-black/20 to-black/70"
    />
      <div className="relative z-30 min-h-screen flex flex-col">
        <div className="pt-4">
          <Header></Header>
        </div>
        <main className="flex-grow">
          <Hero
            movie={movie}
            setMovie={setMovie}
            setRecommendations={setRecommendations}
            setSelectedMovie={setSelectedMovie}
        />
        {recommendations.length > 0 && (
          <div className="w-[95%] mx-auto mt-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-['Bebas_Neue'] text-3xl tracking-wide text-white uppercase whitespace-nowrap">
                Recommendations
              </h2>

              <div className="h-px flex-1 bg-white/30" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {recommendations.map((movie, index) => (
                <MovieCard
                  key={index}
                  movieDetail={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          </div>
        )}
        {selectedMovie && (
          <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
          />
      )}
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;