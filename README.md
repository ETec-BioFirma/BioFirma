# 📚 Sistema de Registro Biométrico - ETEC

Este proyecto implementa un sistema automático de registro de **ingresos y egresos** de alumnos mediante **lectura de huella digital**, desarrollado por estudiantes de 6° año de la Escuela Técnica de la Universidad de Mendoza (ETEC).

## 🚀 ¿Qué hace el sistema?

- Escanea la huella de cada alumno con el sensor AS608.
- Registra automáticamente la entrada o salida con hora y fecha.
- Muestra un mensaje personalizado en pantalla táctil.
- Guarda los datos en una base de datos local.
- Funciona sin internet (modo offline con sincronización).
- Proporciona una página web interna con estadísticas, reportes y paneles por curso.

## 🧰 Componentes utilizados

- ESP32 Wi-Fi + Bluetooth
- Sensor de huellas AS608
- Pantalla TFT táctil 2.8” a color
- Fuente 5V 2A
- Base de datos local (SQL/MongoDB)
- Sitio web responsive en red local

## 🌐 Funcionalidades del sitio web

- Panel general con gráficos en tiempo real
- Estado actual de alumnos (presentes / retirados)
- Filtros por curso, alumno y fecha
- Exportación de datos (CSV/PDF)
- Acceso exclusivo para preceptores y directivos
- Futuro soporte para integración con GoSchool

## 👥 Equipo de desarrollo

- Facundo Gonzalez  
- Facundo Llamas  
- Iñaki Gongora  

Escuela Técnica de la Universidad de Mendoza – 6° Año Informática

## 📦 Presupuesto estimado

Total: **$65.299 ARS**  
Muchos componentes fueron provistos por la escuela o realizados por los propios alumnos.







# 📄 Documentación Técnica – Sistema Biométrico ETEC

### Proyecto: Registro Biométrico de Ingreso y Egreso  
### Escuela Técnica de la Universidad de Mendoza – 6° Año Informática  
### Equipo: Facundo Gonzalez, Facundo Llamas, Iñaki Gongora

---

## 📦 Estado actual del sistema (actualizado al 23/05/2025)

✅ Infraestructura dockerizada  
✅ Base de datos MariaDB con credenciales seguras  
✅ Node-RED corriendo bajo HTTPS y subruta segura  
✅ Mosquitto MQTT con TLS y autenticación  
✅ Adminer para gestionar la base de datos local  
✅ Caddy como proxy reverso con certificados propios  
✅ Backend Express funcionando detrás del proxy en `/api`  
✅ Frontend Angular en proceso, planeado para servir desde `/`  
✅ Archivo `.env` centralizado para credenciales  
✅ Backend con API REST completa y protegida por token JWT

---

## 🗂️ Estructura de carpetas

```bash
/home/proyecto-biofirma/
├── nodered/              → docker-compose.yml, .env y flujo Node-RED
├── db/                   → Volúmenes de MariaDB
├── mosquitto/            → Configuración MQTT (TLS + auth)
├── caddy/                → Caddyfile + certificados HTTPS
├── backend/              → Backend Express.js con rutas /api
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── app.js
│   ├── db.js
├── reiniciar.sh          → Script para levantar todo
```

---

## ⚙️ Componentes

### 1. 📊 Base de Datos – MariaDB

- Imagen: `mariadb:10.5`
- Ruta de persistencia: `db/data:/var/lib/mysql`
- Accesible mediante Adminer en  
  `https://<IP>/adminer`
- Tablas principales:
  - `cursos`, `divisiones`, `alumnos`
  - `registros` (asistencias)
  - `autoridades` (usuarios)
  - `log_eventos` (eventos del sistema)

---

### 2. 🧠 Node-RED

- Imagen: `nodered/node-red`
- Panel: `https://<IP>/nodered`
- Configurado en modo seguro (`httpAdminRoot`, `httpNodeRoot`)
- Planeado: integrar flujos que escriban en DB directamente desde sensores vía MQTT

---

### 3. 📡 Mosquitto MQTT

- Imagen: `eclipse-mosquitto`
- TLS activado, con certificados en `mosquitto/certs/`
- Seguridad:
  - `allow_anonymous false`
  - Usuarios definidos en `passwd`
- Puerto MQTT: `1883`

---

### 4. 🌐 Caddy (Proxy HTTPS)

- Imagen: `caddy:latest`
- Corre en puerto `:443`
- Certificados: `caddy/certificados`
- Ruteo:
  - `/nodered` → Node-RED
  - `/adminer` → Adminer
  - `/panel`   → Frontend Angular
  - `/api`     → Backend Express

---

### 5. 👨‍💻 Backend Express (API REST)

- Escucha en puerto `3001`, accedido desde proxy en `/api`
- Rutas:
  - Login: `/api/login`
  - Cursos: `/api/cursos`
  - Divisiones: `/api/cursos/:cursoId/divisiones`
  - Alumnos: `/api/cursos/:cursoId/divisiones/:divisionId/alumnos`
  - Historial: `/api/historial`
  - Administración: `/api/admin/usuarios`
  - Logs del sistema: `/api/logs`
- Seguridad:
  - JWT en todas las rutas menos `/api/login`
  - Rol `admin` requerido en `/api/admin/...`

---

### 6. 🧾 Adminer

- Imagen: `adminer`
- Ruta: `https://<IP>/adminer`
- Gestión directa de MariaDB para debugging o consultas rápidas

---

## 🔐 `.env` centralizado

Ubicación: `/home/proyecto-biofirma/nodered/.env`

Contiene credenciales para:
- Base de datos
- MQTT
- Claves del backend (JWT secret)

Ejemplo:

```env
MYSQL_DATABASE=biometrico
MYSQL_USER=biofirma
MYSQL_PASSWORD=...
JWT_SECRET=super_secreto_biofirma
MQTT_USER=admin
MQTT_PASSWORD=...
```

---

## 🔁 Script de reinicio rápido

📄 `/home/proyecto-biofirma/nodered/reiniciar.sh`

Uso:

```bash
./reiniciar.sh
```

Levanta todos los contenedores, muestra logs clave de Mosquitto y Node-RED.

---

## ✅ Verificaciones post-reinicio

- `docker ps` debe listar:
  - `backend`, `nodered`, `mosquitto`, `adminer`, `caddy`, `panel` (más adelante)
- `curl -k https://<IP>/api/login` devuelve token válido
- `curl -k https://<IP>/api/cursos` devuelve datos reales

---

## 🧩 Próximos pasos

- Terminar frontend Angular y compilar para servir desde `/panel`
- Agregar gráficos de presentismo
- Validar horarios contra base de datos desde el ESP
- Automatizar logs desde Node-RED
- Agregar capa extra de seguridad: `basic_auth` o IP allowlist para Adminer y Node-RED
