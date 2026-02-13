import { singleDateSchema } from "../../lib/validators";
import { getVentasPorDia } from "../../lib/services/reporte1";

export default async function Reporte1({ searchParams }: any) {

  const sParams = await searchParams;

  const validation = singleDateSchema.safeParse({
    date: sParams.date,
  });

  if (!sParams.date) {
    return (
      <main className="report-container">
        <h1 className="report-title">Ventas por día</h1>

        <p className="report-description">
          Selecciona una fecha para consultar las ventas registradas.
        </p>

        <form method="GET" className="filter-form">
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" name="date" required />
          </div>

          <button type="submit" className="filter-btn">
            Consultar
          </button>
        </form>
      </main>
    );
  }

  if (!validation.success) {
    return (
      <main className="report-container">
        <h1 className="report-title">Ventas por día</h1>
        <p>Fecha inválida.</p>
      </main>
    );
  }

  const { date } = validation.data;

  const { data, kpi } = await getVentasPorDia(date);

  return (
    <main className="report-container">
      <h1 className="report-title">Ventas por día</h1>

      <p className="report-description">
        Este reporte muestra el total de órdenes, ventas y ticket promedio
        para la fecha seleccionada.
      </p>

      <form method="GET" className="filter-form">
        <div className="form-group">
          <label>Fecha</label>
          <input type="date" name="date" defaultValue={date} required />
        </div>

        <button type="submit" className="filter-btn">
          Consultar
        </button>
      </form>

      <div className="kpi-card">
        Total vendido ese día
        <p>${Number(kpi).toFixed(2)}</p>
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
          {data.map((r) => (
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
