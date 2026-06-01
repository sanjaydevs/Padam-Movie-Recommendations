export default function Footer() {
    return (

        <footer className="w-[95%] mx-auto mt-10 mb-4">

            <div className="flex items-center justify-between px-8 py-6">

                {/* LEFT */}
                <div className="border-white border-r-3 pr-8">

                    <h1 className="font-['Bebas_Neue'] text-4xl tracking-loose text-white items-center leading-none">
                        PADAM
                    </h1>

                    <p className="font-['Quicksand'] mt-2 text-xs tracking-wide uppercase text-white">
                        Built by Sanjay
                    </p>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/sanjaydevs/Padam---Movie-Recommendations"
                        target="_blank"
                        className="border border-white p-3 hover:bg-black hover:text-white transition"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.547 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
                                clipRule="evenodd"
                            />
                        </svg>

                    </a>

                    <a
                        href="https://www.linkedin.com/in/sanjay-s-74551a2ba/"
                        target="_blank"
                        className="border border-white p-3 hover:bg-black hover:text-white transition"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path
                                d="M4.98 3.5C4.98 4.604 4.104 5.5 3 5.5S1.02 4.604 1.02 3.5 1.896 1.5 3 1.5s1.98.896 1.98 2ZM1.5 8h3V22h-3V8Zm7.5 0h2.878v1.91h.041C12.32 8.91 13.667 8 15.611 8 19.5 8 20 10.554 20 13.845V22h-3v-7.154c0-1.707-.03-3.904-2.378-3.904-2.378 0-2.744 1.857-2.744 3.78V22h-3V8Z"
                            />
                        </svg>

                    </a>
                    </div>
                    <p className="mt-4 text-xs tracking-wide uppercase text-white">
                        © 2026 Padam Recommendations
                    </p>
                </div>

            </div>

        </footer>
    );
}