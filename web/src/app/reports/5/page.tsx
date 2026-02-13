import { getVentasAcumuladas } from "../../lib/services/reporte5";

export default async function Reporte5() {
  const { data, kpi } = await getVentasAcumuladas();

  return (
    <main className="report-container">
      <h1 className="report-title">Ventas Acumuladas</h1>

      <p className="report-description">
        Este reporte muestra la evolución acumulada de las ventas en el tiempo,
        permitiendo visualizar el crecimiento histórico del negocio día a día.
      </p>

      {kpi && (
        <div className="kpi-card">
          Total histórico acumulado:
          <p>${Number(kpi.total_historico).toFixed(2)}</p>
        </div>
      )}

      <table className="report-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total Día</th>
            <th>Total Acumulado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.fecha.toString()}>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>${Number(r.total_dia).toFixed(2)}</td>
              <td>${Number(r.total_acumulado).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
