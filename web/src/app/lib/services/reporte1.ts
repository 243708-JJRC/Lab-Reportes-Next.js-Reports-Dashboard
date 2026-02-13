import { pool } from "../db";

export async function getVentasPorDia(date: string) {

  const { rows } = await pool.query(
    `
    SELECT fecha, total_ordenes, total_ventas, ticket_promedio
    FROM vw_ventas_por_dia
    WHERE fecha = $1::date
    `,
    [date]
  );

  const kpi = rows.length > 0
    ? rows[0].total_ventas
    : 0;

  return {
    data: rows,
    kpi
  };
}
