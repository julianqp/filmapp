# Backoffice

## Implemntación

La web se ha construido usando [Next.js](https://nextjs.org) (SSR), [React.js](https://es.reactjs.org) y una librería de CSS [Tailwind](https://tailwindcss.com). Además se ha configurado el eslint con una serie de reglas para buenas prácticas.

Las rutas sobre las que está construida la web son:

- http://localhost:3000/: Mostrará las compras realizadas
- http://localhost:3000/catalogo: Mostrará el catálogo de productos
- http://localhost:3000/cart: Mostrará los productos que se han ido añadiendo al carrito y el formulario de pago
- http://localhost:3000/checkout/[id]: Mostrará un mensaje de compra realizada correctamente.
- http://localhost:3000/compras/[id]: Mostrará la información de una compra realizada
- http://localhost:3000/payment-error: Mensaje en caso de error (No implementada)

## Inicio del proyecto

El proyecto no funcionará si no se tienen levantada la correspondiente api con la base de datos.

- npm install
- npm run dev

## Configuración

La configuración del proyecto irá en un archivo config, y contendra información como medios de pago que se pueden usar, funcionalidades de los medios de pago, url de las APIs, varibales de configuración de las pasarelas de pago (En un entorno de verdad, irian a como variables de entorno), etc.

## Configuración de las pasarelas de pago

En el archivo config habrá un array con las pasarelas de pago aceptadas, como se muestra en el ejemplo:

    payments: [{ name: 'Stripe', slug: 'stripe' }],

Para poder añadir las diferentes funcionalidades se añadirá un atributo por cada medio de pago con las funcionalidades desarrolladas:

    stripe: ['partial-refund', 'refund'],

La funcionalidad se realizará a traves de código.

Para este proyecto solo es válido el pago con Stripe, con función de pago, reembolso total y reembolso parcial.
