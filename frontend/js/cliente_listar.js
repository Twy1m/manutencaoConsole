if (!localStorage.getItem("token")) location.href = "./logar.html"

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const resposta = await fetch("http://localhost:3000/clientes", {
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "GET"
		})
		const dados = await resposta.json()

		if (!resposta.ok) return (res.innerText = dados.message)

		res.innerHTML = `
			<table>
				${criarThead()}
				${criarTbody(dados)}
			</table>
		`
	} catch (error) {
		res.innerText = error.message || "Erro ao listar"
	}
})

function criarTbody(dados) {
	let corpo = "<tbody>"
	dados.forEach((el) => {
		corpo += `<tr>`
		corpo += `<td>${el.codCliente}</td>`
		corpo += `<td>${el.nome}</td>`
		corpo += `<td>${el.email}</td>`
		corpo += `<td>${el.telefone}</td>`
		corpo += `</tr>`
	})
	corpo += "</tbody>"
	return corpo
}

function criarThead() {
	return `
		<thead>
			<tr>
				<th>Código</th>
				<th>Nome</th>
				<th>E-mail</th>
				<th>Telefone</th>
			</tr>
		</thead>
	`
}
