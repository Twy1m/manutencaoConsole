if (!localStorage.getItem("token")) location.href = "./logar.html"

const codCliente = document.getElementById("codCliente")

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const resposta = await fetch(`http://localhost:3000/cliente/${codCliente.value}`, {
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "DELETE"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) event.target.reset()
	} catch (error) {
		res.innerText = error.message || "Erro ao apagar"
	}
})
