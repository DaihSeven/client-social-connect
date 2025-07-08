'use client';
import { useState, useEffect } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';
import { motion } from 'framer-motion';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HighlightedCarousel() {
    const [highlights, setHighlights] = useState<Resource[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() =>{
        const fetchResources = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/resources`);
                const data = await res.json();

                const grouped: Record<string, Resource[]> = data.reduce((accumulator: any, currentItem: Resource) => {
                accumulator[currentItem.city] ||= [];
                accumulator[currentItem.city].push(currentItem);
                return accumulator;
                }, {});


                const randomPerCity = Object.values(grouped).map((group: Resource[]) => {
                    const randomIndex =Math.floor(Math.random() * group.length);
                    return group[randomIndex];
                });

                setHighlights(randomPerCity);
            } catch (error) {
            console.error('Erro ao buscar destaques: ', error);
            }
        };
        fetchResources();
    }, []);

    useEffect(() => {
        if (!autoRotate || highlights.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % highlights.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [autoRotate, highlights.length]);

    if (highlights.length === 0) return <p>Carregando destaques...</p>;

    const current = highlights[currentIndex];

    return (
        <section className="my-6" style={{ background: 'linear-gradient(to bottom, rgba(64, 32, 14, 0.9), rgba(255, 255, 137, 0.5)), rgba(64, 32, 14, 0.9)'
  }}>
      <h2 className="text-lg font-bold mb-2 text-yellow-300 text-center">🌟 Recurso em Destaque</h2>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-[#FFFF89] text-[#0D0D0D] font-semibold p-4 rounded shadow"
      >
        <p><strong>📍Nome:</strong> {current.name}</p>
        <p><strong>📌Tipo:</strong> {formatType(current.type)}</p>
        <p><strong>🏠Endereço:</strong> {current.address}</p>
        <p><strong>🌆Cidade:</strong> {current.city}</p>
        <p><strong>🕓Horário:</strong> {current.hours}</p>
        <p><strong>📞Contato:</strong> {current.contact}</p>
        
      </motion.div>
      <section className="flex justify-center gap-4 mt-4">
        <button onClick={() => {
            setAutoRotate(false);
            setCurrentIndex((prev) => (prev -1 + highlights.length) % highlights.length);
        }}
        className="px-4 py-2 bg-[#F2D3AC] font-semibold text-[#0D0D0D] rounded hover:bg-[#DF9B81] transition">
          ◀️ Anterior
        </button>

        <button onClick={() => {
            setAutoRotate(true);
            setCurrentIndex((prev) => (prev +1) % highlights.length);
        }}
        className="px-4 py-2 bg-[#F2D3AC] font-semibold text-[#0D0D0D] rounded hover:bg-[#DF9B81] transition">
          Próximo ▶️
          </button>
      </section>
    </section>
    );
        
}