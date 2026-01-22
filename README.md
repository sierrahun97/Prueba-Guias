# Sistema de Gestión de Guías de Envío

Aplicación backend desarrollada con Node.js, Fastify, TypeScript y Redis implementando arquitectura hexagonal.

## Requisitos

- Node.js 22.22
- Redis ejecutándose en localhost:6379

## Instalación

1. Instalar dependencias
```bash
npm install
```

2. Verificar que Redis está activo. En Windows:
```powershell
redis-server
```

O con Docker:
```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

## Ejecución

### Modo Desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Compilar
```bash
npm run build
```

### Producción
```bash
npm start
```

## API REST

### Crear Guía
```http
POST /guias
Content-Type: application/json

{
  "numeroGuia": "GU001",
  "cliente": "Juan Pérez",
  "valorDeclarado": 5000
}
```

### Listar Guías
```http
GET /guias
```

### Facturar Guía
```http
POST /guias/{numeroGuia}/facturar
```

Solo se puede facturar una guía en estado CREADA.

### Anular Guía
```http
POST /guias/{numeroGuia}/anular
```

No se puede anular una guía en estado FACTURADA.

## Estructura del Proyecto

```
src/
├── dominio/               # Lógica de negocio
├── aplicacion/            # Casos de uso
├── infraestructura/       # Adaptadores técnicos
├── configuracion/         # Configuración
└── main.ts               # Punto de entrada
```

## Variables de Entorno

El archivo `.env` contiene:
```
REDIS_HOST=localhost
REDIS_PORT=6379
```

