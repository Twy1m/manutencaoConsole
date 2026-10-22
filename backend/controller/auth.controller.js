const cryptoJs = require("crypto-js")
const Cliente = require('../models/Cliente')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const cliente = await Cliente.findOne({ where: { email: email } })

        if (!cliente || senha !== cryptoJs.AES.decrypt(cliente.senha, "segredo").toString(cryptoJs.enc.Utf8)) {
            return res.status(401).json({ message: "credenciais inválidas" })
        }

        const tempo = 90 * 60 * 1000
        const tempoExpiracao = Date.now() + tempo

        const token = cryptoJs.AES.encrypt(
            JSON.stringify({
                idCliente: cliente.idCliente,
                expiraEm: tempoExpiracao
            }),
            "segredo"
        ).toString()

        res.status(200).json({ token: token })
    } catch (error) {
        res.status(401).json({ message: "erro ao fazer login" })
    }
}

module.exports = { login }