// components/Footer.tsx
'use client';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const docsUrl = `${API_BASE_URL}/docs`;

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-[#EAEAEA] text-sm py-6 mt-10 rounded-2xl shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Ajuda Social - Conectando. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href={docsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            Documentação da API
          </a>
          <a href="https://github.com/DaihSeven/client-social-connect.git" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Repositório GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
