import express from "express";
import morgan from "morgan";
import cors from "cors";
import countryRoutes from "./routes/country.routes";

// Usamos express para poder crear un servidor web que maneje rutas (GET, POST, PUT, DELETE)
const app = express();

// Settings
app.set("port", 4000);

// Middlewares
// Usamos morgan en modo de desarrollo para tener un detalle de las peticiones en la consola
app.use(morgan("dev"));

// CORS
// Usamos cors para pasar cookies u otras credenciales a cliente
const corsOptions = {
  origin: process.env.ORIGIN_URI,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/countries", countryRoutes);

export default app;
