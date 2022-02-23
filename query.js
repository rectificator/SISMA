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

  static async getQueryEntries(
    getForeingKeyRelatedTableAsyncFunction,
    list = false,
    ...requestedColumns
  ) {
    let result;
    let foreingKeyRelatedTable = await getForeingKeyRelatedTableAsyncFunction;
    foreingKeyRelatedTable = await QueryBuilder.readQueryEntries(
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
        result = foreingKeyRelatedTable[QueryBuilder.rows];
      } else if (requestedColumns.length == 1) {
        result = foreingKeyRelatedTable[QueryBuilder.rows][requestedColumns[0]];
      } else {
        result = {};
        for (
          let columnIndex = 0;
          columnIndex < requestedColumns.length;
          columnIndex++
        ) {
          let column = requestedColumns[columnIndex];
          result[column] = foreingKeyRelatedTable[QueryBuilder.rows][column];
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
    pivotTable = await QueryBuilder.readQueryEntries(pivotTable);

    for (let rowIndex = 0; rowIndex < pivotTable.length; rowIndex++) {
      let row = pivotTable[rowIndex];
      let linkedTable = await getLinkedTableAsyncFunction(
        linkedTableName,
        row[linkedTableName]
      );
      linkedTable = await QueryBuilder.readQueryEntries(linkedTable);

      values.push(linkedTable[QueryBuilder.rows][linkedTableFieldName]);
    }

    return values;
  }

  static async readQueryEntries(queryResult) {
    return await QueryBuilder.operateOverQueryRows(
      queryResult,
      (queryResult, row) => {
        let rowObject = {};
        return QueryBuilder.operateOverQueryColumns(
          queryResult,
          (queryResult, column) => {
            rowObject[column.name] = row[column.name];
            return rowObject;
          }
        );
      }
    );
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
      let values = await QueryBuilder.getInfoThroughPivotTable(
        await getFromRelatedPivotTableById(pivotTable, id),
        async (table, itemId) => QueryBuilder.getFromTableById(table, itemId),
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

  static async getFromTableWhere(table, column, id) {
    return await QueryBuilderSingleton.getInstance()
      .select()
      .from(table)
      .where(`${column}=${id}`)
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

    this.insertIntoTable("acciones_comunitarias_poblacion", {
      poblacion: data.acciones_comunitarias.id_poblacion,
      acciones_comunitarias: id_acciones_comunitarias,
    });

    this.insertIntoTable("acciones_comunitarias_tipo_actividad", {
      tipo_actividad: data.acciones_comunitarias.id_tipo_actividad,
      acciones_comunitarias: id_acciones_comunitarias,
    });
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
