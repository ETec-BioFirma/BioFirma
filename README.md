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

## 📦 Estado actual del sistema (actualizado al 22/05/2025)

✅ Infraestructura dockerizada  
✅ Base de datos MariaDB con credenciales seguras  
✅ Node-RED corriendo bajo HTTPS y subruta segura  
✅ Mosquitto MQTT con TLS y autenticación  
✅ Adminer para gestionar la base de datos local  
✅ Caddy como proxy reverso con certificados propios  
✅ Archivo `.env` centralizado para credenciales

---

## 🗂️ Estructura de carpetas

```bash
/home/proyecto-biofirma/
├── nodered/              → Contiene docker-compose.yml, .env y flujo Node-RED
├── db/                   → Carpeta de volúmenes de MariaDB
├── mosquitto/            → Configuración y volúmenes de MQTT
│   ├── config/           → mosquitto.conf, passwd y certificados
│   ├── data/             → Persistencia
│   └── log/              → Logs
├── caddy/                → Caddyfile + certificados HTTPS
└── reiniciar.sh          → Script para reiniciar toda la infraestructura
```

---

## ⚙️ Componentes del sistema

### 1. 📊 Base de Datos – MariaDB

- Imagen: `mariadb:10.5`
- Usuario: `${MYSQL_USER}`
- Contraseña: `${MYSQL_PASSWORD}`
- Base de datos: `${MYSQL_DATABASE}`
- Ruta de persistencia: `../../db/data:/var/lib/mysql`

Se gestiona desde Adminer en:  
`https://<IP-DEL-SERVIDOR>/adminer`

---

### 2. 🧠 Node-RED

- Imagen: `nodered/node-red`
- Corre bajo `/nodered` gracias a la variable `httpAdminRoot` y `httpNodeRoot` en `settings.js`
- Panel accesible por:  
  `https://<IP-DEL-SERVIDOR>/nodered`

Credenciales almacenadas internamente (con posibilidad de agregar `credentialSecret` para cifrado externo más robusto).

---

### 3. 📡 Mosquitto MQTT

- Imagen: `eclipse-mosquitto`
- TLS activado con certificados locales
- Autenticación mediante archivo `passwd`
- Configuración en `mosquitto/config/mosquitto.conf`

📍 Seguridad:
- `listener 1883` con `allow_anonymous false`
- Certificados montados desde `mosquitto/certs/`
- Usuarios creados con `mosquitto_passwd`

---

### 4. 🌐 Caddy (Proxy HTTPS)

- Imagen: `caddy:latest`
- Escucha en `443` con certificados desde `caddy/certificados`
- Redirige:
  - `/nodered` → Node-RED
  - `/adminer` → Adminer
  - (Posibilidad de extender a `/panel`, etc.)

Caddyfile configurado para subrutas y TLS autofirmado.

---

### 5. 👨‍💻 Adminer

- Imagen: `adminer`
- Accesible en:  
  `https://<IP-DEL-SERVIDOR>/adminer`
- Permite gestionar directamente la base `biometrico`.

---

## 🔐 Archivo `.env`

Todas las credenciales sensibles están centralizadas en:

📄 `/home/proyecto-biofirma/nodered/.env`

Ejemplo de contenido:

```env
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=biometrico
MYSQL_USER=biofirma
MYSQL_PASSWORD=...

MQTT_USER=admin
MQTT_PASSWORD=...
```

> ⚠️ Este archivo está ignorado en `.gitignore` para no exponer claves.

---

## 🔁 Script de reinicio rápido

📄 `/home/proyecto-biofirma/nodered/reiniciar.sh`

Uso:

```bash
./reiniciar.sh
```

Automáticamente baja y levanta todos los contenedores, y muestra los logs de Mosquitto y Node-RED.

---

## ✅ Verificaciones post-reinicio

- `docker ps` → debe listar 5 contenedores activos
- `docker logs mosquitto` → debe mostrar `mosquitto version 2.x running`
- `docker logs nodered` → debe mostrar `Connected to broker: mqtts://mosquitto:1883`

---

## 🚧 Pendientes o próximos pasos sugeridos

- Crear las tablas `alumnos` y `registros` en la base de datos
- Armar los flujos en Node-RED que:
  - Reciban datos del sensor por MQTT
  - Verifiquen huella → logueen `entrada` o `salida` en DB
- Agregar interfaz `/panel` para directivos
- Proteger `/nodered` con `basic_auth` como segunda capa (opcional)
- Agregar `credentialSecret` en `settings.js` de Node-RED
