// Comment model

/* 
    id
    text
    postId
    userId
*/

const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Comment = sequelize.define('comment',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'active',
        allowNull: false,
    }
});

module.exports = { Comment }