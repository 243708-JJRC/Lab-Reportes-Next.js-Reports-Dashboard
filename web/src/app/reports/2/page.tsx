import { pool } from "../../lib/db";

export default async function Reporte2() {
  const { rows } = await pool.query(
    "SELECT * FROM vw_ventas_por_categoria ORDER BY ingresos DESC"
  );

  return (
    <main>
      <h1>Ventas por categoría</h1>

      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Ingresos</th>
            <th>Unidades</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.categoria}>
              <td>{r.categoria}</td>
              <td>${r.ingresos}</td>
              <td>{r.unidades_vendidas}</td>
              <td>{r.nivel_ventas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
