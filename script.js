document.open();

function errMsg(error) {
    alert(error)
}
function sendMsg(message, classe="") {
    document.write(`<p class="${classe}">${message}</p>`);
}

function inputFloat(question) {
    return parseFloat(question.replace(",", "."));
}

function inputSecFloat(question, messageErr) {
    console.log(question);
    const resp = inputFloat(question)
    if (isNaN(resp)) {
        errMsg(messageErr);
        throw '';
    }
    return resp;
}

function inputSecInt(question, messageErr) {
    const resp = parseInt(question);
    if (isNaN(resp)) {
        errMsg(messageErr);
        throw '';
    }
    return resp;
}

const questions = [
    [
        {
            "name": "inp1",
            "question": "Qual a distância percorrida da sua casa até seu trabalho (em km)?",
            "placeholder": "Ex: 10.8",
            "errMessage": 'A distância percorrida deve ser um número válido'
        },
        {
            "name": "inp2",
            "question": "Qual o consumo médio do seu veículo (em km/L)?",
            "placeholder": "Ex: 5.2",
            "errMessage": 'O consumo médio deve ser um número válido'
        }
    ],
    [
        {
            "name": "inp3",
            "question": "Em quantos postos você pesquisou?",
            "placeholder": "Ex: 5",
            "errMessage": 'A quantidade de postos deve ser um número válido'
        }
    ],
    [
        {
            "name": "inp4",
            "question": "Digite o valor encontrado (em R$) no Posto {0}:",
            "placeholder": "Ex: 8.1",
            "errMessage": 'O valor do posto {0} deve ser um número válido'
        }
    ]
]

let page = 0;

const form = document.getElementById('forms');
const inputs = document.createElement('div');
inputs.classList.add('inputs');
inputs.id = 'dynamic-form';

let formData = questions[page];

const step = document.createElement('div');
step.id = 'steps';

for (let i=0; i<3; i++) {
    const element = document.createElement('div');
    if (i!=page) {
        element.classList.add('opacity');
    }
    element.textContent = i+1;
    step.appendChild(element);
}
form.appendChild(step);

formData.forEach(item => {
    const label = document.createElement('label');
    label.setAttribute('for', item.name);
    label.textContent = item.question;

    const input = document.createElement('input');
    input.classList.add('input-field');
    input.type = 'text';
    input.id = item.name;
    input.name = item.name;
    input.placeholder = item.placeholder;

    inputs.appendChild(label);
    inputs.appendChild(input);
});
form.appendChild(inputs);

let buttons = document.createElement('div');
buttons.id = 'buttons';

const btn_next = document.createElement('button');
btn_next.id = 'btn-next';
btn_next.textContent = "PRÓXIMO";

buttons.appendChild(btn_next);
form.appendChild(buttons);

function formatString(str, ...values) {
    return str.replace(/{(\d+)}/g, (match, number) => {
        return typeof values[number] !== 'undefined' ? values[number] : match;
    });
}

function reloadButtons(page) {
    buttons = document.getElementById('buttons');
    buttons.remove();
    let btn_back;
    let btn_next;
    if (page == 0) {
        buttons = document.createElement('div');
        buttons.id = 'buttons';

        btn_next = document.createElement('button');
        btn_next.id = 'btn-next';
        btn_next.textContent = "PRÓXIMO";

        buttons.appendChild(btn_next);
        form.appendChild(buttons);
    } else {
        buttons = document.createElement('div');
        buttons.id = 'buttons';

        btn_back = document.createElement('button');
        btn_back.id = 'btn-back';
        btn_back.textContent = "VOLTAR";

        btn_next = document.createElement('button');
        btn_next.id = 'btn-next';
        btn_next.textContent = "PRÓXIMO";

        buttons.appendChild(btn_back);
        buttons.appendChild(btn_next);
        form.appendChild(buttons);
    }

    if (document.getElementById('btn-back')) {
        document.getElementById('btn-back').addEventListener('click', lastStep);
    }

    document.getElementById('btn-next').addEventListener('click', nextStep);

    // Adiciona um evento de tecla a todos os inputs
    document.querySelectorAll('.input-field').forEach((input, index, inputs) => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Previne o comportamento padrão do Enter

                // Move o foco para o próximo input, se houver
                const nextInput = inputs[index + 1];
                console.log(nextInput);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    nextStep(event);
                }
            }
        });
    });
}

