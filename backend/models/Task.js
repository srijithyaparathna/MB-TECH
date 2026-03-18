const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});


Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

module.exports = Task;