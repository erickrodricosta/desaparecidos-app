import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center my-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="px-4 py-2 mx-1 text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      <div className="px-4 py-2 mx-1 text-gray-700">
        Página {currentPage + 1} de {totalPages}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        className="px-4 py-2 mx-1 text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
