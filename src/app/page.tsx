'use client';//SEMPRE NO TOPO
import { useState, useEffect } from 'react';
import FilterSection from '../components/FilterSection';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Filters = {
  city: string;
  type: string;
  localization: string;
};

type Resource = {
  id: string;
  name: string;
};

function buildApiUrl(filters: Filters): string {
  const { city, type, localization } = filters;

  // Ordem importa! Essa rota precisa vir antes das outras mais genéricas
  if (city && type && localization) {
    return `/resources/${city}/type/${type}/localization/${localization}`;
  }

  if (city && type) {
    return `/resources/${city}/type/${type}`;
  }

  if (city && localization) {
    return `/resources/${city}/localization/${localization}`;
  }

  if (city) {
    return `/resources/city/${city}`;
  }

  if (type) {
    return `/resources/type/${type}`;
  }

  if (localization) {
    return `/resources/localization/${localization}`;
  }

  return `/resources`;
}


export default function Home() {

  const [ filters, setFilters] = useState<Filters>({
    city:'',
    type:'',
    localization:'',
  });

  const [data, setData] = useState<Resource[]>([]);//resources)
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (updateFilters: Filters) => {
  setFilters(updateFilters);
};

  useEffect(() => {
  const fetchFilteredData = async () => {
    const url = buildApiUrl(filters);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${url}`);
      const json =await res.json();
      setData(json);
    } catch (error) {
      console.error('Erro ao buscar recursos: ', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
    fetchFilteredData();
  }, [filters]);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Filtrar Recursos</h1>

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        cityOptions={[
          { label: 'São Paulo', value: 'sao paulo' }, 
          { label: 'Curitiba', value: 'curitiba' },
          { label: 'Belo Horizonte', value: 'belo horizonte' },
          { label: 'Fortaleza', value: 'fortaleza' } 
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

      <section className="mt-6">
        {(() => {
          if (loading) {
           return <p>Carregando...</p>;
          }

          if (data.length === 0) {
            return <p>Nenhum recurso encontrado.</p>;
          }

          return (
            <ul className="space-y-2">
              {data.map((item) => (
              <li key={item.id} className="border p-2 rounded">
                {item.name}
              </li>
              ))}
            </ul>
          );
        })()}
      </section>

    </main>
  );
  }

/* possível erro  corrigido: 
O navegador está bloqueando o fetch porque o backend (API) não está permitindo requisições vindas do seu frontend.
// Achar um modo de colocar uma senha ou algo parecido no backend para que o frontend possa acessar a API.
// Solução: Habilitar CORS no backend
// No seu backend
import cors from 'cors';
app.use(cors());
*/