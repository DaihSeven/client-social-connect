'use client';
import { useState, useEffect } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AllResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/resources`);
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error('Erro ao buscar recursos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <section className="mb-10 mt-8">
      <h2 className="text-lg font-bold mb-2">📋 Todos os Recursos</h2>

      <button
        onClick={() => setShow(!show)}
        aria-expanded={show}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {show ? 'Ocultar Recursos' : 'Visualizar Recursos'}
      </button>

      {loading && <p>Carregando recursos...</p>}

      {show && (
        <ul className="space-y-2">
          {resources.map((res) => (
            <li key={res.id} className="border p-4 rounded bg-white text-black">
              <p><strong>Nome:</strong> {res.name}</p>
              <p><strong>Tipo:</strong> {formatType(res.type)}</p>
              <p><strong>Endereço:</strong> {res.address}</p>
              <p><strong>Cidade:</strong> {res.city}</p>
              <p><strong>Horário:</strong> {res.hours}</p>
              <p><strong>Contato:</strong> {res.contact}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
