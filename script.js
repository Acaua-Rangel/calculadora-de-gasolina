const distancia_Percorrida = parseFloat(prompt('Qual a distância percorrida da sua casa até seu trabalho (em km)?'));
const consumo_Medio = parseFloat(prompt('Qual o consumo médio do seu veículo (em km/L)?'));

var consumo_Necessario_Litros = distancia_Percorrida/consumo_Medio;
document.open();

document.write(`<p>O consumo necessário para a viagem é de ${consumo_Necessario_Litros} litros</p>`);
document.write('<br>');

const quantidade_Postos_Pesquisados = parseInt(prompt('Em quantos postos você pesquisou?'));
let soma_total_Valores_Pesquisados = 0;
let valor_Posto;
let menor_Valor_Pesquisado;
let menor_Posto;

for (let posto=1; posto <= quantidade_Postos_Pesquisados; posto++) {
    valor_Posto = parseFloat(prompt(`Digite o valor encontrado (em R$) no posto ${posto}:`));
    document.write(`<p>Posto ${posto}: <b>R$${valor_Posto}</b></p>`);
    document.write('<br>');

    if (posto == 1 || valor_Posto < menor_Valor_Pesquisado) {
        menor_Valor_Pesquisado = valor_Posto;
        menor_Posto = posto;
    }
    soma_total_Valores_Pesquisados += valor_Posto;
}

document.write(`<p>Menor valor pesquisado é R$${menor_Valor_Pesquisado} (posto ${menor_Posto})</p>`);
document.write('<br>');

const media=soma_total_Valores_Pesquisados/quantidade_Postos_Pesquisados;

document.write(`<p>A média dos valores pesquisados é R$${media}</p>`);
document.write('<br>');

const gasto_Diario = 2*(consumo_Necessario_Litros*menor_Valor_Pesquisado)

document.write(`<p>O gasto diario (ida e volta) é R$${gasto_Diario}</p>`);

document.close();
                                     