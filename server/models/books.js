const Sequalize = require("sequelize");
const sequalize = require("../util/db");

const Books = sequalize.define("books", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: Sequalize.DATE,
  bookname: Sequalize.STRING,
  return: Sequalize.DATE,
  fine: Sequalize.STRING,
  status: Sequalize.STRING,
});

module.exports = Books;
