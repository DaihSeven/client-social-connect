// components/Menu.tsx
'use client';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const docsUrl = `${API_BASE_URL}/docs`;

export default function Menu() {
  return (
    <header className="bg-[#40200E] text-[#FFFF89] py-4 shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Ajuda Social - Conectando</h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li><a href="#missao" className="hover:underline">Missão</a></li>
          <li><a href="#filtros" className="hover:underline">Buscar</a></li>
          <li><a href="#destaques" className="hover:underline">Destaques</a></li>
          <li><a href="#secoes" className="hover:underline">Seções</a></li>
          <li><a href={docsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Documentação</a></li>
        </ul>
      </nav>
    </header>
  );
}
