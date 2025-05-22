#!/bin/bash

echo "🛑 Bajando servicios..."
docker-compose down

echo "🔁 Levantando servicios..."
docker-compose up -d

echo "✅ Contenedores activos:"
docker ps

echo ""
echo "📡 Logs breves de Mosquitto:"
docker logs --tail 10 mosquitto

echo ""
echo "🧠 Logs breves de Node-RED:"
docker logs --tail 10 nodered
