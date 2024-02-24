import { getConnection } from "./../database/database";
import moment from "moment";

/*
Parametros:
    - page: Pagina que se quiere mostrar
    - rows: Intervalo de registros a mostrar por pagina
    - list: Lista de ID's de paises seleccionados (opcional, sino se pasa se muestran todos los paises) 
*/
const getCountries = async (req, res) => {
  try {
    const connection = await getConnection();

    // Se usan 3 parametros para filtrar el endpoint
    const { page, rows, list } = req.query;
    const offset = (page - 1) * rows;

    // Se realiza logica para filtrar por ID's de paises
    let queryList = "";
    if (list) {
      queryList = "WHERE id IN (";
      let arrayList = list.split(",");
      for (let item of arrayList) {
        queryList += `${item},`;
      }
      queryList = queryList.replace(/.$/, ")");
    }

    // Se calcula el total de paises filtrados
    const total = await connection.query(
      `SELECT COUNT(*) as total FROM country ${queryList}`
    );

    // Se obtiene la informacion de los paises seleccionados
    const result = await connection.query(
      `SELECT * FROM country ${queryList} LIMIT ${rows} OFFSET ${offset}`
    );

    // Se agrega la fecha actual de la busqueda o ejecucion del endpoint a la respuesta
    const date_now = new Date();
    const date_formatted = moment(date_now).format("MM-DD-YYYY");

    res.json({
      metadata: {
        page: Number(page),
        rows: Number(rows),
        total_registers: total[0].total,
      },
      data: result.map((obj) => ({ ...obj, date_added: date_formatted })),
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getCountries,
};
