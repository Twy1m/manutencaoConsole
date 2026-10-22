const Console = require('../models/Console')
const CryptoJs = require('crypto-js')

const cadastrar = async (req, res) => {
    const { modelo, marca, numeroSerie, servico, idUsuario } = req.body

    if (!modelo || !marca  || !numeroSerie || !servico || !idUsuario) {
        return res.status(400).json({ message: 'insira todos os campos' })
    }

    try {

        const numeroSerieCripto = CryptoJs.AES.encrypt(numeroSerie, "senha")

        await Cliente.create({
            modelo: modelo,
            marca: marca,
            numeroSerie: numeroSerieCripto,
            servico: servico,
            idUsuario: idUsuario
        })

        return res.status(201).json({ message: 'Console cadastrado com sucesso!' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao cadastrar Console!' })
    }
}

const listar = async (req, res) => {
    
    try {
        let consoles = await Console.findAll()

        consoles.forEach(el => {
            el.numeroSerie = CryptoJs.AES.decrypt(el.numeroSerie, "senha").toString(CryptoJs.enc.Utf8)
            consoles[el] = {
                ...consoles,
                numeroSerie: el.numeroSerie
            }
        });
        res.status(200).json(consoles)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao listar consoles!' })
    }
}

module.exports = { cadastrar, listar }