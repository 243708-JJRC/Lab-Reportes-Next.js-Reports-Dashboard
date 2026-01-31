-- Órdenes por fecha (usado en vw_ventas_por_dia y vw_ventas_acumuladas)
CREATE INDEX idx_ordenes_created_at
ON ordenes (created_at);

-- Detalle de órdenes por producto (JOIN + agregaciones)
CREATE INDEX idx_orden_detalles_producto_id
ON orden_detalles (producto_id);

-- Productos por categoría (JOIN en vistas por categoría)
CREATE INDEX idx_productos_categoria_id
ON productos (categoria_id);