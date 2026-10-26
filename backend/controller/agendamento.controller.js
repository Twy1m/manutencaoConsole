const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Console = require('../models/Console')

const cadastrar = async (req, res) => {
    const { data, hora, idCliente, idConsole } = req.body

    if (!data || !hora || !idCliente || !idConsole) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {
        const cliente = await Cliente.findByPk(idCliente)
        const console = await Console.findByPk(idConsole)

        if (!cliente) return res.status(404).json({ message: 'cliente inexistente' })
        if (!console) return res.status(404).json({ message: 'console inexistente' })

        // o console precisa ser do cliente
        if (console.idCliente != idCliente) {
            return res.status(400).json({ message: 'esse console não pertence ao cliente' })
        }

        if (await Agendamento.findOne({ where: { data: data, hora: hora } })) {
            return res.status(409).json({ message: 'data e horário já marcados' })
        }

        await Agendamento.create({ data, hora, idCliente, idConsole })

        return res.status(201).json({ message: 'Agendamento cadastrado com sucesso!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao cadastrar agendamento!' })
    }
}

const listar = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            include: [
                { model: Cliente, as: 'ClienteAgendamento', attributes: ['codCliente', 'nome'] },
                { model: Console, as: 'ConsoleAgendamento', attributes: ['codConsole', 'modelo', 'marca', 'servico'] }
            ],
            order: [
                ['data', 'ASC'],
                ['hora', 'ASC']
            ]
        })
        return res.status(200).json(agendamentos)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao listar agendamentos!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const { data, hora, idCliente, idConsole } = req.body

    if (!data || !hora || !idCliente || !idConsole) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {
        const agendamento = await Agendamento.findByPk(id)
        if (!agendamento) return res.status(404).json({ message: 'agendamento não encontrado' })

        const cliente = await Cliente.findByPk(idCliente)
        const console = await Console.findByPk(idConsole)

        if (!cliente) return res.status(404).json({ message: 'cliente inexistente' })
        if (!console) return res.status(404).json({ message: 'console inexistente' })

        if (console.idCliente != idCliente) {
            return res.status(400).json({ message: 'esse console não pertence ao cliente' })
        }

        if (await Agendamento.findOne({ where: { data: data, hora: hora } })) {
            return res.status(409).json({ message: 'data e horário já marcados' })
        }

        await agendamento.update({ data, hora, idCliente, idConsole })

        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao atualizar agendamento!' })
    }
}

module.exports = { cadastrar, listar, atualizar }
