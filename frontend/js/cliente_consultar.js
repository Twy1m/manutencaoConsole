if (!localStorage.getItem("token")) location.href = "./logar.html"

const codCliente = document.getElementById("codCliente")

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const resposta = await fetch(`http://localhost:3000/cliente/${codCliente.value}`, {
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "GET"
		})
		const dados = await resposta.json()

		if (!resposta.ok) return (res.innerText = dados.message)

		res.innerHTML = `
			<table>
				<thead>
					<tr>
						<th>Código</th>
						<th>Nome</th>
						<th>E-mail</th>
						<th>CPF</th>
						<th>Telefone</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${dados.codCliente}</td>
						<td>${dados.nome}</td>
						<td>${dados.email}</td>
						<td>${dados.cpf}</td>
						<td>${dados.telefone}</td>
					</tr>
				</tbody>
			</table>
		`
	} catch (error) {
		res.innerText = error.message || "Erro ao consultar"
	}
})
