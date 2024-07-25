const prompt = require('prompt-sync')();
const fs = require('fs');

// Função para carregar o arquivo JSON
function listaRemedios() {
  try {
    const data = fs.readFileSync('./db.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao carregar o arquivo JSON:', err);
    return [];
  }
}

// Função para salvar os remédios no arquivo JSON
function salvarRemedios() {
  try {
    fs.writeFileSync('./db.json', JSON.stringify(remedios, null, 2), 'utf-8');
    console.log('Dados atualizados no arquivo JSON com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar o arquivo JSON:', err);
  }
}

// Carregar remédios do arquivo JSON
let remedios = listaRemedios();

// Array de funcionarios
let funcionarios = [
  {
    id: '37541053023',
    nome: 'Juarez José',
    pin: '21436587',
    email: 'juuarezjose92@gmail.com',
    administrator: true,
  },
];

// função criar funcionarios
function createFuncionario() {
  console.log('Bem vindo ao sistema de cadastro de funcionario!');
  let id = prompt(
    'Digite o cpf do funcionário(sem pontuação, apenas números): '
  );
  let nome = prompt('Digite o nome do funcionário: ');
  let email = prompt('Digite o email do funcionário: ');
  let pin = prompt('Peça para o funcionário inserir uma senha: ');
  let isAdmin = prompt('Esse funcionário será administrador?(S/n) ');

  let roleAdmin = isAdmin.toLowerCase() == 's';

  funcionarios.push({
    id: id,
    nome: nome,
    email: email,
    pin: pin,
    administrator: roleAdmin,
  });
}

// função de login do funcionario
function loginFuncionario() {
  let loginEmail = prompt('Digite o seu e-mail: ');
  let loginPin = prompt('Digite a sua senha: ');
  let logado = false;
  for (let i = 0; i < funcionarios.length; i++) {
    if (
      loginEmail == funcionarios[i].email &&
      loginPin == funcionarios[i].pin
    ) {
      console.log(`Bem vindo ${funcionarios[i].nome}!`);
      logado = true;
      break;
    }
  }
  if (!logado) {
    console.log('E-mail ou senha incorretos');
  }
}

// createFuncionario();
// loginFuncionario();

function updateMedicine() {
  console.log('\nLista de remédios disponíveis: ');
  remedios.forEach((remedio, index) => {
    console.log(`${index + 1}. ${remedio.nome}`);
  });

  let buscadorRemedio = prompt(`\nQual remédio você deseja alterar?`);

  for (let i = 0; i < remedios.length; i++) {
    if (buscadorRemedio.toUpperCase() == remedios[i].nome.toUpperCase()) {
      console.log(
        `1 - Nome\n2 - Preço\n3 - Categoria\n4 - Necessidade de Receita\n5 - Quantidade`
      );
      let info = Number(
        prompt(`Qual Informação do remédio você deseja alterar? `)
      );
      switch (info) {
        case 1:
          let novoNome = prompt(
            `Qual será o novo nome do remédio ${remedios[i].nome}? `
          );
          remedios[i].nome = novoNome;
          console.log(`O nome do remédio foi atualizado`);
          break;
        case 2:
          let novoPreco = Number(
            prompt(`Qual será o novo preço do remédio ${remedios[i].nome}? `)
          );
          remedios[i].preco = novoPreco;
          console.log(`O Preço do remédio foi atualizado`);
          break;
        case 3:
          let novaCategoria = prompt(
            `Qual será a nova categoria do remédio ${remedios[i].nome}? `
          );
          remedios[i].categoria = novaCategoria;
          console.log(`A Categoria do remédio foi atualizada`);
          break;
        case 4:
          let novaNecessidade = prompt(
            `O remédio ${remedios[i].nome} irá precisar de receita?(S/n)`
          );
          if (novaNecessidade.toLowerCase() == 's') {
            remedios[i].controlado = true;
            console.log(`Agora o remédio necessitará de receita`);
          } else if (novaNecessidade.toLowerCase() == 'n') {
            remedios[i].controlado = false;
            console.log(`Agora o remédio NÃO necessitará de receita`);
          } else {
            console.log(`ERRO`);
          }
          break;
        case 5:
          let novaQuantidade = Number(
            prompt(
              `Qual será a nova quantidade do remédio ${remedios[i].nome}? `
            )
          );
          remedios[i].quantidade = novaQuantidade;
          console.log(`A Quantidade do remédio foi atualizada`);
          break;
        default:
          console.log(`ERRO`);
          break;
      }
      salvarRemedios(remedios);
      break;
    }
  }
}