function updatePage(page) {
    let step = document.getElementById('steps');
    step.remove();
    step = document.createElement('div');
    step.id = 'steps';

    for (let i=0; i<3; i++) {
        const element = document.createElement('div');
        if (i!=page) {
            element.classList.add('opacity');
        }
        element.textContent = i+1;
        step.appendChild(element);
    }
    form.appendChild(step);

    let inputs = document.getElementById('dynamic-form');
    inputs.remove();

    inputs = document.createElement('div');
    inputs.classList.add('inputs');
    inputs.id = 'dynamic-form';

    formData = questions[page];

    formData.forEach(item => {
        const label = document.createElement('label');
        label.setAttribute('for', item.name);
        label.textContent = item.question;
    
        const input = document.createElement('input');
        input.classList.add('input-field');
        input.type = 'text';
        input.id = item.name;
        input.name = item.name;
        input.placeholder = item.placeholder;
    
        inputs.appendChild(label);
        inputs.appendChild(input);
    });
    form.appendChild(inputs);
    reloadButtons(page)
}

function updatePosto(page, point) {
    let step = document.getElementById('steps');
    step.remove();
    step = document.createElement('div');
    step.id = 'steps';

    for (let i=0; i<3; i++) {
        const element = document.createElement('div');
        if (i!=page) {
            element.classList.add('opacity');
        }
        element.textContent = i+1;
        step.appendChild(element);
    }
    form.appendChild(step);

    let inputs = document.getElementById('dynamic-form');
    inputs.remove();

    inputs = document.createElement('div');
    inputs.classList.add('inputs');
    inputs.id = 'dynamic-form';

    formData = questions[page];

    formData.forEach(item => {
        const label = document.createElement('label');
        label.setAttribute('for', item.name);
        label.textContent = formatString(item.question, point);
    
        const input = document.createElement('input');
        input.classList.add('input-field');
        input.type = 'text';
        input.id = item.name;
        input.name = item.name;
        input.placeholder = item.placeholder;
    
        inputs.appendChild(label);
        inputs.appendChild(input);
    });
    form.appendChild(inputs);
    reloadButtons(page)
}

