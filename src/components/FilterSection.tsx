import { ChangeEvent } from 'react';

type FilterOption = {
  label: string;
  value: string;
};

type Filters = {
  city: string;
  type: string;
  localization: string;
};

type FilterSectionProps = {
  readonly cityOptions: FilterOption[];
  readonly typeOptions: FilterOption[];
  readonly localizationOptions: FilterOption[];
  readonly filters: Filters;
  readonly onFilterChange: (updateFilters: Filters) => void;
};

export default function FilterSection({
  cityOptions,
  typeOptions,
  localizationOptions,
  filters,
  onFilterChange,
}: FilterSectionProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name as keyof Filters]: value,
    });
  };

  const handleReset = () => {
  onFilterChange({
    city: '',
    type: '',
    localization: '',
  });
};

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center">
      <select name="city" title="Filtro por cidade" value={filters.city ?? ''} onChange={handleChange} className="bg-[#0D0D0D] text-[#EBE03F] border rounded px-3 py-2">
        <option value="">Selecione uma cidade</option>
        {cityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select name="type" title="Filtro por tipo" value={filters.type ?? ''} onChange={handleChange} className="bg-[#0D0D0D] text-[#EBE03F] border rounded px-3 py-2">
        <option value="">Selecione um tipo</option>
        {typeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select name="localization" title="Filtro por localização" value={filters.localization ?? ''} onChange={handleChange} className="bg-[#0D0D0D] text-[#EBE03F] border rounded px-3 py-2">
        <option value="">Todas as localizações</option>
        {localizationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleReset}
        className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-100 transition"
      >
        Limpar filtros
      </button>
    </section>
  );
}
