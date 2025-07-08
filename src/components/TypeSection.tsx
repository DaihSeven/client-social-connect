'use client';
import { useState } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const types = [
  'abrigo', 'alimentação', 'jurídico', 'apoio psicológico',
  'apoio para dependentes', 'idosos', 'apoio socioassistencial',
  'orientação', 'mulheres', 'documentação', 'defensoria pública'
];

export default function TypeSection() {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [resourcesByType, setResourcesByType] = useState<Record<string, Resource[]>>({});
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const toggleType = async (type: string) => {
    if (expandedType === type) {
      setExpandedType(null);
      return;
    }

    setExpandedType(type);

    if (!resourcesByType[type]) {
      setLoadingType(type);
      try {
        const res = await fetch(`${API_BASE_URL}/resources/type/${encodeURIComponent(type)}`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error('Resposta inesperada da API:', data);
          setResourcesByType((prev) => ({ ...prev, [type]: [] }));
        } else {
          setResourcesByType((prev) => ({ ...prev, [type]: data }));
        }
      } catch (err) {
        console.error(`Erro ao buscar recursos do tipo ${type}`, err);
        setResourcesByType((prev) => ({ ...prev, [type]: [] }));
      } finally {
        setLoadingType(null);
      }
    }
  };

  return (
    <section className="mb-10 bg-cover bg-center bg-repeat" style={{ backgroundImage: "url('/help.png')"}} >
      <article className="bg-black/60">
      <h2 className="text-lg font-bold mb-2">🧩 Recursos por Tipo</h2>
      <ul className="space-y-2">
        {types.map((type) => (
          <li key={type}>
            <button
              onClick={() => toggleType(type)}
              className="text-left w-full font-semibold text-[#F2D3AC] hover:underline"
            >
              {expandedType === type ? '▼' : '►'} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>

            {expandedType === type && (
              <div className="ml-4 mt-2">
                {loadingType === type ? (
                  <p>Carregando...</p>
                ) : (
                  <ul className="space-y-1">
                    {(Array.isArray(resourcesByType[type]) ? resourcesByType[type] : []).map((res) => (
                      <li key={res.id} className="border p-4 rounded space-y-1 bg-[#FFFF89] text-[#0D0D0D] font-semibold">
                        <p><strong>📍Nome:</strong> {res.name}</p>
                        <p><strong>📌Tipo:</strong> {formatType(res.type)}</p>
                        <p><strong>🏠Endereço:</strong> {res.address}</p>
                        <p><strong>🌆Cidade:</strong> {res.city}</p>
                        <p><strong>🕓Horário:</strong> {res.hours}</p>
                        <p><strong>📞Contato:</strong> {res.contact}</p>
                      </li>
                    ))}
                    {Array.isArray(resourcesByType[type]) && resourcesByType[type].length === 0 && (
                      <p>Nenhum recurso encontrado.</p>
                    )}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      </article>
    </section>
  );
}
