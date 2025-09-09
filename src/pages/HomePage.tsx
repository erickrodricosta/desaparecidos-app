import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importe useLocation
import api from "../services/api";
import type { Pessoa, ApiResponse } from "../types";
import CardPessoa from "../components/CardPessoa";
import Pagination from "../components/Pagination";
import AdvancedFilters, {
  type FilterState,
} from "../components/AdvancedFilters";

const HomePage: React.FC = () => {
  const location = useLocation(); // Hook para acessar o estado da navegação
  const previousState = location.state as {
    page: number;
    filters: FilterState;
  } | null;

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializa o estado com os valores da navegação, se existirem
  const [page, setPage] = useState(previousState?.page || 0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FilterState>(
    previousState?.filters || {
      nome: "",
      faixaIdadeInicial: "",
      faixaIdadeFinal: "",
      sexo: "",
      status: "",
    }
  );

  useEffect(() => {
    // ... (o resto da lógica de fetchData continua igual)
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const params: { [key: string]: any } = {
        pagina: page,
        porPagina: 10,
        ...filters,
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === "" || params[key] === null) {
          delete params[key];
        }
      });

      try {
        const response = await api.get<ApiResponse>("/pessoas/aberto/filtro", {
          params,
        });
        setPessoas(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Falha ao buscar os dados. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, filters]);

  const handleSearch = (newFilters: FilterState) => {
    setPage(0);
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="text-center my-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Desaparecidos
        </h1>
        <p className="text-gray-500 mt-2">
          Informações da Polícia Judiciária Civil de Mato Grosso
        </p>
      </header>

      {/* Passamos o estado inicial para os filtros para que ele preencha os campos */}
      <AdvancedFilters onSearch={handleSearch} initialFilters={filters} />

      {loading && <p className="text-center text-lg mt-8">Carregando...</p>}
      {error && (
        <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg mt-8">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pessoas.map((pessoa) => (
              // Passamos o estado atual para cada card
              <CardPessoa
                key={pessoa.id}
                pessoa={pessoa}
                currentPage={page}
                currentFilters={filters}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
