'use client';

import { useState, useEffect } from 'react';
import FilterSection from '../components/FilterSection';
import CitySection from '../components/CitySection';
import TypeSection from '../components/TypeSection';
import HighlightedCarousel from '../components/HighlightedCarousel';
import FilteredResultsSection from '../components/FilteredResultsSection';
import MissionSection from '@/components/MissionSection';
import { Resource } from '../types/resource';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Filters = {
  city: string;
  type: string;
  localization: string;
};

function buildApiUrl(filters: Filters): string {
  const { city, type, localization } = filters;

  if (city && type && localization)
    return `/resources/${city}/type/${type}/localization/${localization}`;
  if (city && type)
    return `/resources/${city}/type/${type}`;
  if (city && localization)
    return `/resources/${city}/localization/${localization}`;
  if (city)
    return `/resources/city/${city}`;
  if (type)
    return `/resources/type/${type}`;
  if (localization)
    return `/resources/localization/${localization}`;
  return `/resources`;
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    city: '',
    type: '',
    localization: '',
  });

  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      const url = buildApiUrl(filters);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}${url}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Erro ao buscar recursos:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [filters]);

  return (
    <main className="p-4 space-y-10">
      <section id="missao">
        <MissionSection />
      </section>

      <section id="filtros">
      <h1 className="text-2xl font-bold text-yellow-300 mt-12">🔍 Buscar Recursos</h1>

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        cityOptions={[
          { label: 'São Paulo', value: 'sao paulo' },
          { label: 'Curitiba', value: 'curitiba' },
          { label: 'Belo Horizonte', value: 'belo horizonte' },
          { label: 'Fortaleza', value: 'fortaleza' },
        ]}
        typeOptions={[
          { label: 'Abrigo', value: 'abrigo' },
          { label: 'Alimentação', value: 'alimentacao' },
          { label: 'Juridico', value: 'juridico' },
          { label: 'Apoio psicológico', value: 'apoio psicologico' },
          { label: 'Apoio para dependentes', value: 'apoio para dependentes' },
          { label: 'Idosos', value: 'idosos' },
          { label: 'Apoio socioassistencial', value: 'apoio socioassistencial' },
          { label: 'Orientação', value: 'orientação' },
          { label: 'Mulheres', value: 'mulheres' },
          { label: 'Documentação', value: 'documentacão' },
          { label: 'Defensoria pública', value: 'defensoria publica' },
        ]}
        localizationOptions={[
          { label: 'Centro', value: 'centro' },
          { label: 'Zona Sul', value: 'zona-sul' },
          { label: 'Rua', value: 'rua' },
          { label: 'Av.', value: 'av' },
          { label: 'Vila', value: 'vila' },
        ]}
      />
      <FilteredResultsSection data={data} loading={loading} />
      </section>

      <section id="destaques">
        <HighlightedCarousel />
      </section>

      <section id="secoes">
      <h2 className="text-2xl mt-12 font-bold text-center text-[#444] relative
      after:content-[''] after:block after:mx-auto after:mt-2 after:h-[5px] after:w-74 after:bg-[#444] after:shadow-md after:rounded-full">Ver Recursos por Seções</h2>
      <CitySection />
      <TypeSection />
      </section>
    </main>
  );
}
