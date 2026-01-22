# Sistema de Gestión de Guías de Envío

Aplicación backend desarrollada con Node.js, Fastify, TypeScript y Redis implementando arquitectura hexagonal.

## Requisitos

- Node.js 22.22
- Redis ejecutándose en localhost:6379

## Dependencias del Proyecto

### Dependencias de Producción
```bash
npm install fastify redis dotenv
```

### Dependencias de Desarrollo
```bash
npm install -D typescript ts-node @types/node @types/redis @types/jest jest ts-jest fastify-plugin
```

## Instalación

1. **Clonar el repositorio e instalar todas las dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

3. **Verificar que Redis está activo**

En Windows:
```powershell
redis-server
```

O con Docker:
```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

4. **Compilar el proyecto TypeScript**
```bash
npm run build
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

## Testing

El proyecto incluye pruebas unitarias e integración usando **Jest** y **ts-jest**.

### Ejecutar Todos los Tests
```bash
npm test
```

### Ejecutar Tests en Modo Watch
```bash
npm run test:watch
```

### Ejecutar Tests con Cobertura
```bash
npm run test:coverage
```

### Estructura de Tests

```
test/
├── unit/                      # Pruebas unitarias
│   └── Guia.test.ts          # Tests de entidad Guía
└── integracion/               # Pruebas de integración
    └── GuiaIntegracion.test.ts # Tests E2E con Redis
```

### Configuración de Jest

El proyecto utiliza:
- **ts-jest**: Para ejecutar tests de TypeScript
- **ES Modules**: Configuración compatible con imports ESM
- **moduleNameMapper**: Resolución de extensiones `.js` en imports

Configuración en [jest.config.cjs](jest.config.cjs):
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
```

### Notas Importantes sobre ES Modules

Este proyecto usa **ES Modules** con TypeScript. Los imports relativos deben incluir la extensión `.js`:

```typescript
// ✅ Correcto
import Guia from './dominio/entidades/Guia.js';

// ❌ Incorrecto
import Guia from './dominio/entidades/Guia';
```

Aunque los archivos fuente son `.ts`, Node.js requiere la extensión `.js` en los imports para ES modules.

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
├── dominio/                      # Lógica de negocio
│   ├── entidades/               # Entidades del dominio
│   │   └── Guia.ts             # Entidad Guía
│   ├── enums/                  # Enumeraciones
│   │   └── EstadoGuia.ts       # Estados de la guía
│   └── repositorio/            # Interfaces de repositorio
│       └── IGuiaRepositorio.ts # Contrato del repositorio
├── aplicacion/                  # Casos de uso
│   └── casosUso/
│       ├── CrearGuia.ts        # Crear nueva guía
│       ├── ListarGuias.ts      # Listar todas las guías
│       ├── FacturarGuia.ts     # Facturar guía
│       └── AnularGuia.ts       # Anular guía
├── infraestructura/            # Adaptadores técnicos
│   ├── persistencia/
│   │   └── RedisGuiaRepositorio.ts  # Implementación con Redis
│   ├── controlador/
│   │   └── GuiaControlador.ts       # Controlador HTTP
│   └── rutas/
│       └── GuiaRutas.ts            # Definición de rutas
├── configuracion/              # Configuración
│   └── redisClient.ts         # Cliente Redis
├── common/                     # Utilidades comunes
│   └── statusCode.ts          # Códigos de estado HTTP
└── main.ts                    # Punto de entrada

test/
├── unit/                       # Pruebas unitarias
│   └── Guia.test.ts
└── integracion/               # Pruebas de integración
    └── GuiaIntegracion.test.ts
```

## Tecnologías y Frameworks Utilizados

### Backend
- **Node.js v22**: Entorno de ejecución de JavaScript
- **TypeScript v5.9**: Superset de JavaScript con tipado estático
- **Fastify v5.7**: Framework web de alto rendimiento
- **Redis v5.10**: Base de datos en memoria para almacenamiento

### Testing
- **Jest v30**: Framework de testing
- **ts-jest v29**: Preset de Jest para TypeScript

### Desarrollo
- **ts-node**: Ejecutor de TypeScript para desarrollo
- **dotenv**: Gestión de variables de entorno

### Arquitectura
- **Arquitectura Hexagonal (Puertos y Adaptadores)**
- **Domain-Driven Design (DDD)**
- **SOLID Principles**

## Variables de Entorno

El archivo `.env` contiene:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

