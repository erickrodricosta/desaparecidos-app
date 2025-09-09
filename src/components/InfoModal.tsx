import React, { useState } from "react";
import Modal from "react-modal";
import api from "../services/api";

interface InfoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ocorrenciaId: number;
}

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onRequestClose,
  ocorrenciaId,
}) => {
  const [informacao, setInformacao] = useState("");
  const [data, setData] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!data || !informacao) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);

    const descricao =
      files && files.length > 0 ? files[0].name : "Nenhuma foto enviada";
    const endpoint = `/ocorrencias/informacoes-desaparecido?informacao=${encodeURIComponent(
      informacao
    )}&descricao=${encodeURIComponent(
      descricao
    )}&data=${data}&ocoId=${ocorrenciaId}`;

    const formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Informação enviada com sucesso!");
      setInformacao("");
      setData("");
      setFiles(null);

      setTimeout(() => {
        onRequestClose();
        setSuccess(null);
      }, 2000);
    } catch (err) {
      setError("Falha ao enviar informação. Tente novamente.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Formulário de Novas Informações"
      className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-auto my-12 relative"
      // ALTERADO AQUI: 'bg-black bg-opacity-50' para 'bg-white bg-opacity-75' (ou outra cor)
      overlayClassName="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center"
      appElement={document.getElementById("root") || undefined}
    >
      <h2 className="text-2xl font-bold mb-4">Registrar Nova Informação</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="data" className="block text-gray-700 font-bold mb-2">
            Data da Visualização
          </label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="informacao"
            className="block text-gray-700 font-bold mb-2"
          >
            Informações Adicionais
          </label>
          <textarea
            id="informacao"
            rows={4}
            value={informacao}
            onChange={(e) => setInformacao(e.target.value)}
            required
            placeholder="Ex: Foi vista em Cuiabá, na rua ABC, utilizando saia rosa."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="anexos"
            className="block text-gray-700 font-bold mb-2"
          >
            Anexar Fotos
          </label>
          <input
            type="file"
            id="anexos"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            className="text-gray-600 mr-4"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          >
            {submitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InfoModal;
