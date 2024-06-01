/////////////////////////////////
// primeiro
let nunior
let res = document.getElementById('res')
let lista = document.querySelector('.lista')
let numeros = getLocalStorage() || []
let estado = null

// inputs
let ddd = document.forms['primeiro'].ddd
let nome = document.forms['primeiro'].nome
let descricao = document.forms['primeiro'].descricao
let numero = document.forms['primeiro'].numero

// buscar da LocalStorage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem('numeros'))
}

// setar na LocalStorage
function setLocalStorage() {
    localStorage.setItem('numeros', JSON.stringify(numeros))
}

// evento no input de ddd para filtar se existe um determinado ddd 
ddd.addEventListener('input', () => {
    estado = ''
    const estadoSelect = estados.filter(estado => estado.ddds.includes(Number(ddd.value)));
    console.log(estadoSelect)
    if (estadoSelect[0]) {
        estado = estadoSelect[0]
        res.innerHTML = `<p>${estadoSelect[0].nome}</p>`

    } else {
        estado = { sigla: 'Indefinido' }
        res.innerText = ''
    }

})

// função que envia os dados pra salvar no array
function send() {

    if (!ddd.value || !nome.value || !numero.value) return res.innerText = 'Preencha todos os campos'

    //--push
    numeros.push({
        sigla: estado.sigla,
        ddd: ddd.value,
        numero: numero.value,
        descricao: descricao.value,
        numeroCompleto: `${ddd.value}${numero.value}`,
        nome: nome.value,
        status: 'Ativo'
    })
    //--zerando os imputs
    ddd.value = ''
    nome.value = ''
    numero.value = ''

    res.innerText = 'Adicionado'
    setTimeout(() => res.innerText = '', 2000)
    setLocalStorage()
    Lista()
}

// função que lista os contatos 
function Lista() {
    let contagem = document.getElementById('contagem')

    numeros.length == 0 ? contagem.innerText = '' : contagem.innerText = numeros.length
    list = ''

    lista.innerHTML = ''
    numeros.forEach((item, index) => {
        list += `
        <div onclick="selected(${index})" class="contato">
                <img src="./assets/images/icon.png">
                <div>
                    <div>
                        <div>${item.nome}</div>
                        <div>${item.ddd} ${item.numero}</div>
                    </div>
                </div>
        </div>
        `
        lista.innerHTML = list
    })

}

// preventDefault no primeiro form
document.getElementById('primeiro').addEventListener('submit', (e) => {
    e.preventDefault()
})


///////////////////////////////////////////
//////////////////////////////////////////
//----------Segundo----------------------

// inputs
let hidden = document.forms['segundo'].hidden
let dddUp = document.forms['segundo'].ddd
let nomeUp = document.forms['segundo'].nome
let numeroUp = document.forms['segundo'].numero

let resUp = document.getElementById('resUp')
let btnUp = document.getElementById('btnUp')
let btns = document.getElementById('btns')
let info = document.getElementById('info')
let siglaUp

// função que seleciona o contato
function selected(e) {
    if (numeros.length > 0) {

        hidden.value = e
        nomeUp.value = numeros[e].nome
        dddUp.value = numeros[e].ddd
        numeroUp.value = numeros[e].numero
        resUp.innerText = ''
        let status

        siglaUp = numeros[e].sigla

        if (numeros[e].status == 'Ativo') {
            status = 'Bloquear'
        } else {
            status = 'Desbloquear'
        }

        btns.innerHTML = `
        <button onclick="status()">${status}</button>
        <button onclick="deletar()">Excluir</button>
        `

        info.innerHTML = `
        <p>Estado: ${numeros[e].sigla}</p>
        <p>Status: ${numeros[e].status}</p>
        `

        InputsDisabled(false)

    }
}

// evento que input do ddd do update
dddUp.addEventListener('input', () => {
    selecionarEstado()
})

// função para filtar se existe um determinado ddd do update
function selecionarEstado() {
    siglaUp = ''
    const estadoSelect = estados.filter(estado => estado.ddds.includes(Number(dddUp.value)));
    console.log(estadoSelect)
    if (estadoSelect[0]) {
        siglaUp = estadoSelect[0].sigla
        resUp.innerHTML = `<p>${estadoSelect[0].nome}</p>`
    } else {
        siglaUp = 'Indefinido'
        resUp.innerText = ''
    }
}

