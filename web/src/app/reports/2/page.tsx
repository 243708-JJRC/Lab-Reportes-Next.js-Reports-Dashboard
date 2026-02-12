import { getVentasPorCategoria } from "../../lib/services/reporte2";

export default async function Reporte2() {
  const rows = await getVentasPorCategoria();

  const topCategoria = rows[0];

  return (
    <main className="report-container">
      <h1 className="report-title">Ventas por Categoría</h1>

      <p className="report-description">
        Este reporte muestra el desempeño comercial por categoría,
        clasificando el nivel de ventas según el volumen de ingresos
        generados.
      </p>

      {topCategoria && (
        <div className="kpi-card">
          Categoría líder: {topCategoria.categoria}
          <p>${Number(topCategoria.ingresos).toFixed(2)}</p>
        </div>
      )}

      <table className="report-table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Ingresos</th>
            <th>Unidades Vendidas</th>
            <th>Nivel de Ventas</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.categoria}>
              <td>{r.categoria}</td>
              <td>${Number(r.ingresos).toFixed(2)}</td>
              <td>{r.unidades_vendidas}</td>
              <td>{r.nivel_ventas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
