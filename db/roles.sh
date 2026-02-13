#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" <<-EOSQL

DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_roles WHERE rolname = '${APP_DB_USER}'
   ) THEN
      CREATE ROLE ${APP_DB_USER} LOGIN PASSWORD '${APP_DB_PASSWORD}';
   END IF;
END
\$\$;

GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO ${APP_DB_USER};
GRANT USAGE ON SCHEMA public TO ${APP_DB_USER};

GRANT SELECT ON
    vw_ventas_por_dia,
    vw_ventas_por_categoria,
    vw_top_productos,
    vw_ticket_promedio_categoria,
    vw_ventas_acumuladas
TO ${APP_DB_USER};

EOSQL

echo "Rol creado correctamente."
