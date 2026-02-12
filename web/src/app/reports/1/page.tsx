import { getVentasPorDia } from "../../lib/services/reporte1";

export default async function Reporte1() {
  const rows = await getVentasPorDia();

  const totalVentas = rows.reduce(
    (acc, r) => acc + Number(r.total_ventas),
    0
  );

  return (
    <main className="report-container">
      <h1 className="report-title">Ventas por día</h1>

      <p className="report-description">
        Este reporte muestra el comportamiento diario de ventas, número de órdenes
        y ticket promedio. Permite identificar tendencias de ingreso y días de mayor rendimiento.
      </p>

      <div className="kpi-card">
        <h3>Total acumulado</h3>
        <p>${totalVentas.toFixed(2)}</p>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Órdenes</th>
            <th>Total</th>
            <th>Ticket promedio</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.fecha.toString()}>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>{r.total_ordenes}</td>
              <td>${Number(r.total_ventas).toFixed(2)}</td>
              <td>${Number(r.ticket_promedio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
