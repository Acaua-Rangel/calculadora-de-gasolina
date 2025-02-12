document.open();

function errMsg(error, classe="") {
    document.write(`<b class="${classe}">${error}</b>`);
    document.close()
}
function sendMsg(message, classe="") {
    document.write(`<p class="${classe}">${message}</p>`);
}

function inputInt(question) {
    return parseInt(prompt(question));
}

function inputFloat(question) {
    return parseFloat(prompt(question).replace(",", "."));
}

function inputSecFloat(question, messageErr) {
    const resp = inputFloat(question)
    if (isNaN(resp)) {
        errMsg(messageErr);
        throw '';
    }
    return resp;
}

function inputSecInt(question, messageErr) {
    const resp = inputInt(question)
    if (isNaN(resp)) {
        errMsg(messageErr);
        throw '';
    }
    return resp;
}

const distancia_Percorrida = inputSecFloat('Qual a distância percorrida da sua casa até seu trabalho (em km)?', 'A distância percorrida deve ser um número válido');

const consumo_Medio = inputSecFloat('Qual o consumo médio do seu veículo (em km/L)?', 'O consumo médio deve ser um número válido');

var consumo_Necessario_Litros = (distancia_Percorrida/consumo_Medio).toFixed(2);

document.write(`<p>O consumo necessário para a viagem é de ${consumo_Necessario_Litros} litros</p>`);
document.write('<br>');

const quantidade_Postos_Pesquisados = inputSecInt('Em quantos postos você pesquisou?', 'A quantidade de postos deve ser um número válido');

let qnt_release = 0;

let soma_total_Valores_Pesquisados = 0;
let valor_Posto;
let menor_Valor_Pesquisado;
let menor_Posto;

for (let posto=1; posto <= quantidade_Postos_Pesquisados; posto++) {
    valor_Posto = inputFloat(`Digite o valor encontrado (em R$) no posto ${posto}:`);
    sendMsg(`Posto ${posto}: <b>R$${valor_Posto}</b>`);

    if (!isNaN(valor_Posto)) {
        soma_total_Valores_Pesquisados += valor_Posto;
        qnt_release++;
    }

    if (!isNaN(valor_Posto) && (menor_Valor_Pesquisado==undefined || valor_Posto < menor_Valor_Pesquisado)) {
        menor_Valor_Pesquisado = valor_Posto;
        menor_Posto = posto;
    }
}

if (qnt_release===0) {
    errMsg('Nenhum dos valores dos postos é válido');
} else {
    document.write('<br>');
    sendMsg(`Menor valor pesquisado é R$${menor_Valor_Pesquisado} (posto ${menor_Posto})`);
    document.write('<br>');

    const media=(soma_total_Valores_Pesquisados/qnt_release).toFixed(2);
    sendMsg(`A média dos valores pesquisados é R$${media}`);
    document.write('<br>');

    const gasto_Diario = 2*(consumo_Necessario_Litros*menor_Valor_Pesquisado);
    sendMsg(`O gasto diario (ida e volta) é R$${gasto_Diario}`);
}


document.close();