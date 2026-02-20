import TodaysGames from "@/components/todays-games";

const Home = async () => {
  return (
    <main className="flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(90vh-4rem)] px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-center text-cyan-300 select-none tracking-widest [text-shadow:0_0_5px_#fff,0_0_10px_#fff,0_0_20px_#22d3ee,0_0_40px_#22d3ee]">
          <span className="animate-neon-the block">
            THE
          </span>
          <span className="animate-neon-after block">
            AFTER DARK
          </span>
        </h1>

        <h2 className="text-xl text-center mt-4">
          A modern fan hub for the rebuilt Pac-12.
        </h2>
      </section>

      {/* Path Selection */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold">Explore Sports</h3>
          </div>

          <div className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold">Browse Teams</h3>
          </div>

          <div className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold">Enter the Big Board</h3>
          </div>

          <div className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold">Fan Polls</h3>
          </div>
        </div>
      </section>

      {/* Today's Games */}
      <TodaysGames />
    </main>
  )
}


export default Home