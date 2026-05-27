export default function Header() {
    return (

        <header className="w-[95%] mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
                {/* LEFT SECTION */}
                <div className="flex items-center gap-10">
                    {/* LOGO */}
                    <div className="border-r-3 border-white pr-8">
                        <h1 className="font-['Bebas_Neue'] text-4xl tracking-loose text-white items-center leading-none">
                            PADAM
                        </h1>
                        {/* <h1 className="text-xl font-black leading-none tracking-tight">
                            RECOMMENDATIONS
                        </h1> */}
                    </div>

                    {/* TAGLINE */}
                    <div className="text-sm tracking-[0.2em] uppercase text-white font-semibold leading-relaxed">
                        <p>Find Movies.</p>
                        <p>Watch Better.</p>
                    </div>
                </div>
            </div>
        </header>
    );
}