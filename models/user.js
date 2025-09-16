const baseSQLModel = require('./base');

class userDBModel extends baseSQLModel {
    constructor(){
        super('users');
    }
    async findByUsername(username){
    const rows = await this.executeQuery(
        `SELECT * FROM ${this.tableName} WHERE username = ? LIMIT 1`,
        [username]
    );
    return rows[0] || null;
    }
}

module.exports = userDBModel;