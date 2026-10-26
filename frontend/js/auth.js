// Controle de sessão no frontend (token guardado no localStorage)
const PAGINAS_PUBLICAS = ['logar.html', 'cliente_cadastrar.html']
const API = 'http://localhost:3000'

const pagina = window.location.pathname.split('/').pop() || 'index.html'
const dentroDeHtml = window.location.pathname.includes('/html/')
const urlLogin = dentroDeHtml ? './logar.html' : './html/logar.html'

function limparSessao() {
    localStorage.removeItem('token')
    localStorage.removeItem('nomeCliente')
}

async function authFetch(url, opcoes = {}) {
    const token = localStorage.getItem('token')
    const headers = { ...(opcoes.headers || {}) }
    if (token) headers['Authorization'] = token

    const res = await fetch(url, { ...opcoes, headers })

    if (res.status === 401) {
        limparSessao()
        alert('Sessão expirada ou acesso negado. Faça o login novamente.')
        window.location.href = urlLogin
        throw new Error('Não autorizado')
    }
    return res
}

if (!PAGINAS_PUBLICAS.includes(pagina) && !localStorage.getItem('token')) {
    window.location.href = urlLogin
}

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav')
    if (!nav) return

    const token = localStorage.getItem('token')
    const area = document.createElement('div')
    area.className = 'area_usuario'

    if (token) {
        area.innerHTML = `Olá, <b>${escapar(localStorage.getItem('nomeCliente'))}</b>&emsp;<a href="#" id="btn_logout">Sair</a>`
        nav.prepend(area)
        document.getElementById('btn_logout').addEventListener('click', (e) => {
            e.preventDefault()
            limparSessao()
            window.location.href = urlLogin
        })
    }
})
