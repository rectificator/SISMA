import knexInstance from "./dbConfig.js";

class QueryBuilder {
  constructor(query = "") {
    this.query = query;
  }

  static get rows() {
    return 0;
  }
  static get columns() {
    return 1;
  }

  select(...columns) {
    this.query += `SELECT `;
    if (columns.length > 0 && columns[0] != "") {
      this.columnsAppend(columns);
    } else {
      this.appendValue("*");
    }

    return this;
  }

  columnsAppend(columns) {
    let columnLength = columns.length;
    let lastIndex = columnLength - 1;
    columns.forEach((column) => {
      if (column.length > 0 && columns[lastIndex] != column) {
        this.appendValue(column, ",");
      } else if (column.length > 0 && columns[lastIndex] == column) {
        this.appendValue(column);
      }
    });
  }

  from(table) {
    this.appendValue(` FROM ${table}`);
    return this;
  }

  where(condition) {
    this.appendValue(` WHERE ${condition}`);
    return this;
  }

  appendValue(value, separator = "") {
    this.query += `${value}${separator}`;
  }

  build() {
    let sentence = this.query;
    this.flushQuery();
    return knexInstance.schema.raw(sentence);
  }

  flushQuery() {
    this.query = "";
  }

  //Consuta de infomación de la tabla acciones_comunitarias
  static async getAccionesComunitarias() {
    let acciones_comunitarias = await this.getQueryEntries(
      this.getAllFromTable("acciones_comunitarias"),
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

      let info_from_pivot_tables = await this.getInfoFromPivotTables(
        (table, id) =>
          this.getFromTableWhere(table, "acciones_comunitarias", id),
        row.id,
        poblacion,
        tipo_actividad
      );

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);
      let modalidad = await this.getQueryEntries(
        this.getFromTableById("modalidad", row.id_modalidad)
      );

      row.info_registro = infoRegistro;
      row.modalidad = modalidad.modalidad;
      row.poblacion = info_from_pivot_tables.poblacion;
      row.tipo_actividad = info_from_pivot_tables.tipo;

      acciones_comunitarias[rowIndex] = row;
    }

