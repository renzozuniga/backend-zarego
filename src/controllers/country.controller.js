import { getConnection } from "./../database/database";
import moment from "moment";

/*
Parametros:
    - page: Pagina que se quiere mostrar
    - rows: Intervalo de registros a mostrar por pagina
    - list: Lista de ID's de paises seleccionados (opcional) 
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
      queryList += ` ORDER BY FIELD(id,${list})`;
    } else {
      // Respuesta por default sin seleccion de paises
      res.json({
        metadata: {
          page: 1,
          rows: 10,
          total_registers: 0,
        },
        data: [],
      });
      return;
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
    console.log("error: ", error);
    res.status(500);
    res.send(error.message);
  }
};

const getAllCountries = async (req, res) => {
  try {
    const connection = await getConnection();

    // Se usa un parametro para filtrar el endpoint
    const { list } = req.query;

    // Se realiza logica para filtrar por ID's de paises
    let queryList = "";
    if (list) {
      queryList = "WHERE id IN (";
      let arrayList = list.split(",");
      for (let item of arrayList) {
        queryList += `${item},`;
      }
      queryList = queryList.replace(/.$/, ")");
      queryList += ` ORDER BY FIELD(id,${list})`;
    }

    // Se obtiene la informacion de los paises seleccionados
    const result = await connection.query(`SELECT * FROM country ${queryList}`);

    res.json({
      data: result,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getCountriesOptions = async (req, res) => {
  try {
    const connection = await getConnection();

    // Se obtiene id y nombre de los paises seleccionados
    const result = await connection.query(
      `SELECT id, country_name FROM country`
    );

    res.json({
      data: result.map((obj) => ({
        label: obj.country_name,
        value: obj.id,
      })),
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getCountries,
  getAllCountries,
  getCountriesOptions,
};
