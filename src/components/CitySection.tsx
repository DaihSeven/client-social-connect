'use client';
import { useState } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const cities = ['Curitiba', 'São Paulo', 'Fortaleza', 'Belo Horizonte'];

export default function CitySection() {
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [resourcesByCity, setResourcesByCity] = useState<Record<string, Resource[]>>({});
  const [loadingCity, setLoadingCity] = useState<string | null>(null);

  const toggleCity = async (city: string) => {
    if (expandedCity === city) {
      setExpandedCity(null);
      return;
    }

    setExpandedCity(city);

    if (!resourcesByCity[city]) {
      setLoadingCity(city);
      try {
        const res = await fetch(`${API_BASE_URL}/resources/city/${encodeURIComponent(city)}`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error('Resposta inesperada da API:', data);
          setResourcesByCity((prev) => ({ ...prev, [city]: [] }));
        } else {
          setResourcesByCity((prev) => ({ ...prev, [city]: data }));
        }
      } catch (err) {
        console.error(`Erro ao buscar recursos da cidade ${city}`, err);
        setResourcesByCity((prev) => ({ ...prev, [city]: [] }));
      } finally {
        setLoadingCity(null);
      }
    }
  };

  return (
    <section className="mb-10 bg-cover bg-center bg-repeat" style={{ backgroundImage: "url('/city.jpg')"}} >
      <article className="bg-black/60">
      <h2 className="text-lg font-bold mb-2">📍 Recursos por Cidade</h2>
      <ul className="space-y-2">
        {cities.map((city) => (
          <li key={city}>
            <button
              onClick={() => toggleCity(city)}
              className="text-left w-full font-semibold text-[#F2D3AC] hover:underline"
            >
              {expandedCity === city ? '▼' : '►'} {city.charAt(0).toUpperCase() + city.slice(1)}
            </button>

            {expandedCity === city && (
              <div className="ml-4 mt-2">
                {loadingCity === city ? (
                  <p>Carregando...</p>
                ) : (
                  <ul className="space-y-1">
                    {(Array.isArray(resourcesByCity[city]) ? resourcesByCity[city] : []).map((res) => (
                      <li key={res.id} className="border p-4 rounded space-y-1 bg-[#FFFF89] text-[#0D0D0D] font-semibold">
                        <p><strong>📍Nome:</strong> {res.name}</p>
                        <p><strong>📌Tipo:</strong> {formatType(res.type)}</p>
                        <p><strong>🏠Endereço:</strong> {res.address}</p>
                        <p><strong>🌆Cidade:</strong> {res.city}</p>
                        <p><strong>🕓Horário:</strong> {res.hours}</p>
                        <p><strong>📞Contato:</strong> {res.contact}</p>
                    </li>
                    ))}
                    {Array.isArray(resourcesByCity[city]) && resourcesByCity[city].length === 0 && (
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
