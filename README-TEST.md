#  TEST DE FRONTEND

## Instalación
Se debe de instalar las siguientes dependencias para poder ejecutar los test. 

1. La librería de vitest que trae todas las funciones básicas para generar los tests.
2. Posteriormente jest-dom quien proporcionará algunas dependencias adicionales.

El primero es:

```bash
npm install --save-dev vitest
```

Y luego:

```bash
npm install --save-dev vitest
```

## ¿Cómo usar los test?
Los test se podrán ejcutar entrando a la carpeta "tests" (la cual se encuentra en src) y ejecutando el comando: 

```bash
npm run test
```

Si se quiere ver el porcentaje del front que está cubierto por los test se debe de ejecutar:

```bash
npm run coverage
```