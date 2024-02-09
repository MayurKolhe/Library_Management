const Sequalize = require("sequelize");

const sequalize = require('../util/db');



const User = sequalize.define("user", {
    id: {
        type: Sequalize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequalize.STRING,
});

module.exports = User;