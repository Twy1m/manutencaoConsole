const email = document.getElementById("email")
const senha = document.getElementById("senha")

const res = document.getElementById("resposta")

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			email: email.value,
			senha: senha.value
		}

		const resposta = await fetch("http://localhost:3000/login", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" },
			method: "POST"
		})
		const dados = await resposta.json()

		res.innerText = dados.message
		if (resposta.ok) {
			localStorage.setItem("token", dados.token)
			localStorage.setItem("nome", dados.nome)
			res.innerText = "Logado com sucesso"
			setTimeout(() => {
				location.href = "../index.html"
			}, 1000)
		}
	} catch (error) {
		res.innerText = error.message || "Erro ao logar"
	}
})
