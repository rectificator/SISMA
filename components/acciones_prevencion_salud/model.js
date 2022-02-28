"use strict";
import * as QBuilder from "../../query.js";
let QueryBuilderSingleton = QBuilder.default.QueryBuilderSingleton;
let QueryBuilder = QBuilder.default.QueryBuilder;

class Model {
  constructor(query = QueryBuilderSingleton.getInstance(), options = {}) {
    this.query = query;
    this.options = options;
  }

  async fetch() {
    return QueryBuilder.getAccionesPrevencionSalud();
  }

  async insert(data) {
    console.log("Acciones de Prevención en salud: ", data);
    let id_info_registro = await QueryBuilder.insertInfoRegistro(data);

    QueryBuilder.insertAccionesDePrevencionEnSalud(data, id_info_registro);
  }
}

export default Model;
