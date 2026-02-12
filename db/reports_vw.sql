-- ============================================
-- VIEW: vw_ventas_por_dia
-- Qué devuelve: Ventas agregadas por día
-- Grain: 1 fila = 1 día
-- Métricas: total_ventas, total_ordenes, ticket_promedio
-- Usa GROUP BY para agregación temporal
-- Usa HAVING para filtrar días sin ventas
-- VERIFY: SELECT * FROM vw_ventas_por_dia ORDER BY fecha DESC;
-- ============================================
CREATE OR REPLACE VIEW vw_ventas_por_dia AS
SELECT
    DATE(created_at) AS fecha,
    COUNT(id) AS total_ordenes,
    SUM(total) AS total_ventas,
    AVG(total) AS ticket_promedio
FROM ordenes
GROUP BY DATE(created_at)
HAVING SUM(total) > 0;


-- ============================================
-- VIEW: vw_ventas_por_categoria
-- Qué devuelve: Ventas y volumen por categoría
-- Grain: 1 fila = 1 categoría
-- Métricas: ingresos, unidades_vendidas
-- Usa CASE para clasificar desempeño
-- VERIFY: SELECT * FROM vw_ventas_por_categoria;
-- ============================================
CREATE OR REPLACE VIEW vw_ventas_por_categoria AS
SELECT
    c.nombre AS categoria,
    SUM(od.subtotal) AS ingresos,
    SUM(od.cantidad) AS unidades_vendidas,
    CASE
        WHEN SUM(od.subtotal) > 2000 THEN 'ALTA'
        WHEN SUM(od.subtotal) > 500 THEN 'MEDIA'
        ELSE 'BAJA'
    END AS nivel_ventas
FROM orden_detalles od
JOIN productos p ON p.id = od.producto_id
JOIN categorias c ON c.id = p.categoria_id
GROUP BY c.nombre
HAVING SUM(od.cantidad) > 0;


-- ============================================
-- VIEW: vw_top_productos
-- Qué devuelve: Ranking de productos por unidades vendidas
-- Grain: 1 fila = 1 producto
-- Métricas: unidades_vendidas, ranking
-- Usa RANK() como Window Function
-- VERIFY: SELECT * FROM vw_top_productos ORDER BY ranking;
-- ============================================
CREATE OR REPLACE VIEW vw_top_productos AS
SELECT
    p.nombre AS producto,
    SUM(od.cantidad) AS unidades_vendidas,
    SUM(od.subtotal) AS ingresos_totales,
    RANK() OVER (ORDER BY SUM(od.cantidad) DESC) AS ranking,
    CASE
        WHEN SUM(od.cantidad) > 100 THEN 'Estrella'
        WHEN SUM(od.cantidad) > 50 THEN 'Alto'
        ELSE 'Regular'
    END AS nivel_producto
FROM orden_detalles od
JOIN productos p ON p.id = od.producto_id
GROUP BY p.nombre
HAVING SUM(od.cantidad) > 0;



-- ============================================
-- VIEW: vw_ticket_promedio_categoria
-- Qué devuelve: Ticket promedio por categoría
-- Grain: 1 fila = 1 categoría
-- Métricas: total_ingresos, total_ordenes, ticket_promedio
-- Usa CTE y COALESCE para evitar NULL
-- VERIFY: SELECT * FROM vw_ticket_promedio_categoria;
-- ============================================
CREATE OR REPLACE VIEW vw_ticket_promedio_categoria AS
WITH base AS (
    SELECT
        c.nombre AS categoria,
        SUM(od.subtotal) AS total_ingresos,
        COUNT(DISTINCT od.orden_id) AS total_ordenes
    FROM orden_detalles od
    JOIN productos p ON p.id = od.producto_id
    JOIN categorias c ON c.id = p.categoria_id
    GROUP BY c.nombre
)
SELECT
    categoria,
    total_ingresos,
    total_ordenes,
    COALESCE(total_ingresos / NULLIF(total_ordenes, 0), 0) AS ticket_promedio
FROM base;


-- ============================================
-- VIEW: vw_ventas_acumuladas
-- Qué devuelve: Ventas diarias con acumulado
-- Grain: 1 fila = 1 día
-- Métricas: total_dia, total_acumulado
-- Usa SUM() OVER para acumulado
-- VERIFY: SELECT * FROM vw_ventas_acumuladas ORDER BY fecha;
-- ============================================
CREATE OR REPLACE VIEW vw_ventas_acumuladas AS
SELECT
    fecha,
    total_ventas AS total_dia,
    SUM(total_ventas) OVER (ORDER BY fecha) AS total_acumulado,
    LAG(total_ventas) OVER (ORDER BY fecha) AS ventas_dia_anterior,
    total_ventas - COALESCE(
        LAG(total_ventas) OVER (ORDER BY fecha), 0
    ) AS variacion_diaria
FROM vw_ventas_por_dia;

