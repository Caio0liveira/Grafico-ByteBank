import selecionaCotacao from "./imprimi.js";

/* Criação do gráfico no front end (Configuração dos dados) */

const graficoDolar = document.getElementById("graficoDolar")
const graficoParaDolar =  new Chart(graficoDolar,{
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
    });


/* Função para pegar Horario atual */
function geraHorario(){
    let data = new Date()
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
    return horario
}

/* função para adicionar dados*/ 

function adicionandoDados(grafico,legenda,dados){
    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((datasets) => {
        datasets.data.push(dados)
    });
    grafico.update()
}

let workerDolar = new Worker('./scripts/workes/workerDolar.js')
workerDolar.postMessage("usd")

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionandoDados(graficoParaDolar, tempo, valor);
})


/* Gráfico Iene */

const graficoIene = document.getElementById("graficoIene")
const graficoParaIene = new Chart(graficoIene,{
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene',
        data: [],
        borderWidth: 1
      }]
    }
});

let workerIene = new Worker('./scripts/workes/workerIene.js')
workerIene.postMessage("iene")
workerIene.addEventListener("message", event=>{
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("Iene",valor)
    adicionandoDados(graficoParaIene, tempo, valor)
})

/* Gráfico Euro */ 

const graficoEuro = document.getElementById("graficoEuro")
const graficoParaEuro = new Chart(graficoEuro,{
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Euro',
        data: [],
        borderWidth: 1
      }]
    }
});

let workerEuro = new Worker('./scripts/workes/workerEuro.js')
workerEuro.postMessage("Euro")
workerEuro.addEventListener("message", event=>{
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("Euro",valor)
    adicionandoDados(graficoParaEuro, tempo, valor)
})
