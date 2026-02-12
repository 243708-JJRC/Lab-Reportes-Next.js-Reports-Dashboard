import { pool } from "../db";

export async function getVentasPorCategoria() {
  const { rows } = await pool.query(`
    SELECT 
      categoria,
      ingresos,
      unidades_vendidas,
      nivel_ventas
    FROM vw_ventas_por_categoria
    ORDER BY ingresos DESC
  `);

  return rows;
}
