'use client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const docsUrl = `${API_BASE_URL}/docs`;

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] text-[#555] text-sm py-6 mt-16">
      
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Ajuda Social -{" "}
          <span className="text-[#E9C46A] font-medium">Conectando</span>. Todos os direitos reservados.
        </p>

        <div className="flex gap-6">
          
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#E9C46A]"
          >
            Documentação da API
          </a>

          <a
            href="https://github.com/DaihSeven/client-social-connect.git"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#E9C46A]"
          >
            Repositório GitHub
          </a>

        </div>

      </div>
    </footer>
  );
}