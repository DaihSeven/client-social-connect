'use client';
import { useState } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';

type Props = {
  readonly data: Resource[];
  readonly loading: boolean;
};


export default function FilteredResultsSection({ data = [], loading }: Props) {
  const [show, setShow] = useState(false);

console.log('FilteredResultsSection render: data:', data, 'Array.isArray:', Array.isArray(data));


  if (loading) return <p className="mt-6">Carregando...</p>;
  if (data.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-lg font-bold mb-2">🔎 Resultados Filtrados</h2>
      <button
        onClick={() => setShow(!show)}
        aria-expanded={show}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {show ? 'Ocultar' : 'Visualizar'}
      </button>

      {loading && <p>Carregando recursos...</p>}

      {show && (
  <ul className="space-y-2">
    {Array.isArray(data) ? (
      data.length === 0 ? (
        <li>Nenhum resultado.</li>
      ) : (
        data.map(item => (
          <li key={item.id} className="border p-4 rounded space-y-1 bg-white text-black">
            <p><strong>Nome:</strong> {item.name}</p>
            <p><strong>Tipo:</strong> {formatType(item.type)}</p>
            <p><strong>Endereço:</strong> {item.address}</p>
            <p><strong>Cidade:</strong> {item.city}</p>
            <p><strong>Horário:</strong> {item.hours}</p>
            <p><strong>Contato:</strong> {item.contact}</p>
          </li>
        ))
      )
    ) : (
      <li><strong>Erro: dados inválidos para exibir.</strong><br />Tipo recebido: {typeof data}<br />JSON: {JSON.stringify(data)}</li>
    )}
  </ul>
)}

    </section>
  );
}
//A COMUNICAÇÃO ENTRE OS FILTROS E A SEÇÃO DE MOSTRAR OS RESULTADOS ESTÁ ENTENDENDO ERRADO A DIFERENÇA ENTRA ALIMENTAÇÃO E ALIMANTACAO POR EXEMPLO, VERIFICAR NOS TYPES, NO FORMAT, E NOS VALUES ESSA DIFERENÇA 