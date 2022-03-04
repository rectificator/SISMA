"use strict";
import * as QBuilder from "../../query.js";
let QueryBuilderSingleton = QBuilder.default.QueryBuilderSingleton;
let QueryBuilder = QBuilder.default.QueryBuilder;
class Model {
  constructor(query = QueryBuilderSingleton.getInstance(), options = {}) {
    this.query = query;
    this.options = options;
  }

  async fetchInfoRegistro() {
    let fetchedInfoList = await this.fetchFromTable("info_registro");
    return fetchedInfoList;
  }

  async fetchModalidad() {
    let fetchedInfoList = await this.fetchFromTable("modalidad");
    return fetchedInfoList;
  }

  async fetchAnio() {
    let fetchedInfoList = await this.fetchFromTable("anio");
    fetchedInfoList.sort((a, b) => b - a);
    return fetchedInfoList;
  }

  async fetchMes() {
    let fetchedInfoList = await this.fetchFromTable("mes");
    fetchedInfoList.sort((a, b) => b.id - a.id);
    return fetchedInfoList;
  }

  async fetchEstado() {
    let fetchedInfoList = await this.fetchFromTable("estado");
    return fetchedInfoList;
  }

  async fetchMunicipio() {
    let fetchedInfoList = await this.fetchFromTable("municipio");
    return fetchedInfoList;
  }

  async fetchInstitucion() {
    let fetchedInfoList = await this.fetchFromTable("institucion");
    return fetchedInfoList;
  }

  async fetchPoblacion() {
    let fetchedInfoList = await this.fetchFromTable("poblacion");
    return fetchedInfoList;
  }

  async fetchTipoActividad() {
    let fetchedInfoList = await this.fetchFromTable("tipo_actividad");
    return fetchedInfoList;
  }

  async fetchTipoAccion() {
    let fetchedInfoList = await this.fetchFromTable("tipo_accion");
    return fetchedInfoList;
  }

  async fetchFromTable(table) {
    return await QueryBuilder.getQueryEntries(
      QueryBuilder.getAllFromTable(table),
      true
    );
  }
}

export default Model;