// função de update
function update() {

    if (!dddUp.value || !nomeUp.value || !numeroUp.value) return resUp.innerText = 'Preencha todos os campos'

    let index = hidden.value
    if (!index) return console.log('Sem id')
    numeros[index].ddd = dddUp.value
    numeros[index].nome = nomeUp.value
    numeros[index].numero = numeroUp.value
    numeros[index].sigla = siglaUp // estadoUp.sigla

    resUp.innerText = 'Atualizado'
    info.innerHTML = `
    <p>Sigla: ${numeros[index].sigla}</p>
    <p>Status: ${numeros[index].status}</p>
    `

    setTimeout(() => resUp.innerText = '', 2000)
    setLocalStorage()
    Lista()
}

// função que bloqueia ou desbloqueia um contato
function status() {
    console.log('status')

    if (numeros[hidden.value].status == 'Ativo') {
        numeros[hidden.value].status = 'Bloqueado'
        selected(hidden.value)
        setLocalStorage()
        return
    }

    if (numeros[hidden.value].status == 'Bloqueado') {
        numeros[hidden.value].status = 'Ativo'
        selected(hidden.value)
        setLocalStorage()
    }

}

// função que deleta o contato
function deletar() {
    if (hidden.value) {
        
        let resposta = confirm("Apagar contato")
        if(!resposta) return

        numeros.splice(hidden.value, 1)

        InputsDisabled(true)
        dddUp.value = ''
        nomeUp.value = ''
        numeroUp.value = ''
        hidden.value = ''

        resUp.innerHTML = 'Deletado'
        setTimeout(() => resUp.innerText = '', 2000)
        btns.innerHTML = ''
        info.innerHTML = ''
        setLocalStorage()
        Lista()
    }

}

// função que abilita ou desabilita os inputs e botão
function InputsDisabled(value) {
    nomeUp.disabled = value
    dddUp.disabled = value
    numeroUp.disabled = value
    btnUp.disabled = value
}

// preventDefault no segundo form
document.getElementById('segundo').addEventListener('submit', (e) => {
    e.preventDefault()
})


///////////////////////////////////////////
//////////////////////////////////////////
//---------terceiro----------------------

let numerosFiltrado
let lista3 = document.querySelector('.lista3')
let list = ''

// Evento de input para filtrar por Nome
document.getElementById('nomeF').addEventListener('input', (e) => {
    list = ''

    let result = numeros.filter(numero => numero.nome.toLowerCase().includes(e.target.value.toLowerCase()))

    numerosFiltrado = result
    if (result.length == 0) return lista3.innerHTML = ''

    result.forEach((item, index) => {
        list += `
        <div onclick="selectedFilter(${index})" class="contato">
                <img src="./assets/images/icon.png">
                <div>
                    <div>
                        <div>${item.nome}</div>
                        <div>${item.ddd} ${item.numero}</div>
                    </div>
                        <button"></button>
                </div>
        </div>
        `

        lista3.innerHTML = list
    })
})

// Evento de input para filtar por DDD
document.getElementById('dddF').addEventListener('input', (e) => {
    list = ''

    let result = numeros.filter(numero => numero.ddd.includes(e.target.value))

    numerosFiltrado = result
    if (result.length == 0) return lista3.innerHTML = ''

    result.forEach((item, index) => {
        list += `
        <div onclick="selectedFilter(${index})" class="contato">
                <img src="./assets/images/icon.png">
                <div>
                    <div>
                        <div>${item.nome}</div>
                        <div>${item.ddd} ${item.numero}</div>
                    </div>
                        <button"></button>
                </div>
        </div>
        `
        lista3.innerHTML = list
    })
})

// Evento de input para filtar por  Numero
document.getElementById('numeroF').addEventListener('input', (e) => {
    list = ''

    let result = numeros.filter(numero => numero.numeroCompleto.includes(e.target.value))

    numerosFiltrado = result
    if (result.length == 0) return lista3.innerHTML = ''

    result.forEach((item, index) => {
        list += `
        <div onclick="selectedFilter(${index})" class="contato">
                <img src="./assets/images/icon.png">
                <div>
                    <div>
                        <div>${item.nome}</div>
                        <div>${item.ddd} ${item.numero}</div>
                    </div>
                        <button"></button>
                </div>
        </div>
        `

        lista3.innerHTML = list
    })
})

// selecionar item filtrado
function selectedFilter(e) {
    numeros.forEach((item, index) => {
        if (item.nome == numerosFiltrado[e].nome) {
            console.log('index', index)
            selected(index)
        }
    })
    console.log('Selecionado', numerosFiltrado[e])
}

// preventDefault no terceiro form
document.getElementById('terceiro').addEventListener('submit', (e) => {
    e.preventDefault()
})

// inicio
Lista()