import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ totalPages, currentPage, onPageChange }) {
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = -2; i <= 2; i++) {
      const page = currentPage + i;
      if (page > 0 && page <= totalPages) {
        pages.push(
          <span
            key={page}
            className={`px-2 ${i === 0 ? 'font-bold bg-white text-black rounded-full p-2' : 'opacity-' + (100 - Math.abs(i) * 20)}`}
          >
            {page}
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full text-white"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
      </Button>
      <div className="flex items-center gap-2">
        {renderPageNumbers()}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full text-white"
        onClick={next}
        disabled={currentPage === totalPages}
      >
       
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}