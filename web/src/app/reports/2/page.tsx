import { paginationSchema } from "../../lib/validators";
import { getVentasPorCategoria } from "../../lib/services/reporte2";
import { PaginationControls } from "../../lib/components/pagination";

export default async function Reporte2({ searchParams }: any) {

   const params = await searchParams;

  const validation = paginationSchema.safeParse({
    page: params.page ?? 1,
    limit: searchParams.limit ?? 5,
  });

  if (!validation.success) {
    return <div>Parámetros inválidos</div>;
  }

  const { page, limit } = validation.data;

  const { data, totalPages, kpi } =
    await getVentasPorCategoria(page, limit);

  return (
    <main className="report-container">
      <h1 className="report-title">Ventas por categoría</h1>

      <p className="report-description">
        Este reporte muestra el desempeño comercial por categoría,
        clasificando el nivel de ventas según el volumen de ingresos generados.
      </p>

      {kpi && (
        <div className="kpi-card">
          Categoría líder:
          <p>
            {kpi.categoria}
            <br />
            ${Number(kpi.ingresos).toFixed(2)}
          </p>
        </div>
      )}

      <table className="report-table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Ingresos</th>
            <th>Unidades</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.categoria}>
              <td>{r.categoria}</td>
              <td>${Number(r.ingresos).toFixed(2)}</td>
              <td>{r.unidades_vendidas}</td>
              <td>{r.nivel_ventas}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls page={page} totalPages={totalPages} />
    </main>
  );
}
