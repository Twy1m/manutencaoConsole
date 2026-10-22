const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value
    }

    fetch('http://localhost:3000/console', {
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
        console.error('Erro ao cadastrar console:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})