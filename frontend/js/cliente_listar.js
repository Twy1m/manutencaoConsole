const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/clientes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao listar os dados:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codCliente || el.id}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.email}</td>`
        corpo += `<td>${el.cpf}</td>`
        corpo += `<td>${el.endereco}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Endereço</th>
            </tr>
        </thead>
    `
}