const nome = document.getElementById("nome")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const cpf = document.getElementById("cpf")
const telefone = document.getElementById("telefone")

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

		const resposta = await fetch("http://localhost:3000/cliente", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) event.target.reset()
	} catch (error) {
		res.innerText = error.message || "Erro ao cadastrar"
	}
})
