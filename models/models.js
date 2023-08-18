const sequelize = require("../db.js");
const {DataTypes} = require("sequelize");

const Message = sequelize.define("message", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    messageText: { type: DataTypes.STRING },
    tagList: { type: DataTypes.STRING },
});

module.exports = Message;