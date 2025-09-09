const baseSQLModel = require('./base');

class AuthorModel extends baseSQLModel {
  constructor() {
    super('author');
  }

  async findAll() {
    const authors = await super.findAll();
    return authors;
  }

  async findOne(id) {
    const author = await super.findOne('id', id);
    return author;
  }

}

module.exports = AuthorModel;