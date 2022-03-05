const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    chat_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'chat'  
  }
);



module.exports = Chat;