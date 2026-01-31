import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>SQL Reports Dashboard</h1>
      <ul>
        <li><Link href="/reports/1">Ventas por día</Link></li>
        <li><Link href="/reports/2">Ventas por categoría</Link></li>
        <li><Link href="/reports/3">Top productos</Link></li>
        <li><Link href="/reports/4">Ticket promedio por categoría</Link></li>
        <li><Link href="/reports/5">Ventas acumuladas</Link></li>
      </ul>
    </main>
  );
}
