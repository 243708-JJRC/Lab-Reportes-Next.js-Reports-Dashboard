import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export function PaginationControls({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="pagination">

      <Link
        href={`?page=${prevPage}`}
        className={`page-btn ${page <= 1 ? "disabled" : ""}`}
      >
        Anterior
      </Link>

      <span className="page-info">
        Página {page} de {totalPages}
      </span>

      <Link
        href={`?page=${nextPage}`}
        className={`page-btn ${page >= totalPages ? "disabled" : ""}`}
      >
        Siguiente
      </Link>

    </div>
  );
}
