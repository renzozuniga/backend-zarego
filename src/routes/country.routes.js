import { Router } from "express";
import { methods as countryController } from "./../controllers/country.controller";

const router = Router();

// Usamos una ruta para obtener la informacion de los paises seleccionados
router.get("/", countryController.getCountries);

export default router;
