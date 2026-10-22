const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        tipoServico: document.getElementById('tipoServico').value
    }

    fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar agendamento:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})