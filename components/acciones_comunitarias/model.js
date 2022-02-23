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
    let acciones_comunitarias = await QueryBuilder.getQueryEntries(
      QueryBuilder.getAllFromTable("acciones_comunitarias"),
      true
    );

    for (
      let rowIndex = 0;
      rowIndex < acciones_comunitarias.length;
      rowIndex++
    ) {
      let row = acciones_comunitarias[rowIndex];

      let poblacion = {
        table: "poblacion",
        pivotTable: "acciones_comunitarias_poblacion",
        tableField: "poblacion",
      };
      let tipo_actividad = {
        table: "tipo_actividad",
        pivotTable: "acciones_comunitarias_tipo_actividad",
        tableField: "tipo",
      };

      let info_from_pivot_tables = await QueryBuilder.getInfoFromPivotTables(
        (table, id) =>
          QueryBuilder.getFromTableWhere(table, "acciones_comunitarias", id),
        row.id,
        poblacion,
        tipo_actividad
      );

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);
      let modalidad = await QueryBuilder.getQueryEntries(
        QueryBuilder.getFromTableById("modalidad", row.id_modalidad)
      );

      row.info_registro = infoRegistro;
      row.modalidad = modalidad.modalidad;
      row.poblacion = info_from_pivot_tables.poblacion;
      row.tipo_actividad = info_from_pivot_tables.tipo;

      acciones_comunitarias[rowIndex] = row;
    }

    return acciones_comunitarias;
  }

  async insert(data) {
    let id_info_registro = await QueryBuilder.insertInfoRegistro(data);

    QueryBuilder.insertAccionesComunitarias(data, id_info_registro);
  }

  async getInfoRegistro(id = -1) {
    let infoRegistro;
    if (id != -1) {
      infoRegistro = await QueryBuilder.getQueryEntries(
        QueryBuilder.getFromTableById("info_registro", id),
        true
      );
    } else {
      infoRegistro = await QueryBuilder.getQueryEntries(
        QueryBuilder.getAllFromTable("info_registro")
      );
    }
    for (let rowIndex = 0; rowIndex < infoRegistro.length; rowIndex++) {
      let row = infoRegistro[rowIndex];
      let mes = {
        table: "mes",
        pivotTable: "info_registro_mes",
        tableField: "mes",
      };
      let info_from_pivot_tables = await QueryBuilder.getInfoFromPivotTables(
        (table, id) =>
          QueryBuilder.getFromTableWhere(table, "info_registro", id),
        row.id,
        mes
      );

      let anio = await QueryBuilder.getQueryEntries(
        QueryBuilder.getFromTableById("anio", row.id_anio)
      );
      let municipio = await QueryBuilder.getQueryEntries(
        QueryBuilder.getFromTableById("municipio", row.id_municipio)
      );
      let estado = await QueryBuilder.getQueryEntries(
        QueryBuilder.getFromTableById("estado", municipio.id_estado)
      );
      let institucion = await QueryBuilder.getQueryEntries(
        QueryBuilder.getFromTableById("institucion", row.id_institucion)
      );

      row.anio = anio.anio;
      row.mes = info_from_pivot_tables.mes;
      row.estado = estado.estado;
      row.municipio = municipio.municipio;
      row.institucion = institucion.institucion;

      /* 
            delete row.id
            delete row.id_anio
            delete row.id_municipio
            delete row.id_institucion
            */

      infoRegistro[rowIndex] = row;
    }

    return id != -1 ? infoRegistro[0] : infoRegistro;
  }
}

export default Model;
