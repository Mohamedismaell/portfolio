export default function FeaturesSection({ features }: any) {
  if (!features) return null;

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-10 text-white">
        Core Features
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature: string, index: number) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition"
          >
            <p className="text-gray-300">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
