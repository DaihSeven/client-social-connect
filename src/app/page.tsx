'use client';//SEMPRE NO TOPO
import { useState, useEffect } from 'react';

const URL_API = "https://ajudasocial-api-yxbj.onrender.com/recursos";

export default function Home() {

  const [ loading, setLoading] = useState(false);

  const FetchAllData = async () => {
    try {
      setLoading(true);

      const response = await fetch(URL_API);
      console.log(response);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    FetchAllData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1> Requisição na Ajuda Social API</h1>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Usando método Get</p>
      </footer>
    </div>
  );
}
/* possível erro : 
O navegador está bloqueando o fetch porque o backend (API) não está permitindo requisições vindas do seu frontend.
// Achar um modo de colocar uma senha ou algo parecido no backend para que o frontend possa acessar a API.
// Solução: Habilitar CORS no backend
// No seu backend
import cors from 'cors';
app.use(cors());
*/