    return acciones_comunitarias;
  }

  //Consuta de infomación de la tabla acciones_prevencion_salud
  static async getAccionesPrevencionSalud() {
    let acciones_prevencion_salud = await this.getQueryEntries(
      this.getAllFromTable("acciones_prevencion_salud"),
      true
    );

    for (
      let rowIndex = 0;
      rowIndex < acciones_prevencion_salud.length;
      rowIndex++
    ) {
      let row = acciones_prevencion_salud[rowIndex];

      let poblacion = {
        table: "poblacion",
        pivotTable: "acciones_prevencion_salud_poblacion",
        tableField: "poblacion",
      };
      let tipo_accion = {
        table: "tipo_accion",
        pivotTable: "acciones_prevencion_salud_tipo_accion",
        tableField: "tipo_accion",
      };

      let info_from_pivot_tables = await this.getInfoFromPivotTables(
        (table, id) =>
          this.getFromTableWhere(table, "acciones_prevencion_salud", id),
        row.id,
        poblacion,
        tipo_accion
      );

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);
      let modalidad = await this.getQueryEntries(
        this.getFromTableById("modalidad", row.id_modalidad)
      );

      row.info_registro = infoRegistro;
      row.modalidad = modalidad.modalidad;
      row.poblacion = info_from_pivot_tables.poblacion;
      row.tipo_accion = info_from_pivot_tables.tipo_accion;

      acciones_prevencion_salud[rowIndex] = row;
    }

    return acciones_prevencion_salud;
  }

  //Consuta de infomación de la tabla atencion_salud
  static async getAtencionSalud() {
    let atencion_salud = await this.getQueryEntries(
      this.getAllFromTable("atencion_salud"),
      true
    );

    for (
      let rowIndex = 0;
      rowIndex < atencion_salud.length;
      rowIndex++
    ) {
      let row = atencion_salud[rowIndex];

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);

      row.info_registro = infoRegistro;

      atencion_salud[rowIndex] = row;
    }

    return atencion_salud;
  }

  //Consuta de infomación de la tabla capacitacion
  static async getCapacitacion() {
    let capacitacion = await this.getQueryEntries(
      this.getAllFromTable("capacitacion"),
      true
    );

    for (
      let rowIndex = 0;
      rowIndex < capacitacion.length;
      rowIndex++
    ) {
      let row = capacitacion[rowIndex];

      let poblacion = {
        table: "poblacion",
        pivotTable: "capacitacion_poblacion",
        tableField: "poblacion",
      };

      let info_from_pivot_tables = await this.getInfoFromPivotTables(
        (table, id) =>
          this.getFromTableWhere(table, "capacitacion", id),
        row.id,
        poblacion,
      );

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);
      let modalidad = await this.getQueryEntries(
        this.getFromTableById("modalidad", row.id_modalidad)
      );

      row.info_registro = infoRegistro;
      row.modalidad = modalidad.modalidad;
      row.poblacion = info_from_pivot_tables.poblacion;

      capacitacion[rowIndex] = row;
    }

    return capacitacion;
  }

  //Consuta de infomación de la tabla politicas_publicas
  static async getPoliticasPublicas() {
    let politicas_publicas = await this.getQueryEntries(
      this.getAllFromTable("politicas_publicas"),
      true
    );

    for (
      let rowIndex = 0;
      rowIndex < politicas_publicas.length;
      rowIndex++
    ) {
      let row = politicas_publicas[rowIndex];

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);

      row.info_registro = infoRegistro;

      politicas_publicas[rowIndex] = row;
    }

    return politicas_publicas;
  }

  //Consuta de infomación de la tabla suicidio
  static async getSuicidio() {
    let suicidio = await this.getQueryEntries(
      this.getAllFromTable("suicidio"),
      true
    );

    for (
      let rowIndex = 0;
      rowIndex < suicidio.length;
      rowIndex++
    ) {
      let row = suicidio[rowIndex];

      let infoRegistro = await this.getInfoRegistro(row.id_info_registro);

      row.info_registro = infoRegistro;

      suicidio[rowIndex] = row;
    }

    return suicidio;
  }

  // Obtener información de la tabla info_registro
  static async getInfoRegistro(id = -1) {
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

  static async getQueryEntries(
    getForeingKeyRelatedTableAsyncFunction,
    list = false,
    ...requestedColumns
  ) {
    let result;
    let foreingKeyRelatedTable = await getForeingKeyRelatedTableAsyncFunction;
    foreingKeyRelatedTable = await this.readQueryEntries(
      foreingKeyRelatedTable
    );

    if (list == true) {
      if (requestedColumns.length == 0) {
        result = foreingKeyRelatedTable;
      } else {
        result = foreingKeyRelatedTable.map((row) => {
          let rowObject = {};
          for (
            let columnIndex = 0;
            columnIndex < requestedColumns.length;
            columnIndex++
          ) {
            let column = requestedColumns[columnIndex];
            rowObject[column] = row[column];
          }
          return rowObject;
        });
      }
    } else {
      if (requestedColumns.length == 0) {
        result = foreingKeyRelatedTable[this.rows];
      } else if (requestedColumns.length == 1) {
        result = foreingKeyRelatedTable[this.rows][requestedColumns[0]];
      } else {
        result = {};
        for (
          let columnIndex = 0;
          columnIndex < requestedColumns.length;
          columnIndex++
        ) {
          let column = requestedColumns[columnIndex];
          result[column] = foreingKeyRelatedTable[this.rows][column];
        }
      }
    }

    return result;
  }

  static async getInfoThroughPivotTable(
    getPivotTableAsyncFunction,
    getLinkedTableAsyncFunction,
    linkedTableFieldName,
    linkedTableName
  ) {
    let values = [];

    let pivotTable = await getPivotTableAsyncFunction;
    pivotTable = await this.readQueryEntries(pivotTable);

    for (let rowIndex = 0; rowIndex < pivotTable.length; rowIndex++) {
      let row = pivotTable[rowIndex];
      let linkedTable = await getLinkedTableAsyncFunction(
        linkedTableName,
        row[linkedTableName]
      );
      linkedTable = await this.readQueryEntries(linkedTable);

      values.push(linkedTable[this.rows][linkedTableFieldName]);
    }

    return values;
  }

  static async readQueryEntries(queryResult) {
    return await this.operateOverQueryRows(queryResult, (queryResult, row) => {
      let rowObject = {};
      return this.operateOverQueryColumns(
        queryResult,
        (queryResult, column) => {
          rowObject[column.name] = row[column.name];
          return rowObject;
        }
      );
    });
  }

  static operateOverQueryRows(queryResult, operation) {
    let promise = new Promise((resolve, reject) => {
      let operationResult = [];
      queryResult[this.rows].forEach(async (row) => {
        operationResult.push(await operation(queryResult, row));
      });

      if (operationResult) {
        resolve(operationResult);
      } else {
        reject("Error: There are no data");
      }
    });

    return promise;
  }

  static operateOverQueryColumns(queryResult, operation) {
    let promise = new Promise((resolve, reject) => {
      let operationResult;
      queryResult[this.columns].forEach((column) => {
        operationResult = operation(queryResult, column);
      });

      if (operationResult) {
        resolve(operationResult);
      } else {
        reject("Error: There are no data");
      }
    });

    return promise;
  }

  static async getInfoFromPivotTables(
    getFromRelatedPivotTableById,
    id,
    ...tables
  ) {
    let queriesResults = {};

    for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
      let table = tables[tableIndex].table;
      let pivotTable = tables[tableIndex].pivotTable;
      let tableFieldName = tables[tableIndex].tableField;
      let values = await this.getInfoThroughPivotTable(
        await getFromRelatedPivotTableById(pivotTable, id),
        async (table, itemId) => this.getFromTableById(table, itemId),
        tableFieldName,
        table
      );

      queriesResults[tableFieldName] = values;
    }

    return queriesResults;
  }

  static async getAllFromTable(table) {
    return await QueryBuilderSingleton.getInstance()
      .select()
      .from(table)
      .build();
  }

  static async getFromTableById(table, id) {
    return await QueryBuilderSingleton.getInstance()
      .select()
      .from(table)
      .where(`id=${id}`)
      .build();
  }

  static async getFromTableWhere(table, column, value) {
    return await QueryBuilderSingleton.getInstance()
      .select()
      .from(table)
      .where(`${column}=${value}`)
      .build();
  }

  static async insertInfoRegistro(data) {
    let id_info_registro = await this.insertIntoTable(
      "info_registro",
      data.info_registro
    );
    let insertIds = this.mapToInsertInfoArrayForPivotTable(
      data.info_registro.id_mes,
      id_info_registro,
      "mes",
      "info_registro"
    );

    this.insertIntoPivotTable("info_registro_mes", insertIds);

    return id_info_registro;
  }

  static mapToInsertInfoArrayForPivotTable(
    insertInfoArray,
    constantInfo,
    schemaTagForVariableInfo,
    schemaTagForConstantInfo
  ) {
    let insertInfo = insertInfoArray.map((info) => {
      let schema = {};
      schema[schemaTagForVariableInfo] = info;
      schema[schemaTagForConstantInfo] = constantInfo;
      return schema;
    });
    console.log("II: ", insertInfo);
    return insertInfo;
  }

  static async insertAccionesComunitarias(data, id_info_registro) {
    data.acciones_comunitarias.id_info_registro = id_info_registro;
    console.log("AC: ", data.acciones_comunitarias);
    let id_acciones_comunitarias = await this.insertIntoTable(
      "acciones_comunitarias",
      data.acciones_comunitarias
    );

    let insertPoblacionIds = this.mapToInsertInfoArrayForPivotTable(
      data.acciones_comunitarias.id_poblacion,
      id_acciones_comunitarias,
      "poblacion",
      "acciones_comunitarias"
    );
    this.insertIntoPivotTable(
      "acciones_comunitarias_poblacion",
      insertPoblacionIds
    );

    let insertTipoActividadIds = this.mapToInsertInfoArrayForPivotTable(
      data.acciones_comunitarias.id_tipo_actividad,
      id_acciones_comunitarias,
      "tipo_actividad",
      "acciones_comunitarias"
    );
    this.insertIntoPivotTable(
      "acciones_comunitarias_tipo_actividad",
      insertTipoActividadIds
    );
  }

  static async insertAccionesDePrevencionEnSalud(data, id_info_registro) {
    data.acciones_prevencion_salud.id_info_registro = id_info_registro;
    console.log("ACPS: ", data.acciones_prevencion_salud);
    let id_acciones_prevencion_salud = await this.insertIntoTable(
      "acciones_prevencion_salud",
      data.acciones_prevencion_salud
    );

    let insertPoblacionIds = this.mapToInsertInfoArrayForPivotTable(
      data.acciones_prevencion_salud.id_poblacion,
      id_acciones_prevencion_salud,
      "poblacion",
      "acciones_prevencion_salud"
    );
    this.insertIntoPivotTable(
      "acciones_prevencion_salud_poblacion",
      insertPoblacionIds
    );

    let insertTipoAccionIds = this.mapToInsertInfoArrayForPivotTable(
      data.acciones_prevencion_salud.id_tipo_accion,
      id_acciones_prevencion_salud,
      "tipo_accion",
      "acciones_prevencion_salud"
    );
    this.insertIntoPivotTable(
      "acciones_prevencion_salud_tipo_accion",
      insertTipoAccionIds
    );
  }

  static async insertCapacitacion(data, id_info_registro) {
    data.capacitacion.id_info_registro = id_info_registro;
    if (data.capacitacion.constancia == true) {
      data.capacitacion.constancia = true;
    } else {
      data.capacitacion.constancia = false;
    }
    console.log("CAP: ", data.capacitacion);
    let id_capacitacion = await this.insertIntoTable(
      "capacitacion",
      data.capacitacion
    );

    let insertPoblacionIds = this.mapToInsertInfoArrayForPivotTable(
      data.capacitacion.id_poblacion,
      id_capacitacion,
      "poblacion",
      "capacitacion"
    );
    this.insertIntoPivotTable("capacitacion_poblacion", insertPoblacionIds);
  }

  static async insertAtencionSalud(data, id_info_registro) {
    data.atencion_salud.id_info_registro = id_info_registro;

    console.log("AS: ", data.atencion_salud);
    await this.insertIntoTable("atencion_salud", data.atencion_salud);
  }
  static async insertPoliticasPublicas(data, id_info_registro) {
    data.politicas_publicas.id_info_registro = id_info_registro;

    console.log("AS: ", data.politicas_publicas);
    await this.insertIntoTable("politicas_publicas", data.politicas_publicas);
  }

  static async insertSuicidio(data, id_info_registro) {
    data.suicidio.id_info_registro = id_info_registro;

    console.log("Sui: ", data.suicidio);
    await this.insertIntoTable("suicidio", data.suicidio);
  }

  static async insertIntoTable(table, data) {
    let columns = await this.getColumnsFromTable(table);
    let insert_info = this.createInsertInfoObject(columns, data);
    let result = await knexInstance(table).insert(insert_info);
    return result[0];
  }

  static async insertIntoPivotTable(table, data) {
    return await knexInstance(table).insert(data);
  }

  static async getColumnsFromTable(table) {
    let query = await QueryBuilderSingleton.getInstance()
      .select()
      .from(table)
      .build();

    let columns = query[this.columns];

    return columns.map((column) => column.name);
  }

  static createInsertInfoObject(columns, data) {
    let insert_info = {};
    for (let columIndex = 0; columIndex < columns.length; columIndex++) {
      let column = columns[columIndex];
      insert_info[column] = this.searchPropInObject(column, data);
      if (insert_info[column] == undefined) {
        delete insert_info[column];
      }
    }
    return insert_info;
  }

  static searchPropInObject(prop, object) {
    let value;
    if (prop in object) {
      value = object[prop];
    }
    return value;
  }
}

class QueryBuilderSingleton {
  constructor() {
    throw new Error("Use QueryBuilderSingleton.getInstance()");
  }
  static getInstance() {
    if (!QueryBuilderSingleton.instance) {
      QueryBuilderSingleton.instance = new QueryBuilder();
    }
    return QueryBuilderSingleton.instance;
  }
}

export default {
  QueryBuilder,
  QueryBuilderSingleton,
};
