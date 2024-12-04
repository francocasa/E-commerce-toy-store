# Ecommerce Juguetitos 👩‍💻

Juguetitos es una pagina web diseñada para facilitar la compra de juguetes en un espacio virtual, donde el cliente puede ver las caracteristicas del producto y el administrador del negocio puede crear,editar o borrar productos o promociones.

<p align="center">
    <img src="https://raw.githubusercontent.com/francocasa/E-commerce-toy-store/refs/heads/develop/public/logo-juguetitos.png"/>
</p>

## Características ⚙️

- Registro y autenticación de usuarios.
- Creación, edición y eliminación de productos, en modo administrador.
- Listado de productos en el cart.
- Pagina de perfil de cliente, para conocer historial de compras.

## Tecnologías utilizadas ⚒️

Frontend:

- React: Para construir la interfaz de usuario.
- Vite: Como bundler y servidor de desarrollo.
- Tailwind CSS: Para estilos utilitarios.
- React Router DOM: Para el manejo de rutas.
- JSON Server: Para simular una API REST durante el desarrollo.
- Comunicación con backend onrender.
- ESLint y Prettier: Para asegurar la calidad y el formato del código.
- Husky y lint-staged: Para ejecutar scripts de pre-commit.

Backend:

- Node.js (Express) con TypeScript: Para desarrollar la API.
- Base de Datos: PostgreSQL para almacenar información.
- Autenticación: Registro y autenticación de usuarios.
- Carga de Imágenes: Funcionalidad para cargar imágenes.
- Envío de Correos: Integración para el envío de correos electrónicos.

Funcionalidades Avanzadas:

- Pagos, presentación de información en un mapa o funcionalidades en tiempo real (Web Sockets).

Despliegue:

- Despliegue en vercel: https://e-commerce-toy-store.vercel.app/

Pruebas:

- Implementación de pruebas end-to-end con Cypress más adelante se hace mención.

## Estructura del proyecto 🖥️

- src/

  - components/: Contiene los componentes reutilizables de React para la interfaz de usuario, estilizados con Tailwind CSS.
  - pages/: Componente de las distintas páginas de la aplicación (por ejemplo, Home, Producto, Carrito, etc.).
  - services/: Lógica para manejar las llamadas a la API y gestionar el estado de la aplicación.
  - context/: Contexto de React para la gestión del estado global (por ejemplo, carrito de compras, usuario autenticado).
  - assets/: Archivos estáticos como imágenes y estilos globales.

- cypress/

  - ficheros importantes para los tests.

- public/: Archivos públicos, incluyendo index.html y otros recursos que se sirven directamente.

- package.json: Archivo que define las dependencias y scripts del proyecto.

## Instalación 🚧

A la fecha 26 de noviembre, se tiene desplegado el backend en la red y está en nuestro .env

Clona este repositorio:

```
git clone https://github.com/francocasa/E-commerce-toy-store.git
```

Navega al directorio del proyecto:

```
cd E-commerce-toy-store
```

- Abre el proyecto en tu IDE favorito (por ejemplo, IntelliJ IDEA o Eclipse) o si deseas en Visual Studio Code.

En caso de usar Visual Studio Code:

- Requieres tener un archivo .env (variable de entorno) Que tenga los términos:

.env

```
VITE_API_URL=""
VITE_IMAGES_URL=""
```

Donde se debe colocar tu ruta de backend

- En caso de usar VSC, abre el terminal y ejecuta el siguiente comando
  ```
  npm install
  npm run dev
  ```

### Paginas y funcionalidades 📊

Se presenta un diagrama en Octopus.io sobre la navegación entre paginas y sus funcionalidades a manera general:

![alt text](/screenshots/image-3.png)

Sobre las paginas se tiene la siguiente descripcion de sus funcionalidades:
![alt text](/screenshots/image-4.png)

## Cypress en frontend ⌨️

Se usó Cypress para pruebas End-to-end, usando el comando

```
npx cypress run
```

Se tiene esta imagen:
![alt text](/screenshots/image-5.png)

## Contribuciones ⌨️

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir el cambio que deseas realizar. Siéntete libre de hacer un fork del proyecto y enviar un pull request.

## Licencia 🚀

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

```

```
