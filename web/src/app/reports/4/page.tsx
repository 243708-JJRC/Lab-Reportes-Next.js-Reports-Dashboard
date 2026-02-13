import { getTicketPromedioCategoria } from "../../lib/services/reporte4";

export default async function Reporte4() {
  const { data, kpi } = await getTicketPromedioCategoria();

  return (
    <main className="report-container">
      <h1 className="report-title">
        Ticket Promedio por Categoría
      </h1>

      <p className="report-description">
        Este reporte permite analizar el valor promedio de compra por categoría,
        identificando qué tipo de productos generan mayor ingreso por orden.
      </p>

      {kpi && (
        <div className="kpi-card">
          Categoría con mayor ticket promedio
          <p>
            {kpi.categoria} — $
            {Number(kpi.ticket_promedio).toFixed(2)}
          </p>
        </div>
      )}

      <table className="report-table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Total Ingresos</th>
            <th>Órdenes</th>
            <th>Ticket Promedio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.categoria}>
              <td>{r.categoria}</td>
              <td>${Number(r.total_ingresos).toFixed(2)}</td>
              <td>{r.total_ordenes}</td>
              <td>${Number(r.ticket_promedio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
