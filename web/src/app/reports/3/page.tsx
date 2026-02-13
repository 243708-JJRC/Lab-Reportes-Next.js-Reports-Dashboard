import { paginationSchema } from "../../lib/validators";
import { getTopProductos } from "../../lib/services/reporte3";
import { PaginationControls } from "../../lib/components/pagination";

export default async function Reporte3({ searchParams }: any) {
   
  const params = await searchParams;

  const validation = paginationSchema.safeParse({
    page: params.page ?? 1,
    limit: searchParams.limit ?? 5,
  });

  if (!validation.success) {
    return <div>Parámetros inválidos</div>;
  }

  const { page, limit } = validation.data;

  const { data, totalPages } = await getTopProductos(page, limit);

  return (
    <main className="report-container">
      <h1 className="report-title">Top productos más vendidos</h1>

      <p className="report-description">
        Este reporte muestra el ranking de los productos con mayor volumen
        de ventas.
      </p>

      <table className="report-table">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Producto</th>
            <th>Unidades</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.producto}>
              <td>{r.ranking}</td>
              <td>{r.producto}</td>
              <td>{r.unidades_vendidas}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls page={page} totalPages={totalPages} />
    </main>
  );
}
