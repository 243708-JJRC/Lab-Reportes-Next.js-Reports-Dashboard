import { pool } from "../db";

export async function getVentasAcumuladas() {
  const { rows } = await pool.query(`
    SELECT 
      fecha,
      total_dia,
      total_acumulado
    FROM vw_ventas_acumuladas
    ORDER BY fecha
  `);

  const kpi =
    rows.length > 0
      ? {
          total_historico: rows[rows.length - 1].total_acumulado,
        }
      : null;

  return {
    data: rows,
    kpi,
  };
}