function showCalcs() {
    let step = document.getElementById('steps');
    step.remove();
    let inputs = document.getElementById('dynamic-form');
    inputs.remove();
    let buttons = document.getElementById('buttons');
    buttons.remove();

    const calcs = document.createElement('div');
    calcs.id = 'cals';

    const consumo = document.createElement('p');
    const con = (parseFloat(localStorage.getItem('distance'))/parseFloat(localStorage.getItem('consumo'))).toFixed(2);
    consumo.textContent = `O consumo para a viagem é de ${con} ${con > 1 ? 'litros' : 'litro'}`

    calcs.appendChild(consumo);

    const postos = document.createElement('p');
    const qtdPostos = parseInt(localStorage.getItem('qtn_postos'));
    postos.textContent = `Postos pesquisados: ${qtdPostos}`

    calcs.appendChild(postos);
    calcs.appendChild(document.createElement('b'));

    let soma_total_Valores_Pesquisados = 0;
    let qnt_release = 0
    let menor_Valor_Pesquisado;

    for (let i = 1; i <= qtdPostos; i++) {
        const post = document.createElement('p');
        
        // Cria um elemento <strong> para o texto "Posto x:"
        const postoText = document.createElement('strong');
        postoText.textContent = `Posto ${i}: `;
        
        // Cria um texto normal para o valor do posto
        let valor_Posto = parseFloat(localStorage.getItem(`posto${i}`));
        const postoValue = document.createTextNode(`R$ ${valor_Posto}`);
        
        // Adiciona os elementos <strong> e o texto normal ao parágrafo
        post.appendChild(postoText);
        post.appendChild(postoValue);

        calcs.appendChild(post);


        if (!isNaN(valor_Posto)) {
            soma_total_Valores_Pesquisados += valor_Posto;
            qnt_release++;
        }
    
        if (!isNaN(valor_Posto) && (menor_Valor_Pesquisado==undefined || valor_Posto < menor_Valor_Pesquisado)) {
            menor_Valor_Pesquisado = valor_Posto;
            menor_Posto = i;
        }

    }
    
    if (qnt_release===0) {
        const errMs = document.createElement('strong');
        errMs.textContent = 'Nenhum dos valores dos postos é válido';
        calcs.appendChild(errMs);
    } else {
        const minVal = document.createElement('p');
        minVal.textContent = `Menor valor pesquisado é R$${menor_Valor_Pesquisado} (posto ${menor_Posto})`;
    
        const media=(soma_total_Valores_Pesquisados/qnt_release).toFixed(2);
        const mediaMsg = document.createElement('p');
        mediaMsg.textContent = `A média dos valores pesquisados é R$${media}`;
    
        const gasto_Diario = 2*(con*menor_Valor_Pesquisado);
        const gstDiaMsg = document.createElement('p');
        gstDiaMsg.textContent = `O gasto diario (ida e volta) é R$${gasto_Diario}`;

        calcs.appendChild(minVal);
        calcs.appendChild(mediaMsg);
        calcs.appendChild(gstDiaMsg);
    }

    form.appendChild(calcs);
}

function nextStep(event) {
    event.preventDefault();
    if (page == 0) {
        const dist = inputSecFloat(document.getElementById('inp1').value, questions[page][0].errMessage);
        const consu = inputSecFloat(document.getElementById('inp2').value, questions[page][1].errMessage);

        localStorage.setItem("distance", String(dist));
        localStorage.setItem("consumo", String(consu));
        page++;
        updatePage(page);
    } else if (page == 1) {
        const postos = inputSecInt(document.getElementById('inp3').value, questions[page][0].errMessage);

        if (postos < 1) {
            alert('O valor mínimo é 1');
        } else {
            localStorage.setItem("qtn_postos", String(postos));
            localStorage.setItem("at_posto", String(1));
            page++;
        }

        updatePosto(page, 1);
    } else if (page == 2) {
        const qtn = localStorage.getItem('qtn_postos');
        const qnt_postos = parseInt(qtn);
        const at = localStorage.getItem('at_posto');
        const posto = parseInt(at);
        if (posto <= qnt_postos) {
            valor_Posto = inputSecFloat(document.getElementById('inp4').value, formatString(questions[page][0].errMessage, posto));
            
            localStorage.setItem(`posto${posto}`, String(valor_Posto));
            localStorage.setItem("at_posto", String(posto+1));
        } 
        
        if (posto < qnt_postos) {
            updatePosto(page, posto+1);
        } else {
            showCalcs();
            page++;
        }
    } 

    // Adiciona foco ao primeiro input quando a página carrega
    const firstInput = document.querySelector('.input-field');
    if (firstInput) {
        firstInput.focus();
    }
}

function lastStep(event) {
    event.preventDefault();
    page--;
    
    updatePage(page);
}

if (document.getElementById('btn-back')) {
    document.getElementById('btn-back').addEventListener('click', lastStep);
}

document.getElementById('btn-next').addEventListener('click', nextStep);

// Adiciona um evento de tecla a todos os inputs
document.querySelectorAll('.input-field').forEach((input, index, inputs) => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previne o comportamento padrão do Enter

            // Move o foco para o próximo input, se houver
            const nextInput = inputs[index + 1];
            console.log(nextInput);
            if (nextInput) {
                nextInput.focus();
            } else {
                nextStep(event);
            }
        }
    });
});

// Adiciona foco ao primeiro input quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    const firstInput = document.querySelector('.input-field');
    if (firstInput) {
        firstInput.focus();
    }
});

document.close();