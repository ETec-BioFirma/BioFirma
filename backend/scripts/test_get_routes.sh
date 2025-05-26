#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3NDgyNjU4MzgsImV4cCI6MTc0ODI4NzQzOH0.JXVo0w_x4Bt9YHOkGWxn9iSoQhpbJYK2xa6JBek0r1Y"
URL="https://10.54.5.107"

ENDPOINTS=(
  "/api/cursos"
  "/api/cursos/1"
  "/api/cursos/1/alumnos"
  "/api/cursos/1/divisiones"
  "/api/cursos/1/divisiones/1"
  "/api/cursos/1/divisiones/1/alumnos"
  "/api/cursos/1/divisiones/1/alumnos/1"
  "/api/historial"
  "/api/admin/usuarios"
  "/api/logs"
)

echo "🔍 Probando rutas GET con token..."
echo "================================="

for endpoint in "${ENDPOINTS[@]}"; do
  echo -e "\n➡️  GET $endpoint"
  curl -sk -H "Authorization: Bearer $TOKEN" "$URL$endpoint" | jq
done

echo -e "\n✅ Prueba finalizada."
