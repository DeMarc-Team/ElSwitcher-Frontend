# ElSwitcher-Frontend

ElSwitcher es un juego de mesa. En este proyecto se desarrolla la parte del frontend del juego.

## Instalación

Se debe tener instalado [NPM](https://www.npmjs.com/) para usar el proyecto.
Para instalar el proyecto, se debe clonar el repositorio y luego instalar las dependencias con el siguiente comando:

```bash
npm install
```

## Uso como desarrollador

Para correr el proyecto en modo de desarrollo, se debe ejecutar el siguiente comando:

```bash
npm run dev
```

<!-- Completar ... -->

## Uso como usuario

Para correr el proyecto en modo de producción, se debe ejecutar el siguiente comando:

```bash
npm run build
```

Y luego:

```bash
npm run preview
```

## Estructura del proyecto

El proyecto está estructurado de la siguiente manera:

```
ElSwitcher-Frontend
│   README.md
│   package.json => dependencias del proyecto.
│   index.html   => archivo principal.
│   ...
│
└───public => archivos públicos.
│
└───src
    │  App.tsx => componente principal, en donde se definen las rutas.
    │  Index.css => estilos globales.
    │  main.tsx => archivo principal.
    │  ...
    │
    └───components => componentes reutilizables.
    │   │  Component1.tsx => componente 1.
    │   │  ...
    │   │  ComponentN.tsx => componente N.
    │   └───ui => componentes de de la libreria de componentes.
    │
    └───containers => contenedores de las páginas.
    │   └───Page1
    │   │   │  Page1.tsx => pagina principal de la página 1.
    │   │   └───components => componentes específicos de la página 1.
    │   │   │  ...
    │   └───PageN ...
    │
    └───services
        │  Service1.ts => servicio 1.
        │  ...
        │  ServiceN.ts => servicio N.
        └───shadcn_lib => utilidades de la libreria de componentes.
        └───api => servicios de la api.
```

## Branches

-   **main**: Branch principal del proyecto.
-   **develop**: Branch de desarrollo.

> IMPORTANTE: Mandar los PR a develop, siempre.

> Para cada ticket, se debe crear una branch aparte siguiendo las [convenciones de branches](#convenciones-de-branches).

## Convenciones de código

1. Las **carpteas** siempre en minúsculas y separadas por guiones bajos "\_". Ej: carpeta_uno
2. Los **archivos de logica** siempre en minúsculas y separados por guiones bajos "\_". Ej: archivo_uno.ts
3. Los **archivos de componentes** se usa la notación camelCase. Ej: ComponenteUno.tsx
    1. IMPORTANTE: El nombre de la funcion del componente debe ser el mismo que el nombre del archivo.

## Convenciones de commits

Se debe seguir el siguiente formato para los commits:

```
<tag del issue en jira> <tipo(opcional)>: <mensaje>
```

Ejemplo:

```
ELSW-1 feat: Se agrega componente de login
```

## Convenciones de branches

Se debe seguir el siguiente formato para las branches:

```
<tag del issue en jira>-<descripcion>
```

> Idealmente, crear desde jiira la branch.

Ejemplo:

```
ELSW-1-agregar-componente-login
```

## Convenciones de formato

Esto esta automatizado con [Prettier](https://prettier.io/). Al hacer un commit, se formatea el código automáticamente gracias a [husky](https://typicode.github.io/husky/#/). (Pero se recomienda formatear el código antes de hacer un commit).
Se puede chequear el formato del código con el siguiente comando: `npm run check-format`.
Se puede formatear el código con el siguiente comando: `npm run format`.

## Stack

-   [Vite](https://vitejs.dev/)
-   [React](https://es.reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Shadcn UI](https://ui.shadcn.com/)

## Recomedaciones

-   Usar las extenciónes recomendadas para el proyecto en vscode.
-   Usar [Shadcn UI](https://ui.shadcn.com/) para los componentes.
-   Usar [TailwindCSS](https://tailwindcss.com/) para los estilos.
