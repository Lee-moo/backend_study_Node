const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
console.log(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
console.log(db.sequelize);
console.log(db.Sequelize);
console.log(db.User);
console.log(db.Comment);


User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
