if (!localStorage.getItem("token")) location.href = "./logar.html"

const idCliente = document.getElementById("idCliente")
const modelo = document.getElementById("modelo")
const marca = document.getElementById("marca")
const numeroSerie = document.getElementById("numeroSerie")
const servico = document.getElementById("servico")

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

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			modelo: modelo.value,
			marca: marca.value,
			numeroSerie: numeroSerie.value,
			servico: servico.value,
			idCliente: idCliente.value
		}

		// rota protegida
		const resposta = await fetch("http://localhost:3000/console", {
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
