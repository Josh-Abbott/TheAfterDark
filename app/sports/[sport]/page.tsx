const ConferenceSports = async ({ params }: { params: { sport: string } }) => {
  return (
    <main className="flex flex-col w-full min-h-[calc(90vh-4rem)] px-4 py-16">
      <h1 className="text-4xl font-bold">
        Pac-12 {params.sport}
      </h1>
      <h2>
        Standings, metrics, tournament race, and projections.
      </h2>

      
    </main>
  );
};

export default ConferenceSports;