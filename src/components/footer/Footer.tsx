export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center text-gray-400">
        <h3 className="text-xl font-semibold mb-2 text-white">
          Mohamed Ismael
        </h3>
        <p className="mb-4">
          Flutter Developer & Software Engineer
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} mohamedismael.dev — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
