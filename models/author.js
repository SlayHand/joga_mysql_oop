const baseSQLModel = require('./base');

class AuthorModel extends baseSQLModel {
  constructor() {
    super('author');
  }

  async findAll() {
    const authors = await super.findAll();
    return authors;
  }

  async findById(id) {
    const author = await super.findById(id);
    return author;
  }

}

module.exports = AuthorModel;