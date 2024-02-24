import { config } from "dotenv";

// Usamos config para usar las variables de entorno en el proyecto
config();

let config_params = {
  host: process.env.RDS_HOST || "",
  database: process.env.RDS_DATABASE || "",
  user: process.env.RDS_USER || "",
  password: process.env.RDS_PASSWORD || "",
};

if (process.env.NODE_ENV === "test") {
  config_params = {
    host: process.env.RDS_HOST || "",
    database: process.env.RDS_DATABASE || "",
    user: process.env.RDS_USER || "",
    password: process.env.RDS_PASSWORD || "",
  };
}

export default config_params;
