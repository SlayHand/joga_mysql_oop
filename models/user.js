const baseSQLModel = require('./base');

class userDBModel extends baseSQLModel {
    constructor(){
        super('users');
    }
}

module.exports = userDBModel;