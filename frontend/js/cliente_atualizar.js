if (!localStorage.getItem("token")) location.href = "./logar.html"

const codCliente = document.getElementById("codCliente")
const nome = document.getElementById("nome")
const email = document.getElementById("email")
const cpf = document.getElementById("cpf")
const telefone = document.getElementById("telefone")
const senha = document.getElementById("senha")

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			nome: nome.value,
			email: email.value,
			senha: senha.value,
			cpf: cpf.value,
			telefone: telefone.value
		}

		const resposta = await fetch(`http://localhost:3000/cliente/${codCliente.value}`, {
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
