'use client';
import { useState, useEffect } from 'react';
import { Resource } from '../types/resource';
import { formatType } from '../utils/formatType';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

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

                const grouped: Record<string, Resource[]> = data.reduce((accumulator: Record<string, Resource[]>, currentItem: Resource) => {
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

    if (highlights.length === 0) return (<LoadingSpinner text="Buscando recursos em destaque..." />
  );

    const current = highlights[currentIndex];

    return (
        <section className="my-6 mt-8  bg-gradient-ajuda">
        <h2 className="text-2xl font-bold mb-2 text-yellow-300 text-center">🌟 Recurso em Destaque</h2>

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
        className="px-4 py-2  bg-[#40200E] font-semibold text-[#F2D3AC] rounded hover:bg-[#0D0D0D] transition">
          ◀️ Anterior
        </button>

        <button onClick={() => {
            setAutoRotate(true);
            setCurrentIndex((prev) => (prev +1) % highlights.length);
        }}
        className="px-4 py-2 bg-[#40200E] font-semibold text-[#F2D3AC] rounded hover:bg-[#0D0D0D] transition">
          Próximo ▶️
          </button>
      </section>
    </section>
    );
        
}