import React from "react";
import { Link } from "react-router-dom";
import type { Pessoa } from "../types";
import type { FilterState } from "./AdvancedFilters";

interface CardPessoaProps {
  pessoa: Pessoa;
  currentPage: number;
  currentFilters: FilterState;
}

const CardPessoa: React.FC<CardPessoaProps> = ({
  pessoa,
  currentPage,
  currentFilters,
}) => {
  const isLocalizado = !!pessoa.ultimaOcorrencia.dataLocalizacao;
  const statusText = isLocalizado ? "LOCALIZADO" : "DESAPARECIDO";
  const statusClass = isLocalizado
    ? "bg-green-500 text-white"
    : "bg-red-500 text-white";

  return (
    <Link
      to={`/pessoa/${pessoa.id}`}
      state={{ page: currentPage, filters: currentFilters }}
      className="block overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out group"
    >
      <div className="relative">
        <img
          className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          src={pessoa.urlFoto || "https://placehold.co/400x600?text=Sem+Foto"}
          alt={pessoa.nome}
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${statusClass}`}
        >
          {statusText}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {pessoa.nome}
        </h3>
        <p className="text-sm text-gray-600">Idade: {pessoa.idade} anos</p>
      </div>
    </Link>
  );
};

export default CardPessoa;
