if (!localStorage.getItem("token")) location.href = "./logar.html"

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		// rota protegida (o backend já devolve ordenado pela data)
		const resposta = await fetch("http://localhost:3000/agendamentos", {
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
		const cons = el.ConsoleAgendamento
		corpo += `<tr>`
		corpo += `<td>${el.codAgendamento}</td>`
		corpo += `<td>${el.data.split("-").reverse().join("/")}</td>`
		corpo += `<td>${el.hora.slice(0, 5)}</td>`
		corpo += `<td>${el.ClienteAgendamento ? el.ClienteAgendamento.nome : ""}</td>`
		corpo += `<td>${cons ? cons.marca + " " + cons.modelo : ""}</td>`
		corpo += `<td>${cons ? cons.servico : ""}</td>`
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
				<th>Data</th>
				<th>Hora</th>
				<th>Cliente</th>
				<th>Console</th>
				<th>Serviço</th>
			</tr>
		</thead>
	`
}
