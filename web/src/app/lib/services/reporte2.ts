import { pool } from "../db";

export async function getVentasPorCategoria(page: number, limit: number) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT *, count(*) OVER() AS total_count
    FROM vw_ventas_por_categoria
    ORDER BY ingresos DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  const categoriaTop =
    rows.length > 0
      ? {
          categoria: rows[0].categoria,
          ingresos: rows[0].ingresos,
        }
      : null;

  return {
    data: rows,
    totalPages,
    kpi: categoriaTop,
  };
}
