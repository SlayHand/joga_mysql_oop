const pool = require("../utils/db");

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    return this.executeQuery(query);
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const rows = await this.executeQuery(query, [id]);
    return rows[0] || null;
  }

  async findOne(where, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ? LIMIT 1`;
    const rows = await this.executeQuery(query, [value]);
    return rows[0] || null;
  }

  async findMany(where, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
    return this.executeQuery(query, [value]);
  }

  async create(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const result = await this.executeQuery(query, data);
    return result.insertId;
  }

  async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
    const result = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }
}

module.exports = BaseSQLModel;
