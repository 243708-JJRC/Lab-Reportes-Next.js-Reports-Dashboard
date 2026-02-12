import { pool } from "../db";

export interface VentasPorDia {
  fecha: Date;
  total_ordenes: number;
  total_ventas: number;
  ticket_promedio: number;
}

export async function getVentasPorDia(): Promise<VentasPorDia[]> {
  const { rows } = await pool.query(`
    SELECT fecha, total_ordenes, total_ventas, ticket_promedio
    FROM vw_ventas_por_dia
    ORDER BY fecha DESC
  `);

  return rows;
}
