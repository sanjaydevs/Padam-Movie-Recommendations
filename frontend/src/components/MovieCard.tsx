import type { Movie } from "../types/movie";

interface MovieCardProps {
    movieDetail: Movie;
    featured?: boolean;
}

export default function MovieCard({
    movieDetail,
    featured = false
}: MovieCardProps) {

    // FEATURED MOVIES
    if (featured) {
        return (
            <div
                className="rounded overflow-hidden bg-[#ECE9E4] flex flex-col hover:-translate-y-1 transition-all  duration-200"
            >
                {movieDetail.poster && (
                    <img
                        src={movieDetail.poster}
                        className="
                            w-full
                            h-[170px]
                            object-cover
                            object-top
                            border-b-2
                            border-zinc-900
                        "
                    />
                )}

                <div className="p-4 flex flex-col flex-grow">

                    <h3
                        className="
                            font-['Bebas_Neue']
                            text-2xl
                            uppercase
                            leading-none
                        "
                    >
                        {movieDetail.title}
                    </h3>
                    {movieDetail.rating && (
                        <div className="mt-4">
                            <span
                                className="
                                rounded
                                    border-2
                                    border-zinc-900
                                    px-1
                                    py-1
                                    text-sm
                                    font-semibold
                                "
                            >
                                ⭐ {movieDetail.rating.toFixed(1)} / 10
                            </span>
                        </div>
                    )}
                    <p
                        className="font-['Orbitron']
                            mt-4
                            text-xs
                            leading-relaxed
                            line-clamp-3
                        "
                    >
                        {movieDetail.overview}
                    </p>
                </div>
            </div>
        );
    }

    // RECOMMENDATION MOVIES
    return (
        <div
            className="rounded w-[420px] h-[220px] border border-zinc-700 bg-[#0f1723] overflow-hidden flex hover:border-zinc-400 transition-all duration-200"
        >
            {/* Poster */}
            <div className="w-[140px] flex-shrink-0">
                {movieDetail.poster && (
                    <img
                        src={movieDetail.poster}
                        className=" w-full h-full object-cover object-top"
                    />
                )}
            </div>

            {/* Details */}
            <div className="flex-1 p-4 text-white">

                {/* Title */}
                <h3 className="font-['Bebas_Neue'] text-2xl uppercase leading-none">
                    {movieDetail.title}
                </h3>

                {/* Meta */}
                <div
                    className="mt-1 flex items-center gap-3 text-xs uppercase tracking-wider text-zinc-400"
                >
                    <span>
                        {movieDetail.release_date?.slice(0, 4)}
                    </span>
                    {/* Watch Time */}
                </div>

                {/* Rating Badge */}
                {movieDetail.rating && (
                    <div className="mt-2">
                        <span
                            className="border border-blue-500 px-2 py-1 text-xs text-blue-300 font-semibold"
                        >
                            ⭐ {movieDetail.rating.toFixed(1)} / 10
                        </span>
                    </div>
                )}

                {/* Overview */}
                <p
                    className="font-['Orbitron'] mt-2 text-sm leading-relaxed text-zinc-300 line-clamp-4"
                >
                    {movieDetail.overview}
                </p>
            </div>
        </div>
    );
}