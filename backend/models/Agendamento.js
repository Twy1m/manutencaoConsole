const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Agendamento = db.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },
    idConsole: {
        type: DataTypes.INTEGER,
        references: {
            model: 'consoles',
            key: 'codConsole'
        }
    }
}, {
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento