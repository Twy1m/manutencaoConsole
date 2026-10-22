const Cliente = require('../models/Cliente')
const CryptoJs = require('crypto-js')

const cadastrar = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {

        const senhaCripto = CryptoJs.AES.encrypt(senha, "senha")
        const cpfCripto = CryptoJs.AES.encrypt(cpf, "senha")

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
        let usuarios = await Cliente.findAll({ attributes: { exclude: ["senha"] } })

        usuarios.forEach(el => {
            el.cpf = CryptoJs.AES.decrypt(el.cpf, "senha").toString(CryptoJs.enc.Utf8)
            usuarios[el] = {
                ...usuarios,
                cpf: el.cpf
            }
        });
        res.status(200).json(usuarios)
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

        cliente.forEach(el => {
            el.cpf = CryptoJs.AES.decrypt(el.cpf, "senha").toString(CryptoJs.enc.Utf8)
            cliente[el] = {
                ...cliente,
                cpf: el.cpf
            }
        });

        res.status(200).json(cliente)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao listar clientes!' })
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

        await cliente.update({ nome, email, senha, cpf, telefone })

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
        return res.status(500).json({ message: "erro ao atualizar cliente" })
    }
}

module.exports = { cadastrar, listar, buscar, atualizar, apagar }