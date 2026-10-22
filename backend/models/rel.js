const Cliente = require('./Cliente')
const Console = require('./Console')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Console, {
    foreignKey: 'idCliente',
    as: 'ConsoleCliente'
})

Console.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'ClienteConsole'
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'AgendamentoCliente'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'ClienteAgendamento'
})

Console.hasMany(Agendamento, {
    foreignKey: 'idConsole',
    as: 'AgendamentoConsole'
})

Agendamento.belongsTo(Console, {
    foreignKey: 'idConsole',
    as: 'ConsoleAgendamento'
})

module.expost = { Cliente, Console, Agendamento }