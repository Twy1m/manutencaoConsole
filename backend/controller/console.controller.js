const Console = require('../models/Console')
const Cliente = require('../models/Cliente')
const CryptoJs = require('crypto-js')

const cadastrar = async (req, res) => {
    const { modelo, marca, numeroSerie, servico, idCliente } = req.body

    if (!modelo || !marca || !numeroSerie || !servico || !idCliente) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {
        // o console precisa estar vinculado a um cliente cadastrado
        const cliente = await Cliente.findByPk(idCliente)
        if (!cliente) return res.status(404).json({ message: 'cliente inexistente' })

        const numeroSerieCripto = CryptoJs.AES.encrypt(numeroSerie, "segredo").toString()

        await Console.create({
            modelo: modelo,
            marca: marca,
            numeroSerie: numeroSerieCripto,
            servico: servico,
            idCliente: idCliente
        })

        return res.status(201).json({ message: 'Console cadastrado com sucesso!' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao cadastrar Console!' })
    }
}

const listar = async (req, res) => {

    try {
        // filtro opcional por cliente: /consoles?idCliente=1
        const where = req.query.idCliente ? { idCliente: req.query.idCliente } : {}

        const consoles = await Console.findAll({
            where: where,
            include: { model: Cliente, as: 'ClienteConsole', attributes: ['codCliente', 'nome'] }
        })

        // numero de série volta descriptografado
        const dados = consoles.map(el => ({
            ...el.toJSON(),
            numeroSerie: CryptoJs.AES.decrypt(el.numeroSerie, "segredo").toString(CryptoJs.enc.Utf8)
        }))

        res.status(200).json(dados)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao listar consoles!' })
    }
}

// consulta por termo (número do console = número de série ou código)
const buscar = async (req, res) => {
    const termo = req.params.termo.toLowerCase()

    try {
        const consoles = await Console.findAll({
            include: { model: Cliente, as: 'ClienteConsole', attributes: ['codCliente', 'nome'] }
        })

        const dados = consoles
            .map(el => ({
                ...el.toJSON(),
                numeroSerie: CryptoJs.AES.decrypt(el.numeroSerie, "segredo").toString(CryptoJs.enc.Utf8)
            }))
            .filter(el => el.numeroSerie.toLowerCase().includes(termo) || String(el.codConsole) === termo)

        if (dados.length === 0) return res.status(404).json({ message: 'console não encontrado' })

        res.status(200).json(dados)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao buscar console!' })
    }
}

module.exports = { cadastrar, listar, buscar }
