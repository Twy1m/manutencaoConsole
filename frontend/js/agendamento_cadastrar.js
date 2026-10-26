if (!localStorage.getItem("token")) location.href = "./logar.html"

const idCliente = document.getElementById("idCliente")
const idConsole = document.getElementById("idConsole")
const data = document.getElementById("data")
const hora = document.getElementById("hora")

const res = document.getElementById("resposta")

;(async () => {
	try {
		const resposta = await fetch("http://localhost:3000/clientes", {
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "GET"
		})
		const dados = await resposta.json()

		if (!resposta.ok) return (res.innerText = dados.message)

		dados.forEach((el) => {
			idCliente.innerHTML += `<option value="${el.codCliente}">${el.codCliente} - ${el.nome}</option>`
		})
	} catch (error) {
		res.innerText = error.message || "Erro ao carregar clientes"
	}
})()

idCliente.addEventListener("change", async () => {
	idConsole.innerHTML = '<option value="">Selecione o console</option>'
	if (!idCliente.value) return

	try {
		const resposta = await fetch(`http://localhost:3000/consoles?idCliente=${idCliente.value}`, {
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "GET"
		})
		const dados = await resposta.json()

		if (!resposta.ok) return (res.innerText = dados.message)

		dados.forEach((el) => {
			idConsole.innerHTML += `<option value="${el.codConsole}">${el.codConsole} - ${el.modelo} (${el.servico})</option>`
		})
	} catch (error) {
		res.innerText = error.message || "Erro ao carregar consoles"
	}
})

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			data: data.value,
			hora: hora.value,
			idCliente: idCliente.value,
			idConsole: idConsole.value
		}

		// rota protegida
		const resposta = await fetch("http://localhost:3000/agendamento", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "POST"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) event.target.reset()
	} catch (error) {
		res.innerText = error.message || "Erro ao cadastrar"
	}
})
