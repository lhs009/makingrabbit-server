'use strict';

const Sequelize = require('sequelize');
const { dbConfig } = require('../common/config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.dbusername,
  dbConfig.password,
  dbConfig
);

const db = {};

db.Administrator = require('./administrator')(sequelize, Sequelize);
db.Company = require('./company')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.UserApp = require('./userApp')(sequelize, Sequelize);
db.ApiResource = require('./apiResource')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
