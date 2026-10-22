const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Console = db.define('console', {
    codConsole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroSerie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }
}, {
    timestamps: false,
    tableName: 'consoles'
})

module.exports = Console