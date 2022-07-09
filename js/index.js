// LER TIMES
let tabelaTimes = document.querySelector('.tabelaTimes tbody')
// console.log(tabelaTimes)

const lerTimes = () => {
    // console.log("Ler times")
    fetch('times.json')
    .then( resposta => resposta.json() )
    .then( dados => dados.forEach((time, indice) => {
        // console.log(time)
        // criando uma nova linha
        let linha = document.createElement('tr')
        tabelaTimes.appendChild(linha)

        // selecionar todas as linha do tbody
        let linhas = document.querySelectorAll('tbody tr')
        // console.log(linhas)

        linhas[indice].innerHTML = `
        <tr>
            <td>
                <img class='logoP' src='./images/logos/${time.icone}' />
            </td>
            <td>${time.sigla}</td>
            <td>${time.nome_completo}</td>
            <td>${time.escalacao.topo}</td>
            <td>${time.escalacao.selva}</td>
            <td>${time.escalacao.meio}</td>
            <td>${time.escalacao.atirador}</td>
            <td>${time.escalacao.suporte}</td> 
        </tr>
        `
    }))
}

lerTimes()

// LER JOGOS

let secaoJogos = document.querySelector('.secaoJogos')

const lerJogos = () => {
    // console.log('LER JOGOS')
    fetch('jogos.json')
    .then( resposta => resposta.json() )
    .then( dados => dados.forEach((jogo, indice, jogos) => {
        // console.log(jogo)

        // criar a estrutura de divisoria
        let card = document.createElement('div')
        secaoJogos.appendChild(card)
        // console.log(card)

        // selecionar todos os cards
        let cards = document.querySelectorAll('.secaoJogos div')
        // console.log(cards)

        // preencher os dados
        cards[indice].innerHTML = `
            <h3>Semana ${jogo.semana} | Rodada ${jogo.rodada}</h3>
            <h2>${jogo.dia} ${jogo.data}</h2>
            ${gerarJogos(jogo)}
        `
    }))
}

// funcao para gerar imagens dos times
function gerarJogos(jogo) {
    let jogo1 = jogo.jogos[0].split(' ')
    let jogo2 = jogo.jogos[1].split(' ')
    let jogo3 = jogo.jogos[2].split(' ')
    let jogo4 = jogo.jogos[3].split(' ')
    let jogo5 = jogo.jogos[4].split(' ')

    // console.log(jogo1)
    // esta dentro da div dentro da .secaoJogos*
    return this.innerHTML = `
    <figure class='primeiraLinha'>
        <span>13h</span>
        <img class='logoJogos' src='./images/logos/${jogo1[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo1[2].toLowerCase()}.png' />
    </figure>

    <figure>
        <span>14h</span>
        <img class='logoJogos' src='./images/logos/${jogo2[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo2[2].toLowerCase()}.png' />
    </figure>
        
    <figure>
        <span>15h</span>
        <img class='logoJogos' src='./images/logos/${jogo3[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo3[2].toLowerCase()}.png' />
    </figure>

    <figure>
        <span>16h</span>
        <img class='logoJogos' src='./images/logos/${jogo4[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo4[2].toLowerCase()}.png' />
    </figure>

    <figure>
        <span>17h</span>
        <img class='logoJogos' src='./images/logos/${jogo5[0].toLowerCase()}.png' />
            VS
        <img class='logoJogos' src='./images/logos/${jogo5[2].toLowerCase()}.png' />
    </figure>
    `
}

lerJogos()

// FILTRO
let secaoJogo = document.querySelector('.secaoJogo')
let filtro = []

const lerJogosDoDia = (data) => {
    console.log('LER JOGOS DO DIA')
    fetch('jogos.json')
    .then( resposta => resposta.json() )
    .then( dados => dados.map((jogo, indice, jogos) => {
        // console.log(jogos)

        // filtrando os dados por data
        filtro = jogos.filter( jogo => (jogo.data == data) )
        // console.log(filtro)

        // criar a estrutura de divisoria
        let card = document.createElement('div')
        secaoJogo.appendChild(card)
        // // console.log(card)

        // // selecionar todos o card
        let cards = document.querySelector('.secaoJogo div')
        // // console.log(cards)

        // // preencher os dados
        cards.innerHTML = `
            <h3>Semana ${filtro[0].semana} | Rodada ${filtro[0].rodada}</h3>
            <h2>${filtro[0].dia} ${filtro[0].data}</h2>
            ${gerarJogos(filtro[0])}
        `
    }))
}

function pegarData() {
    // manipular input e botao
    document.querySelector('#botaoBuscar').addEventListener('click', () => {
        // selecionar dados do input
        let inputData = document.querySelector('.inputData').value
        // console.log(inputData)

        let dataSeparada = inputData.split('-')
        let [ ano, mes, dia ] = dataSeparada
        let dataFormatada = `${dia}/${mes}/${ano}`

        if(inputData != '') {
            lerJogosDoDia(dataFormatada)
        }
    })
}

//lerJogosDoDia('25/06/2022')
pegarData()

//// parte 09 ////
let secaoCards = document.querySelector('.secaoCards')
// console.log(secaoCards)

// CARD
const criarCards = (id) => {
    fetch('times.json')
    .then( resposta => resposta.json())
    .then( dados => {
        // console.log(dados[id])
        let nomeJogador = document.querySelectorAll('.nomeJogador')
        // console.log(nomeJogador)
        let fotoJogador = document.querySelectorAll('.fotoJogador')
        // console.log(fotoJogador)

        let nomeTime = dados[id].sigla.toLowerCase()
        let time = dados[id]
        console.log(time)
        document.querySelector('#nomeDoTime').innerHTML = time.nome_completo

        // preencher dados nos cards
        // nomes
        nomeJogador[0].innerHTML = `${time.escalacao.topo}`
        nomeJogador[1].innerHTML = `${time.escalacao.selva}`
        nomeJogador[2].innerHTML = `${time.escalacao.meio}`
        nomeJogador[3].innerHTML = `${time.escalacao.atirador}`
        nomeJogador[4].innerHTML = `${time.escalacao.suporte}`

        // fotos e fundo
        let urlFoto = `./images/jogadores/${nomeTime}/`
        let fundo = document.querySelectorAll('.fundo')
        time.jogadores.forEach((jogador, indice) => {
            fotoJogador[indice].src = `${urlFoto}${jogador}.png`
            fundo[indice].style.backgroundImage = `url('./images/escudos/${nomeTime}.png')`
        })

    })
}

criarCards(0)

/* controlar exibicao das escalacoes */

document.querySelector('#botaoVer').addEventListener('click', (evento) => {
    // console.log('Escolha do time')
    evento.preventDefault()
    let timeEscolhido = document.querySelector('.selecionaTime').value
    // console.log(timeEscolhido)
    criarCards(timeEscolhido)
})
