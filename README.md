<p align="center">
  <img height="200" src=".\client\src\assets\lp\1x\Recurso2.png" />
</p>

"Eatime" fue creado como proyecto individual evaluativo en "Henry Bootcamp", es una aplicación web que te permite explorar diferentes recetas de comida y obtener información relevante sobre ellas. Utiliza la API externa de Spoonacular para buscar recetas, filtrarlas, ordenarlas y crear tus propias recetas personalizadas. La aplicación está desarrollada utilizando tecnologías como React, Redux, Express y Sequelize con PostgreSQL como base de datos.

## Requisitos

- Node (versión 12.18.3 o superior)
- NPM (versión 6.14.16 o superior)

Verificar las versiones instaladas ejecutando los siguientes comandos:

```
node -v
npm -v
```

## Configuración

Para comenzar, sigue los siguientes pasos:

1. Forkea este repositorio y clónalo en tu computadora.
2. En la carpeta `api`, crea un archivo llamado `.env` con la siguiente estructura:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplaza `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales de PostgreSQL. Este archivo será ignorado en la subida a GitHub por contener información sensible.

3. Crea una base de datos llamada `food` en PostgreSQL.

## Instalación

Sigue estos pasos para instalar las dependencias y ejecutar la aplicación:

1. En la carpeta raíz del proyecto, abre una terminal y ejecuta el siguiente comando para instalar las dependencias del servidor:

```
cd api
npm install
```

2. Luego, ejecuta el siguiente comando para iniciar el servidor:

```
npm start
```

El servidor estará disponible en [http://localhost:3001](http://localhost:3001).

3. En otra terminal, navega a la carpeta `client`:

```
cd ../client
```

4. Ejecuta el siguiente comando para instalar las dependencias del cliente:

```
npm install
```

5. Después de la instalación, inicia la aplicación cliente con el siguiente comando:

```
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Uso

La aplicación consta de las siguientes pantallas/rutas:

### Página Inicial

La página inicial muestra una imagen de fondo representativa del proyecto y un botón para ingresar al home (ruta principal).

### Ruta Principal (Home)

En esta ruta, encontrarás los siguientes elementos:

- Un campo de búsqueda para encontrar recetas por nombre.
- Un área donde se muestra un listado de recetas con sus detalles.
- Botones/Opciones para filtrar por tipo de dieta.
- Botones/Opciones para ordenar las recetas alfabéticamente y por nivel de "comida saludable".
- Paginación.

La ruta principal muestra tanto las recetas obtenidas desde la API como las de la base de datos. Por cuestiones de rendimiento, se muestran las primeras 100 recetas obtenidas desde la API.

### Ruta de Detalle de Receta

En esta ruta, se muestra la información detallada de una receta, incluyendo su imagen, nombre, tipo de plato, tipo de dieta, resumen, nivel de "comida saludable" y el paso a paso para prepararla.

### Ruta de Creación de Recetas

En esta ruta, encontrarás un formulario controlado con los siguientes campos:

Nombre de la receta
Resumen del plato
Nivel de "comida saludable"
Paso a paso para preparar la receta
Posibilidad de seleccionar/agregar uno o más tipos de dieta
Además, encontrarás un botón/opción para crear una nueva receta.

El formulario de creación de recetas está validado con JavaScript para garantizar la integridad de los datos ingresados. Puedes agregar las validaciones adicionales que consideres necesarias, como restricciones en el nombre de la receta o en el valor del nivel de "comida saludable".

## Base de Datos

El modelo de la base de datos utiliza las siguientes entidades:

- Receta: contiene los siguientes campos:

  - ID (identificador único)
  - Nombre
  - Resumen del plato
  - Nivel de "comida saludable"
  - Paso a paso para preparar la receta

- Tipo de dieta: contiene los siguientes campos:
  - ID (identificador único)
  - Nombre

La relación entre las entidades es de muchos a muchos, ya que una receta puede pertenecer a varios tipos de dieta y un tipo de dieta puede tener varias recetas asociadas.

Es importante tener en cuenta la forma de modelar los IDs de las recetas en la base de datos. Debido a que las recetas pueden provenir tanto de la API como de la base de datos, se debe evitar la ambigüedad al acceder al detalle de una receta. Asegúrate de diferenciar las recetas con identificadores únicos para evitar conflictos.

## Backend

El servidor backend está desarrollado en Node.js utilizando Express y Sequelize para interactuar con la base de datos PostgreSQL. El servidor proporciona las siguientes rutas:

- `GET /recipes?name="..."`: Obtiene un listado de recetas que contengan la palabra ingresada como parámetro de consulta. Si no se encuentra ninguna receta, se muestra un mensaje adecuado.

- `GET /recipes/{idReceta}`: Obtiene el detalle de una receta en particular, incluyendo los campos mostrados en la ruta de detalle de receta. También se incluyen los tipos de dieta asociados a la receta.

- `POST /recipes`: Recibe los datos del formulario de creación de recetas a través del cuerpo de la solicitud y crea una nueva receta en la base de datos, estableciendo las relaciones con los tipos de dieta seleccionados.

- `GET /diets`: Obtiene todos los tipos de dieta posibles. En caso de no existir ninguno, se precargan los tipos de dieta indicados por Spoonacular.

## ¡Espero que disfrutes explorando y creando deliciosas recetas con esta aplicación!