let nomeCliente = prompt(`Olá, qual seu nome? `);
console.log(`Olá ${nomeCliente}, estas são as categorias disponíveis:`);

let categorias = [...new Set(remedios.map((remedio) => remedio.categoria))];

function listarCategorias() {
  for (let index = 0; index < categorias.length; index++) {
    console.log(index + 1 + ' - ' + categorias[index]);
  }
}

function listarRemediosPorCategoria(categoriaEscolhida) {
  console.log(`Você escolheu a categoria: ${categoriaEscolhida}`);
  console.log(`Aqui estão os remédios disponíveis dessa categoria:`);
  let remediosCategoria = remedios.filter(
    (remedio) => remedio.categoria === categoriaEscolhida
  );
  for (let remedio of remediosCategoria) {
    console.log(
      `${remedio.id} - ${remedio.nome} - R$${remedio.preco.toFixed(
        2
      )} - Quantidade: ${remedio.quantidade}`
    );
  }
  return remediosCategoria;
}

let carrinho = [];
let continuarComprando = false;

function venda() {
  do {
    listarCategorias();
    let escolhaCategoria = Number(
      prompt('Digite o número da categoria que você deseja: ')
    );
    let categoriaEscolhida = categorias[escolhaCategoria - 1];
    let remediosCategoria = listarRemediosPorCategoria(categoriaEscolhida);

    let adicionarMaisRemedios = false;
    do {
      let codigoRemedio = Number(
        prompt(`Digite o código do remédio que você deseja: `)
      );
      let remedioSelecionado = remediosCategoria.find(
        (remedio) => remedio.id === codigoRemedio
      );
      if (!remedioSelecionado) {
        console.log(
          `Este código não existe ou não pertence à categoria escolhida.`
        );
      } else {
        if (remedioSelecionado.controlado) {
          let temReceita = prompt(
            `Você tem receita para ${remedioSelecionado.nome}? sim ou nao? `
          );
          if (temReceita.toLowerCase() === 'sim') {
            carrinho.push(remedioSelecionado);
          } else {
            console.log(
              `Você não pode adicionar ${remedioSelecionado.nome} ao carrinho sem receita.`
            );
          }
        } else {
          carrinho.push(remedioSelecionado);
        }
      }
      let continuar = prompt(
        `Deseja adicionar outro remédio desta categoria? sim ou nao? `
      );
      adicionarMaisRemedios = continuar.toLowerCase() === 'sim';
    } while (adicionarMaisRemedios);

    let continuarCategoria = prompt(
      `Deseja adicionar remédios de outra categoria? sim ou nao? `
    );
    continuarComprando = continuarCategoria.toLowerCase() === 'sim';
  } while (continuarComprando);
}

function loopPrincipal() {
  while (true) {
    console.log(`1 - Vender\n2 - Atualizar Remédio\n3 - Ir para o Carrinho`);
    let operacao = Number(
      prompt(`Digite o número referente a operação a qual você irá realizar: `)
    );
    switch (operacao) {
      case 1:
        venda();
        break;
      case 2:
        updateMedicine();
        break;
      default:
        return false;
    }
  }
}

loopPrincipal();

function exibirRemedios(lista, acao) {
  console.log(`Aqui estão os remédios que você ${acao}: `);
  for (let remedio of lista) {
    console.log(remedio.nome);
  }
}

function calcularTotal(lista) {
  let total = 0;
  for (let remedio of lista) {
    total += remedio.preco;
  }
  return total.toFixed(2);
}

exibirRemedios(carrinho, 'selecionou');

let confirmaCompra = prompt(
  `${nomeCliente}, você deseja concluir sua compra? sim ou nao? `
);
if (confirmaCompra.toLowerCase() === 'sim') {
  console.log(`Obrigado pela compra! `);
  exibirRemedios(carrinho, 'comprou');
  let totalCompra = calcularTotal(carrinho);
  console.log(`O valor total da sua compra é: R$${totalCompra}`);
} else {
  console.log(`Compra cancelada com sucesso!`);
}
