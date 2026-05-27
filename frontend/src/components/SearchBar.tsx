import axios from "axios";
import { useState } from "react";

interface SearchBarProps {
    movie:string;
    setMovie:React.Dispatch<React.SetStateAction<string>>;
    setRecommendations:React.Dispatch<React.SetStateAction<any[]>>;
}

export default function SearchBar ({setRecommendations,movie,setMovie}:SearchBarProps){
    
    const [mode, setMode] = useState<"content" | "collaborative" | "hybrid">("content");

    const fetchData = async(value:string)=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/recommend?movie=${value}&type=${mode}`)
            setRecommendations(response.data.recommendation)
        } catch (error) {
            console.error(error)
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
                <input
                className="rounded font-['Quicksand'] w-[80%] h-[60px] p-5 border-2 border-black shadow-[3px_4px_0_#000000] bg-[#d7d3ce]"
                placeholder="Enter Movie name to Search..."
                value = {movie}
                onChange={(e) => setMovie(e.target.value)}
                />
                <button 
                className="rounded font-['Quicksand'] h-[60px] w-[20%] mx-1 py-2 border-2 border-black shadow-[3px_4px_0_#000000] bg-[#ebe1b9] hover:bg-zinc-400 font-black cursor-pointer"
                onClick={()=> handleChange(movie)}
                >Search</button>
            </div>

            

            <div className="flex gap-3 mb-5 mt-6">
                <button
                    onClick={() => setMode("content")}
                    className={`px-5 py-2 rounded border-2 border-black shadow-[3px_4px_0_#000000] font-['Quicksand'] font-bold transition-all duration-200 cursor-pointer
                        ${
                            mode === "content"
                            ? "bg-[#ebe1b9]"
                            : "bg-zinc-300 hover:bg-zinc-400"
                        }
                    `}
                >
                    Content
                </button>

                <button
                    onClick={() => setMode("collaborative")}
                    className={`px-5 py-2 rounded border-2 border-black shadow-[3px_4px_0_#000000] font-['Quicksand'] font-bold transition-all duration-200 cursor-pointer
                        ${
                            mode === "collaborative"
                            ? "bg-[#ebe1b9]"
                            : "bg-zinc-300 hover:bg-zinc-400"
                        }
                    `}
                >
                    Collaborative
                </button>
{/* 
                <button
                    onClick={() => setMode("hybrid")}
                    className={`px-5 py-2 rounded border-2 border-black shadow-[3px_4px_0_#000000] font-['Quicksand'] font-bold transition-all duration-200 cursor-pointer
                        ${
                            mode === "hybrid"
                            ? "bg-[#ebe1b9]"
                            : "bg-zinc-300 hover:bg-zinc-400"
                        }
                    `}
                >
                    Hybrid
                </button> */}

            </div>
    </div>
    )
}