import { pool } from "../db";

export async function getTopProductos(page: number, limit: number) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT producto, unidades_vendidas, ranking,
           COUNT(*) OVER() AS total_count
    FROM vw_top_productos
    ORDER BY ranking
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  return {
    data: rows,
    totalPages,
  };
}
