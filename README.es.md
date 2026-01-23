# JWT Auth Practice (Flask + React)

Este proyecto es una práctica personal para implementar un sistema de **autenticación (Auth)** con **JWT (JSON Web Tokens)** en un backend con **Python (Flask)** y consumirlo desde un frontend hecho en **React**.

El objetivo es entender e implementar el flujo completo de autenticación:

1. El usuario inicia sesión desde React.
2. Flask valida credenciales contra base de datos.
3. Flask genera y devuelve un **token JWT**.
4. React guarda ese token y lo usa para acceder a endpoints protegidos.
5. Flask protege rutas usando `@jwt_required()`.

---

## 🎯 Objetivos del proyecto

- Practicar autenticación con JWT.
- Aprender a generar tokens desde Flask.
- Proteger endpoints con `@jwt_required()`.
- Enviar el JWT desde React en el header `Authorization`.
- Unir backend + frontend en un flujo real de login y acceso a rutas privadas.

---

## 🛠️ Tecnologías utilizadas

### Backend
- Python
- Flask
- Flask-JWT-Extended
- Flask-CORS
- SQLAlchemy

### Frontend
- React
- Fetch API
- CSS simple (sin Bootstrap / sin librerías extra)

---

## ✅ Funcionalidades

- Login con email y contraseña.
- Generación y devolución de token JWT.
- Endpoint protegido `/secret` accesible solo con token.
- Renderizado de secretos en el frontend tras login.
- Logout (limpia token y datos cargados).

---

## 🔐 Endpoints principales

### `POST /login`
Autentica un usuario y devuelve un token JWT.

**Body:**
```json
{
  "email": "example@gamil.co",
  "password": "cositas1"
}
```
**Response:**
```json
{
  "access_token": "xxxxx..."
}
```
**GET /secret (protegido)**
Devuelve información privada si el JWT es válido

## Header necesario
- Authorization: Bearer <token>

## 🚀 Cómo ejecutar el proyecto
**1) Backend (Flask)**
Ejecuta el servidor Flask:

- python src/app.py

**2) Frontend (React)**
Instala dependencias y ejecuta:

- npm install
- npm run dev

## ⚙️ Variables de entorno
**Frontend (.env)**

Configura la URL del backend:

- VITE_BACKEND_URL=http://localhost:3001

## ✍️ Autor
Proyecto realizado por Cristian para practicar autenticación JWT integrando **Flask + React**.