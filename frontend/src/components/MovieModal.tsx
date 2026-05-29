interface MovieModalProps {
    movie: any;
    onClose: () => void;
}

export default function MovieModal({movie,onClose}: MovieModalProps) {

    const releaseYear = movie.release_date? movie.release_date.split("-")[0]: "N/A";

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
            onClick={onClose}
        >

            {/* MODAL */}

            <div
                className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c0c]/95 shadow-[0_0_60px_rgba(0,0,0,0.7)] animate-[fadeIn_0.3s_ease]"

                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-5 right-5 w-10 h-10 rounded-full  bg-white/10 hover:bg-white/20 text-white text-xl cursor-pointer transition-all duration-200z-20"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="flex flex-col md:flex-row">
                    <div
                        className="md:w-[35%] bg-black flex items-center justify-center"
                    >
                        <img
                            src={
                                movie.poster
                                || "/fallback-poster.png"
                            }
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="md:w-[65%] p-8 flex flex-col text-white"
                    >
                        <h1
                            className="font-['Bebas_Neue'] text-6xl tracking-wide leading-none"
                        >
                            {movie.title}
                        </h1>
                        <div
                            className="flex flex-wrap items-center gap-4 mt-4 text-white/70 font-['Quicksand']"
                        >
                            <span>
                                {releaseYear}
                            </span>
                            {movie.runtime && (
                                <span>
                                    ⏱ {movie.runtime} min
                                </span>
                            )}
                            {movie.rating && (
                                <span
                                    className="bg-[#e8ddb5] text-black px-3 py-1 rounded-lg font-bold"
                                >
                                    ⭐ {movie.rating}/10
                                </span>
                            )}
                        </div>
                        {movie.genres && (
                            <div
                                className="flex flex-wrap gap-3 mt-6"
                            >
                                {movie.genres
                                    .split(",")
                                    .map(
                                        (
                                            genre: string,
                                            index: number
                                        ) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-['Quicksand'] text-white/80"
                                            >
                                                {genre.trim()}
                                            </span>
                                        )
                                    )}
                            </div>
                        )}
                        <div className="mt-8">
                            <h2
                                className="font-['Bebas_Neue'] text-2xl tracking-wide mb-3"
                            >
                                Overview
                            </h2>
                            <p
                                className="text-white/75 leading-8  font-['Quicksand'] text-lg"
                            >
                                {movie.overview}
                            </p>
                        </div>
                        <div
                            className="mt-auto pt-8 text-white/40 text-sm font-['Quicksand']"
                        >
                            Powered by PADAM Recommendations
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}