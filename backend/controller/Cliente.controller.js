const Cliente = require('../models/Cliente')
const CryptoJs = require('crypto-js')

const cadastrar = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {
        // cliente duplicado
        if (await Cliente.findOne({ where: { email: email } })) {
            return res.status(409).json({ message: 'já existe um cliente com esse e-mail' })
        }

        const senhaCripto = CryptoJs.AES.encrypt(senha, "segredo").toString()
        const cpfCripto = CryptoJs.AES.encrypt(cpf, "segredo").toString()

        await Cliente.create({
            nome: nome,
            email: email,
            senha: senhaCripto,
            cpf: cpfCripto,
            telefone: telefone
        })

        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const listar = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ attributes: { exclude: ["senha", "cpf"] } })

        res.status(200).json(clientes)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao listar clientes!' })
    }
}

const buscar = async (req, res) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ message: 'preenha todos os campos' })

    try {
        const cliente = await Cliente.findByPk(id, { attributes: { exclude: ["senha"] } })

        if (!cliente) {
            return res.status(404).json({ message: 'usuario não encontrado' })
        }

        // o cpf volta descriptografado
        cliente.cpf = CryptoJs.AES.decrypt(cliente.cpf, "segredo").toString(CryptoJs.enc.Utf8)

        res.status(200).json(cliente)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao buscar cliente!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const { nome, email, senha, cpf, telefone } = req.body

    if (!id) return res.status(400).json({ message: "id nescessário para consulta" })

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {

        const cliente = await Cliente.findByPk(id)
        if (!cliente) return res.status(404).json({ message: "usuário não encontrado" })

        const senhaCripto = CryptoJs.AES.encrypt(senha, "segredo").toString()
        const cpfCripto = CryptoJs.AES.encrypt(cpf, "segredo").toString()

        await cliente.update({ nome, email, senha: senhaCripto, cpf: cpfCripto, telefone })

        return res.status(200).json({ message: "usuário atualizado com sucesso" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "erro ao atualizar cliente" })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ message: "id nescessário para consulta" })

    try {

        const cliente = await Cliente.findByPk(id)
        if (!cliente) return res.status(404).json({ message: "usuário não encontrado" })

        await cliente.destroy()

        return res.status(200).json({ message: "usuário apagado com sucesso" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "erro ao apagar cliente" })
    }
}

module.exports = { cadastrar, listar, buscar, atualizar, apagar }
