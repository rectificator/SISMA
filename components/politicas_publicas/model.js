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
    return QueryBuilder.getPoliticasPublicas();
  }

  async insert(data) {
    console.log("Políticas Públicas: ", data);
    let id_info_registro = await QueryBuilder.insertInfoRegistro(data);

    QueryBuilder.insertPoliticasPublicas(data, id_info_registro);
  }
}

export default Model;
