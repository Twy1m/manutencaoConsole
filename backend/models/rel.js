const Cliente = require('./Cliente')
const Console = require('./Console')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Console, {
    foreignKey: 'idCliente',
    as: 'ConsoleCliente',
    onDelete: 'CASCADE'
})

Console.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'ClienteConsole'
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'AgendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'ClienteAgendamento'
})

Console.hasMany(Agendamento, {
    foreignKey: 'idConsole',
    as: 'AgendamentoConsole',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Console, {
    foreignKey: 'idConsole',
    as: 'ConsoleAgendamento'
})

module.exports = { Cliente, Console, Agendamento }