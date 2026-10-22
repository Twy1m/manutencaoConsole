const {Cliente, Console, Agendamento} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
        await conn.sync()
        console.log('sincronizando tabelas')
    }catch(err){
        console.error('erro sincronizar tabelas', err)
    }finally{
        await conn.close()
    }
}

syncDataBase()