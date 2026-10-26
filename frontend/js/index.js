const boasVindas = document.getElementById("boas_vindas")

if (!localStorage.getItem("token")) location.href = "./html/logar.html"

boasVindas.innerText = `Olá, ${localStorage.getItem("nome")}! Cliente logado.`

document.getElementById("btn_logout").addEventListener("click", () => {
	localStorage.clear()
	location.href = "./html/logar.html"
})
