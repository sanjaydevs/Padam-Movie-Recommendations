import axios from "axios";
import { useState } from "react";

interface SearchBarProps {
    movie:string;
    setMovie:React.Dispatch<React.SetStateAction<string>>;
    setRecommendations:React.Dispatch<React.SetStateAction<any[]>>;
}

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

export default function SearchBar ({setRecommendations,movie,setMovie}:SearchBarProps){
    
    const [mode, setMode] = useState<"content" | "collaborative" | "hybrid">("content");
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState('');

    const fetchData = async(value:string)=>{
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/recommend?movie=${value}&type=${mode}`)
            setRecommendations(response.data.recommendation)
            setMessage(
                response.data.message ?? ""
            );
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (value:string) => {
            setMovie(value);
            if (value === "") {
                setRecommendations([]);
            } else {
                fetchData(value);
            }
    };

    return (
        
        <div className="mx-auto h-[100px]">
            <div className="flex items-center gap-3">
                {message && (
                    <div className="mt-3">
                        <p className="font-['Quicksand'] text-amber-200 text-sm">
                            {message}
                        </p>

                        {mode === "collaborative" && (
                            <button
                                onClick={async () => {
                                    setMessage("");
                                    setMode("content");
                                    setLoading(true);
                                    try {
                                        const response = await axios.get(
                                            `${API_URL}/recommend?movie=${movie}&type=content`
                                        );
                                        setRecommendations(
                                            response.data.recommendation
                                        );
                                        setMessage(
                                            response.data.message ?? ""
                                        );
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                className="mt-2 text-sm underline text-[#e8ddb5] cursor-pointer"
                            >
                                Try Content Engine
                            </button>
                        )}
                    </div>
                )}
                <input
                className="rounded font-['Quicksand'] w-[80%] h-[60px] p-5 border-2 border-black shadow-[3px_4px_0_#000000] bg-[#d7d3ce]"
                placeholder="Enter Movie name to Search..."
                value = {movie}
                onChange={(e) => setMovie(e.target.value)}
                />
                <button className="rounded font-['Quicksand'] h-[60px] w-[20%] mx-1 py-2 border-2 border-black shadow-[3px_4px_0_#000000] bg-[#ebe1b9] hover:bg-zinc-400 font-black cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    disabled={loading}
                    onClick={() => handleChange(movie)}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Loading
                        </>
                    ) : (
                        "Search"
                    )}
                </button>
            </div>
            <div className="mt-6">
                <p className="text-white/70 text-sm mb-3 tracking-widest uppercase font-['Quicksand']">
                    Recommendation Mode
                </p>
                <div className="flex gap-3 flex-wrap">
                    <div className="relative group">
                        <button
                            onClick={() => setMode("content")}
                            className={`px-5 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 font-['Quicksand'] text-sm font-semibold cursor-pointer
                                ${mode === "content"? `bg-[#e8ddb5] text-black shadow-[0_0_20px_rgba(232,221,181,0.35)]`
                                    : `bg-white/5 text-white/70 hover:bg-white/10`}`}
                        >
                            Content-Based
                        </button>
                        <div
                            className="absolute left-1/2 -translate-x-1/2 top-[120%] w-[240px] p-3 rounded-xl bg-black/90 border border-white/10 text-white/70 text-xs leading-5 font-['Quicksand'] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 backdrop-blur-lg"
                        >
                            Recommends movies based on
                            genres, themes, keywords,
                            cast, and story similarity.
                        </div>
                    </div>
                    <div className="relative group">
                        <button
                            onClick={() => setMode("collaborative")}
                            className={`px-5 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 font-['Quicksand'] text-sm font-semibold cursor-pointer
                                ${
                                    mode === "collaborative"
                                    ? `
                                        bg-[#e8ddb5]
                                        text-black
                                        shadow-[0_0_20px_rgba(232,221,181,0.35)]
                                    `
                                    : `
                                        bg-white/5
                                        text-white/70
                                        hover:bg-white/10
                                    `
                                }
                            `}
                        >
                            Collaborative
                        </button>
                        <div
                            className="
                                absolute left-1/2 -translate-x-1/2 top-[120%] w-[240px] p-3 rounded-xl bg-black/90 border border-white/10 text-white/70 text-xs leading-5 font-['Quicksand']  opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 backdrop-blur-lg"
                        >
                            Finds movies liked by users
                            who enjoyed similar films.
                            Based on crowd behavior.
                        </div>

                    </div>


                    {/* HYBRID BUTTON */}

                    {/* <div className="relative group">

                        <button
                            onClick={() => setMode("hybrid")}
                            className={`
                                px-5 py-2 rounded-full
                                border border-white/20
                                backdrop-blur-md
                                transition-all duration-300
                                font-['Quicksand']
                                text-sm font-semibold
                                cursor-pointer

                                ${
                                    mode === "hybrid"
                                    ? `
                                        bg-[#e8ddb5]
                                        text-black
                                        shadow-[0_0_20px_rgba(232,221,181,0.35)]
                                    `
                                    : `
                                        bg-white/5
                                        text-white/70
                                        hover:bg-white/10
                                    `
                                }
                            `}
                        >
                            Hybrid AI
                        </button>

                        <div
                            className="
                                absolute left-1/2 -translate-x-1/2
                                top-[120%]
                                w-[240px]
                                p-3 rounded-xl
                                bg-black/90
                                border border-white/10
                                text-white/70
                                text-xs leading-5
                                font-['Quicksand']
                                opacity-0
                                group-hover:opacity-100
                                pointer-events-none
                                transition-all duration-300
                                z-50
                                backdrop-blur-lg
                            "
                        >
                            Combines content similarity
                            and collaborative filtering
                            for balanced recommendations.
                        </div>
                    </div> */}
                </div>
            </div>
    </div>
    )
}