import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../services/api";
import type { Pessoa } from "../types";
import InfoModal from "../components/InfoModal";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Pessoa>(`/pessoas/${id}`);
        setPessoa(response.data);
      } catch (err) {
        setError("Não foi possível carregar os detalhes. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Carregando detalhes...</div>;
  }

  if (error || !pessoa) {
    return (
      <div className="text-center p-10 text-red-500">
        {error || "Pessoa não encontrada."}
      </div>
    );
  }

  const isLocalizado = !!pessoa.ultimaOcorrencia.dataLocalizacao;
  const statusClass = isLocalizado
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="my-4">
        <Link
          to="/"
          state={location.state}
          className="text-teal-500 hover:text-teal-700"
        >
          &larr; Voltar para a lista
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-64"
              src={
                pessoa.urlFoto || "https://placehold.co/400x600?text=Sem+Foto"
              }
              alt={pessoa.nome}
            />
          </div>
          <div className="p-8">
            <div
              className={`text-sm font-semibold py-1 px-3 rounded-full inline-block ${statusClass}`}
            >
              {isLocalizado ? "LOCALIZADO" : "DESAPARECIDO"}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {pessoa.nome}
            </h1>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>
                <strong>Idade:</strong> {pessoa.idade} anos
              </p>
              <p>
                <strong>Sexo:</strong> {pessoa.sexo}
              </p>
              <p>
                <strong>Data do Desaparecimento:</strong>{" "}
                {new Date(
                  pessoa.ultimaOcorrencia.dtDesaparecimento
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Local:</strong>{" "}
                {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
              </p>
              {/* --- CORREÇÃO APLICADA AQUI --- */}
              <p className="mt-4 pt-4 border-t">
                <strong>Vestimentas:</strong>{" "}
                {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                  ?.vestimentasDesaparecido || "Não informado"}
              </p>
              <p>
                <strong>Outras Informações:</strong>{" "}
                {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao ||
                  "Não informado"}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrar Novas Informações
            </button>
          </div>
        </div>
      </div>

      <InfoModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ocorrenciaId={pessoa.ultimaOcorrencia.ocoId}
      />
    </div>
  );
};

export default DetailsPage;
