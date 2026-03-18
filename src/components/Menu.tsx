'use client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const docsUrl = `${API_BASE_URL}/docs`;

export default function Menu() {
  return (
    <header className="bg-white/80 backdrop-blur-md text-[#2A2A2A] py-4 sticky top-0 z-50 border-b border-[#E5E5E5]">
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-tight">
          Ajuda Social - <span className="text-[#E9C46A]">Conectando</span>
        </h1>

        {/* Links */}
        <ul className="flex gap-6 text-sm font-medium items-center">

          <li>
            <a href="#missao" className="transition hover:text-[#E9C46A]">
              Missão
            </a>
          </li>

          <li>
            <a href="#filtros" className="transition hover:text-[#E9C46A]">
              Buscar
            </a>
          </li>

          <li>
            <a href="#destaques" className="transition hover:text-[#E9C46A]">
              Destaques
            </a>
          </li>

          <li>
            <a href="#secoes" className="transition hover:text-[#E9C46A]">
              Seções
            </a>
          </li>

          <li>
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] hover:border-[#E9C46A] hover:text-[#E9C46A] transition"
            >
              Documentação
            </a>
          </li>

        </ul>
      </nav>
    </header>
  );
}