"use strict";
import bcrypt from 'bcrypt'
import * as QBuilder from "../../query.js";
let QueryBuilderSingleton = QBuilder.default.QueryBuilderSingleton;
let QueryBuilder = QBuilder.default.QueryBuilder;
class Model {
  constructor(query = QueryBuilderSingleton.getInstance(), options = {}) {
    this.query = query;
    this.options = options;
  }

  async fetchUsuarios(){
    let fetchedUserInfoList = await this.fetchFromTable("a_usuarios");
    let fetchedPrivilegiosInfoList = await this.fetchFromTable("privilegios_usuario");

    for (let usuario of fetchedUserInfoList) {
      delete usuario.password
      delete usuario.integridad
      for (let privilegio of fetchedPrivilegiosInfoList) {
        if (usuario.privilegios == privilegio.id) {
          usuario.privilegios = privilegio
        }
      }
    }

    return fetchedUserInfoList;
  }

  async insertUser(data){
    const passHash = await bcrypt.hash(data.password, 10)
    const integrityHash = await bcrypt.hash(`${data.nombre_publico}${data.nombre_usuario}${passHash}`, 10)
    data['integridad'] = integrityHash
    data.password = passHash
    QueryBuilder.insertIntoTable('a_usuarios', data)
  }

  async fetchFromTable(table) {
    return await QueryBuilder.getQueryEntries(
      QueryBuilder.getAllFromTable(table),
      true
    );
  }
}

export default Model;
