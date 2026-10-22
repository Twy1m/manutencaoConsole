const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
const controller = require('./controller/geral.controller')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API PixelFix Rodando!' })
})

app.post('/cliente', controller.cadastrarCliente)

app.use(controller.authMiddleware)

app.post('/console', controller.cadastrarConsole)
app.get('/clientes', controller.listarClientes)
app.post('/agendamento', controller.cadastrarAgendamento)

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })