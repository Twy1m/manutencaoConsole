const cryptoJs = require("crypto-js")

const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"]

    if (!token) {
        return res.status(401).json({ message: "usuário não autenticado" })
    }

    try {
        const bytes = cryptoJs.AES.decrypt(token, "segredo").toString(cryptoJs.enc.Utf8)

        if (!bytes) return res.status(401).json({ message: "token inválido" })

        const tokenDescriptografado = JSON.parse(bytes)

        if (!tokenDescriptografado) return res.status(401).json({ message: "usuário não autenticado" })
        if (tokenDescriptografado.expiraEm < Date.now()) return res.status(401).json({ message: "sessão expirada" })

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "erro ao autenticar" })
    }
}

module.exports = authMiddleware