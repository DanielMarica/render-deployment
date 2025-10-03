export default function Welcome() {
  return (
    <div className="welcome-page min-h-screen bg-cream flex items-center justify-center text-center">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-5xl font-bold text-black mb-6">
          Welcome to <span style={{ color: '#F97C7C' }}>Expenso</span>
        </h1>
        <p className="text-xl text-black mb-4">
          Track and manage your shared expenses with Alice and Bob.
        </p>
        <p className="text-lg text-black">
          Use the navigation bar above to view your expenses or add a new one.
        </p>
      </div>
    </div>
  );
}
