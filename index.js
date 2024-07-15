const prompt = require('prompt-sync')();

// Esta é uma array que tem como função receber os objetos que foram criados
let remedios = [
    { "id": 1, "nome": "paracetamol", "preco": Number(10.00), "categoria": "antitérmico", "controlado": false },
    { "id": 2, "nome": "Dipirona Monoidratada", "preco": Number(15.00), "categoria": "analgesico", "controlado": false },
    { "id": 3, "nome": "Neosaldina", "preco": Number(15.00), "categoria": "analgesico", "controlado": false },
    { "id": 4, "nome": "Dorflex", "preco": Number(10.00), "categoria": "analgesico", "controlado": false },
    { "id": 5, "nome": "Novalgina", "preco": Number(15.00), "categoria": "analgesico", "controlado": false },
    { "id": 6, "nome": "Nimesulida", "preco": Number(20.00), "categoria": "anti-inflamatorio", "controlado": true },
    { "id": 7, "nome": "Diclofenaco", "preco": Number(15.00), "categoria": "anti-inflamatorio", "controlado": false },
    { "id": 8, "nome": "Ibuprofeno", "preco": Number(25.00), "categoria": "anti-inflamatorio", "controlado": false },
    { "id": 9, "nome": "Toragesic", "preco": Number(30.00), "categoria": "anti-inflamatorio", "controlado": true },
    { "id": 10, "nome": "AAs", "preco": Number(20.00), "categoria": "anti-inflamatorio", "controlado": false },
    { "id": 12, "nome": "Amoxicilina", "preco": Number(40.00), "categoria": "antibiotico", "controlado": true },
    { "id": 13, "nome": "Clavulin BD", "preco": Number(50.00), "categoria": "antibiotico", "controlado": true },
    { "id": 14, "nome": "Azitromicina Di-Hidratada", "preco": Number(40.00), "categoria": "antibiotico", "controlado": false },
    { "id": 15, "nome": "Ciprofloxacina", "preco": Number(40.00), "categoria": "antibiotico", "controlado": false },
    { "id": 16, "nome": "Sulfametoxazol", "preco": Number(25.00), "categoria": "antibiotico", "controlado": false },
    { "id": 17, "nome": "Allegra", "preco": Number(25.00), "categoria": "antibiotico", "controlado": false },
    { "id": 18, "nome": "Polaramine", "preco": Number(25.00), "categoria": "antibiotico", "controlado": false },
    { "id": 19, "nome": "Histamin", "preco": Number(25.00), "categoria": "antibiotico", "controlado": false },
    { "id": 20, "nome": "Alektos", "preco": Number(30.00), "categoria": "antibiotico", "controlado": false },
    { "id": 21, "nome": "Loratadina", "preco": Number(20.00), "categoria": "antibiotico", "controlado": false },
];

// Aqui temos um prompt para receber o nome do cliente, e um for para mostrar a lista das categorias disponíveis
let nomeCliente = prompt(`Olá, qual seu nome? `);
console.log(`Olá ${nomeCliente}, estas são as categorias disponíveis:`);

// Extraindo categorias únicas
let categorias = [...new Set(remedios.map(remedio => remedio.categoria))];

// Função para listar categorias
function listarCategorias() {
    for (let index = 0; index < categorias.length; index++) {
        console.log((index + 1) + " - " + categorias[index]);
    }
}

// Função para listar remédios por categoria
function listarRemediosPorCategoria(categoriaEscolhida) {
    console.log(`Você escolheu a categoria: ${categoriaEscolhida}`);
    console.log(`Aqui estão os remédios disponíveis dessa categoria:`);
    let remediosCategoria = remedios.filter(remedio => remedio.categoria === categoriaEscolhida);
    for (let remedio of remediosCategoria) {
        console.log(`${remedio.id} - ${remedio.nome} - R$${remedio.preco.toFixed(2)}`);
    }
    return remediosCategoria;
}

// Array para armazenar o carrinho de compras
let carrinho = [];
let continuarComprando = false;

// Loop para permitir que o cliente adicione remédios ao carrinho
do {
    listarCategorias();
    let escolhaCategoria = Number(prompt('Digite o número da categoria que você deseja: '));
    let categoriaEscolhida = categorias[escolhaCategoria - 1];
    let remediosCategoria = listarRemediosPorCategoria(categoriaEscolhida);

    // Loop para adicionar remédios ao carrinho dentro da categoria escolhida
    let adicionarMaisRemedios = false;
    do {
        let codigoRemedio = Number(prompt(`Digite o código do remédio que você deseja: `));
        let remedioSelecionado = remediosCategoria.find(remedio => remedio.id === codigoRemedio);
        if (!remedioSelecionado) {
            console.log(`Este código não existe ou não pertence à categoria escolhida.`);
        } else {
            if (remedioSelecionado.controlado) {
                let temReceita = prompt(`Você tem receita para ${remedioSelecionado.nome}? sim ou nao? `);
                if (temReceita.toLowerCase() === 'sim') {
                    carrinho.push(remedioSelecionado);
                } else {
                    console.log(`Você não pode adicionar ${remedioSelecionado.nome} ao carrinho sem receita.`);
                }
            } else {
                carrinho.push(remedioSelecionado);
            }
        }
        let continuar = prompt(`Deseja adicionar outro remédio desta categoria? sim ou nao? `);
        adicionarMaisRemedios = continuar.toLowerCase() === 'sim';
    } while (adicionarMaisRemedios);

    let continuarCategoria = prompt(`Deseja adicionar remédios de outra categoria? sim ou nao? `);
    continuarComprando = continuarCategoria.toLowerCase() === 'sim';
} while (continuarComprando);

// Esta função exibe os remédios que o cliente selecionou para o carrinho
function exibirRemedios(lista, acao) {
    console.log(`Aqui estão os remédios que você ${acao}: `);
    for (let remedio of lista) {
        console.log(remedio.nome);
    }
}

// Função para calcular o valor total da compra
function calcularTotal(lista) {
    let total = 0;
    for (let remedio of lista) {
        total += remedio.preco;
    }
    return total.toFixed(2);
}

exibirRemedios(carrinho, "selecionou");

// Esta parte do código confirma a compra do cliente ou não
let confirmaCompra = prompt(`${nomeCliente}, você deseja concluir sua compra? sim ou nao? `);
if (confirmaCompra.toLowerCase() === 'sim') {
    console.log(`Obrigado pela compra! `);
    exibirRemedios(carrinho, "comprou");
    let totalCompra = calcularTotal(carrinho);
    console.log(`O valor total da sua compra é: R$${totalCompra}`);
} else {
    console.log(`Compra cancelada com sucesso!`);
}
