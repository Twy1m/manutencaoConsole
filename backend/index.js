const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')
const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const clienteController = require('./controller/cliente.controller')
const consoleController = require('./controller/console.controller')
const agendamentoController = require('./controller/agendamento.controller')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API PixelFix Rodando!' })
})

// rotas públicas
app.post('/login', authController.login)
app.post('/cliente', clienteController.cadastrar)

// rotas privadas
app.use(authMiddleware)

app.get('/clientes', clienteController.listar)
app.get('/cliente/:id', clienteController.buscar)
app.put('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.apagar)

app.post('/console', consoleController.cadastrar)
app.get('/consoles', consoleController.listar)
app.get('/console/buscar/:termo', consoleController.buscar)

app.post('/agendamento', agendamentoController.cadastrar)
app.get('/agendamentos', agendamentoController.listar)
app.put('/agendamento/:id', agendamentoController.atualizar)

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })