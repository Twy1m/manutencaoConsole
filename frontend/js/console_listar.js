if (!localStorage.getItem("token")) location.href = "./logar.html"

const termo = document.getElementById("termo")
const btn_listar = document.getElementById("btn_listar")
const btn_buscar = document.getElementById("btn_buscar")

const res = document.getElementById("resposta")

async function buscarConsoles(url) {
	try {
		const resposta = await fetch(url, {
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
}

btn_listar.addEventListener("click", (event) => {
	event.preventDefault()
	buscarConsoles("http://localhost:3000/consoles")
})

// consulta por termo (número do console)
btn_buscar.addEventListener("click", (event) => {
	event.preventDefault()
	if (!termo.value) return (res.innerText = "Informe o número do console")
	buscarConsoles(`http://localhost:3000/console/buscar/${termo.value}`)
})

function criarTbody(dados) {
	let corpo = "<tbody>"
	dados.forEach((el) => {
		corpo += `<tr>`
		corpo += `<td>${el.codConsole}</td>`
		corpo += `<td>${el.modelo}</td>`
		corpo += `<td>${el.marca}</td>`
		corpo += `<td>${el.numeroSerie}</td>`
		corpo += `<td>${el.servico}</td>`
		corpo += `<td>${el.ClienteConsole ? el.ClienteConsole.nome : ""}</td>`
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
				<th>Modelo</th>
				<th>Marca</th>
				<th>Nº de Série</th>
				<th>Serviço</th>
				<th>Cliente</th>
			</tr>
		</thead>
	`
}
