'use client';
import { useState } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';
import LoadingSpinner from '@/components/LoadingSpinner';

type Props = {
  readonly data: Resource[];//usa resources/
  readonly loading: boolean;
};


export default function FilteredResultsSection({ data = [], loading }: Props) {
  const [show, setShow] = useState(false);

console.log('FilteredResultsSection render: data:', data, 'Array.isArray:', Array.isArray(data));


  if (loading) return (<LoadingSpinner text="Buscando resultados..." />);
  if (data.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold mb-2 text-[#40200E]" >🔎 Resultados Filtrados</h2>
      <button
        onClick={() => setShow(!show)}
        aria-expanded={show}
        className="mb-4 px-4 py-2 bg-[#40200E] font-semibold text-[#F2D3AC] rounded hover:bg-[#0D0D0D] transition"
      >
        {show ? 'Ocultar' : 'Visualizar'}
      </button>

      {loading && <LoadingSpinner text="Buscando recursos..." />}

      {show && (
        <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {Array.isArray(data) ? (
          data.length === 0 ? (
          <li className="text-yellow-200">Nenhum resultado encontrado.</li>
          ) : (
          data.map(item => (
          <li
            key={item.id}
            className="bg-[#FFFF89] text-[#0D0D0D] font-bold p-4 rounded-xl shadow-md border border-yellow-700 hover:scale-[1.02] transition-transform duration-200"
          >
          <p><strong>📍 Nome:</strong> {item.name}</p>
          <p><strong>📌 Tipo:</strong> {formatType(item.type)}</p>
          <p><strong>🏠 Endereço:</strong> {item.address}</p>
          <p><strong>🌆 Cidade:</strong> {item.city}</p>
          <p><strong>🕓 Horário:</strong> {item.hours}</p>
          <p><strong>📞 Contato:</strong> {item.contact}</p>
        </li>
      ))
    )
  ) : (
    <li className="text-red-600 bg-white p-2 rounded shadow border">
      <strong>Erro:</strong> dados inválidos para exibir.<br />
      Tipo recebido: {typeof data}<br />
      JSON: {JSON.stringify(data)}
    </li>
  )}
</ul>

)}

    </section>
  );
}
