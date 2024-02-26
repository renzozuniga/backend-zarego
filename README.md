
# Backend NodeJS Zarego

Se construye una REST API con un endpoint para mostrar información de paises basados en una base de datos de terceros para enviar a una website y aplicación movil.

A continuación se explicará el proceso de construcción del proyecto:




## Preprocesamiento de datos de entrada
El preprocesamiento de datos es necesario, ya que se requiere una estructura específica para poblar la base de datos del proyecto. Esto fue realizada como experimentación en lenguaje **Python** usando **Jupyter Notebook**.

#### Extracción de datos
Se realiza la extracción de datos de acuerdo al archivo **CSV** que se obtiene de la fuente https://data.world/adamhelsinger/globe-project, la cual nos brinda una data actualizada al dia de hoy.

![App Screenshot](https://img.hotimg.com/Screenshot-2024-02-24-at-12.50.18.png)

#### Generación de datos
Teniendo en cuenta que para nuestro endpoint solo necesitaremos algunos campos, procedemos a filtrar y ordenar los datos para formar una nueva estructura con la cual inicializar nuestra base de datos.

![App Screenshot](https://img.hotimg.com/Screenshot-2024-02-24-at-12.50.34.png)

## Inicialización y poblado de datos en la base de datos
Se utilizó la herramienta **MySQL Workbench** para la importación de datos y el poblado de la misma; por lo que con ello, se tienen los datos a trabajar para el endpoint solicitado. 

![App Screenshot](https://img.hotimg.com/Screenshot-2024-02-24-at-13.00.37.png)



## API Endpoints

#### Get Countries Information

```http
  GET /api/countries?page=${page}&rows=${rows}&list=${list}
```

| Parameter | Type     | Description                | Example |
| :-------- | :------- | :------------------------- |--------|
| `page` | `int` | **Required**. |1|
| `rows` | `int` | **Required**. |5|
| `list` | `string` | **Not Required**. |"1,2,3,4"|

#### Get All Countries

```http
  GET /api/countries/all&list=${list}
```

| Parameter | Type     | Description                | Example |
| :-------- | :------- | :------------------------- |--------|
| `list` | `string` | **Required**. |"1,2,3,4"|

#### Get Countries Options

```http
  GET /api/countries/options
```

## Environment Variables

Para levantar el proyecto, se tendrá que agregar las siguientes variables de entorno al archivo .env

`RDS_HOST`

`RDS_DATABASE`

`RDS_USER`

`RDS_PASSWORD`

`ORIGIN_URI`

## Run Locally

Clone the project

```bash
  git clone https://github.com/renzozuniga/backend-zarego.git
```

Go to the project directory

```bash
  cd backend-zarego
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm test
```


## Authors

- [@renzozuniga](https://www.github.com/renzozuniga)

