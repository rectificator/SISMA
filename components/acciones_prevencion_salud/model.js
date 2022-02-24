"use strict";
import * as QBuilder from "../../query.js";
let QueryBuilderSingleton = QBuilder.default.QueryBuilderSingleton;
class Model {
  constructor(query = QueryBuilderSingleton.getInstance(), options = {}) {
    this.query = query;
    this.options = options;
  }

  async fetch() {
    return "Acciones de Prevención en salud INFO";
  }

  async insert(data) {
    console.log("Acciones de Prevención en salud: ", data);
  }
}

export default Model;
