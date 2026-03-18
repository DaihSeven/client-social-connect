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
    <section className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
  
  <select
    name="city"
    value={filters.city ?? ''}
    onChange={handleChange}
    className="bg-white text-[#2A2A2A] border border-[#E5E5E5] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
  >
    <option value="">Selecione uma cidade</option>
    {cityOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>

  <select
    name="type"
    value={filters.type ?? ''}
    onChange={handleChange}
    className="bg-white text-[#2A2A2A] border border-[#E5E5E5] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
  >
    <option value="">Selecione um tipo</option>
    {typeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>

  <select
    name="localization"
    value={filters.localization ?? ''}
    onChange={handleChange}
    className="bg-white text-[#2A2A2A] border border-[#E5E5E5] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
  >
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
    className="px-4 py-2 rounded-xl bg-[#E57373] text-white font-medium hover:bg-[#EF9A9A] transition shadow-sm"
  >
    Limpar filtros
  </button>

</section>
  );
}
