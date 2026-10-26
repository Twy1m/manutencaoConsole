if (!localStorage.getItem("token")) location.href = "./logar.html"

const codAgendamento = document.getElementById("codAgendamento")
const data = document.getElementById("data")
const hora = document.getElementById("hora")
const idCliente = document.getElementById("idCliente")
const idConsole = document.getElementById("idConsole")

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			data: data.value,
			hora: hora.value,
			idCliente: idCliente.value,
			idConsole: idConsole.value
		}

		const resposta = await fetch(`http://localhost:3000/agendamento/${codAgendamento.value}`, {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "PUT"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) event.target.reset()
	} catch (error) {
		res.innerText = error.message || "Erro ao atualizar"
	}
})
