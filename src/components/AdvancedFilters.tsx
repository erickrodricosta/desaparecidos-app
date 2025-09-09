import React, { useState, useEffect } from "react";
import Slider from "rc-slider";

export interface FilterState {
  nome: string;
  faixaIdadeInicial: string;
  faixaIdadeFinal: string;
  sexo: string;
  status: string;
}

interface AdvancedFiltersProps {
  onSearch: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onSearch,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      nome: "",
      faixaIdadeInicial: "0",
      faixaIdadeFinal: "100",
      sexo: "",
      status: "",
    }
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number | number[]) => {
    const [min, max] = value as number[];
    setFilters((prev) => ({
      ...prev,
      faixaIdadeInicial: String(min),
      faixaIdadeFinal: String(max),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="md:col-span-2">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome da Pessoa
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={filters.nome}
            onChange={handleChange}
            placeholder="Buscar por nome..."
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Faixa Etária: {filters.faixaIdadeInicial} -{" "}
            {filters.faixaIdadeFinal} anos
          </label>
          <div className="px-2 pt-2">
            <Slider
              range
              min={0}
              max={100}
              value={[
                Number(filters.faixaIdadeInicial),
                Number(filters.faixaIdadeFinal),
              ]}
              onChange={handleSliderChange}
              step={1}
              styles={{
                track: { backgroundColor: "#14b8a6" },
                handle: { borderColor: "#14b8a6", backgroundColor: "#14b8a6" },
              }}
            />
          </div>
        </div>

        {/* Sexo */}
        <div>
          <label
            htmlFor="sexo"
            className="block text-sm font-medium text-gray-700"
          >
            Sexo
          </label>
          <select
            name="sexo"
            id="sexo"
            value={filters.sexo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Todos</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            value={filters.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Todos</option>
            <option value="DESAPARECIDO">Desaparecido</option>
            <option value="LOCALIZADO">Localizado</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Aplicar Filtros
        </button>
      </div>
    </form>
  );
};

export default AdvancedFilters;
