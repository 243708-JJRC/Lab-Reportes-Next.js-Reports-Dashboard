import { pool } from "../db";

export async function getTicketPromedioCategoria() {
  const { rows } = await pool.query(`
    SELECT 
      categoria,
      total_ingresos,
      total_ordenes,
      ticket_promedio
    FROM vw_ticket_promedio_categoria
    ORDER BY ticket_promedio DESC
  `);

  const kpi =
    rows.length > 0
      ? {
          categoria: rows[0].categoria,
          ticket_promedio: rows[0].ticket_promedio,
        }
      : null;

  return { data: rows, kpi };
}
