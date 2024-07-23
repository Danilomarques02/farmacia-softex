const prompt = require("prompt-sync")();

// Esta é uma array que tem como função receber os objetos que foram criados
let remedios = [
  { id: 1, nome: "Paracetamol", preco: Number(10.0), categoria: "analgesico", controlado: false, },
  { id: 2, nome: "Dipirona Monoidratada", preco: Number(15.0), categoria: "analgesico", controlado: false, },
  { id: 3, nome: "Neosaldina", preco: Number(15.0), categoria: "analgesico", controlado: false, },
  { id: 4, nome: "Dorflex", preco: Number(10.0), categoria: "analgesico", controlado: false, },
  { id: 5, nome: "Novalgina", preco: Number(15.0), categoria: "analgesico", controlado: false, },
  { id: 6, nome: "Nimesulida", preco: Number(20.0), categoria: "anti-inflamatorio", controlado: false, },
  { id: 7, nome: "Diclofenaco", preco: Number(15.0), categoria: "anti-inflamatorio", controlado: false, },
  { id: 8, nome: "Ibuprofeno", preco: Number(25.0), categoria: "anti-inflamatorio", controlado: false, },
  { id: 9, nome: "Toragesic", preco: Number(30.0), categoria: "anti-inflamatorio", controlado: false, },
  { id: 10, nome: "AAs", preco: Number(20.0), categoria: "anti-inflamatorio", controlado: false, },
  { id: 11, nome: "Amoxicilina", preco: Number(40.0), categoria: "antibiotico", controlado: true, },
  { id: 12, nome: "Clavulin BD", preco: Number(50.0), categoria: "antibiotico", controlado: true, },
  { id: 13, nome: "Azitromicina Di-Hidratada", preco: Number(40.0), categoria: "antibiotico", controlado: true, },
  { id: 14, nome: "Ciprofloxacina", preco: Number(40.0), categoria: "antibiotico", controlado: true, },
  { id: 15, nome: "Sulfametoxazol", preco: Number(25.0), categoria: "antibiotico", controlado: true, },
  { id: 16, nome: "Allegra", preco: Number(25.0), categoria: "antialergico", controlado: false, },
  { id: 17, nome: "Polaramine", preco: Number(25.0), categoria: "antialergico", controlado: false, },
  { id: 18, nome: "Histamin", preco: Number(25.0), categoria: "antialergico", controlado: false, },
  { id: 19, nome: "Alektos", preco: Number(30.0), categoria: "antialergico", controlado: false, },
  { id: 20, nome: "Loratadina", preco: Number(20.0), categoria: "antialergico", controlado: false, },
];

let funcionarios = [
  { id: "37541053023", nome: "Juarez José", pin: "21436587", email: "juuarezjose92@gmail.com", administrator: true},
];

function createFuncionario() {
	console.log("Bem vindo ao sistema de cadastro de funcionario!");
	let id = prompt("Digite o cpf do funcionário(sem pontuação, apenas números): ");
	let nome = prompt("Digite o nome do funcionário: ");
	let email = prompt("Digite o email do funcionário: ");
	let pin = prompt("Peça para o funcionário inserir uma senha: ");
	let isAdmin = prompt("Esse funcionário será administrador?(S/n) ");

	if (isAdmin.toLowerCase() == "s") {
		roleAdmin = true
	} else {
		roleAdmin = false;
	}

	funcionarios.push({id: id, nome: nome, email: email, pin: pin, administrator: roleAdmin})
}

function loginFuncionario() {
	let loginEmail = prompt("Digite o seu e-mail: ");
  let loginPin = prompt("Digite a sua senha: ");
	for (let i = 0; i < funcionarios.length; i++) {
    if (loginEmail == funcionarios[i].email && loginPin == funcionarios[i].pin) {
      console.log(`Bem vindo ${funcionarios[i].nome}!`);
    } else {
      console.log("E-mail ou senha incorretos");
    }
	}

}

// createFuncionario();
// loginFuncionario();

function updateMedicine() {
	// nome do remédio que será buscado
  let buscadorRemedio = prompt(`Qual remédio você deseja alterar?`);

  for (let i = 0; i < remedios.length; i++) {
		// checagem pra ver se o remédio existe
    if (buscadorRemedio.toUpperCase() == remedios[i].nome.toUpperCase()) {
			// menu de escolhas
      console.log(
        `1 - Nome\n2 - Preço\n3 - Categoria\n4 - Necessidade de Receita\n`
      );
      let info = Number(
        prompt(`Qual Informação do remédio você deseja alterar? `)
      );
      switch (info) {
				// alteração do nome
        case 1:
          let novoNome = prompt(
            `Qual será o novo nome do remédio ${remedios[i].nome}? `
          );
          remedios[i].nome = novoNome;
          console.log(`O nome do remédio foi atualizado`);
          break;
				// alteração do preço
        case 2:
          let novoPreco = Number(
            prompt(`Qual será o novo preço do remédio ${remedios[i].nome}? `)
          );
          remedios[i].preco = novoPreco;
          console.log(`O Preço do remédio foi atualizado`);
          break;
				// alteração da categoria
        case 3:
          let novaCategoria = prompt(
            `Qual será a nova categoria do remédio ${remedios[i].nome}? `
          );
          remedios[i].categoria = novaCategoria;
          console.log(`A Categoria do remédio foi atualizada`);
          break;
				// alteração da necessidade de receita
        case 4:
          let novaNecessidade = prompt(
            `O remédio ${remedios[i].nome} irá precisar de receita?(S/n)`
          );
					// pra colocar que É necessário receita
          if (novaNecessidade.toLowerCase() == "s") {
            remedios[i].controlado = true;
            console.log(`Agora o remédio necessitará de receita`);
            break;
					// pra colocar que NÃO é necessário receita
          } else if (novaNecessidade.toLowerCase() == "n") {
            remedios[i].controlado = false;
            console.log(`Agora o remédio NÃO necessitará de receita`);
            break;
          } else {
            console.log(`ERRO`);
            break;
          }
        default:
          console.log(`ERRO`);
          break;
      }
    }
  }
}

// Aqui temos um prompt para receber o nome do cliente, e um for para mostrar a lista das categorias disponíveis
let nomeCliente = prompt(`Olá, qual seu nome? `);
console.log(`Olá ${nomeCliente}, estas são as categorias disponíveis:`);

// Extraindo categorias únicas
let categorias = [...new Set(remedios.map((remedio) => remedio.categoria))];

// Função para listar categorias
function listarCategorias() {
  for (let index = 0; index < categorias.length; index++) {
    console.log(index + 1 + " - " + categorias[index]);
  }
}

// Função para listar remédios por categoria
function listarRemediosPorCategoria(categoriaEscolhida) {
  console.log(`Você escolheu a categoria: ${categoriaEscolhida}`);
  console.log(`Aqui estão os remédios disponíveis dessa categoria:`);
  let remediosCategoria = remedios.filter(
    (remedio) => remedio.categoria === categoriaEscolhida
  );
  for (let remedio of remediosCategoria) {
    console.log(
      `${remedio.id} - ${remedio.nome} - R$${remedio.preco.toFixed(2)}`
    );
  }
  return remediosCategoria;
}

// Array para armazenar o carrinho de compras
let carrinho = [];
let continuarComprando = false;

// Loop para permitir que o cliente adicione remédios ao carrinho
function venda() {
  do {
    listarCategorias();
    let escolhaCategoria = Number(
      prompt("Digite o número da categoria que você deseja: ")
    );
    let categoriaEscolhida = categorias[escolhaCategoria - 1];
    let remediosCategoria = listarRemediosPorCategoria(categoriaEscolhida);

    // Loop para adicionar remédios ao carrinho dentro da categoria escolhida
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
          if (temReceita.toLowerCase() === "sim") {
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
      adicionarMaisRemedios = continuar.toLowerCase() === "sim";
    } while (adicionarMaisRemedios);

    let continuarCategoria = prompt(
      `Deseja adicionar remédios de outra categoria? sim ou nao? `
    );
    continuarComprando = continuarCategoria.toLowerCase() === "sim";
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
        break;
    }
  }
}

loopPrincipal();
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
let confirmaCompra = prompt(
  `${nomeCliente}, você deseja concluir sua compra? sim ou nao? `
);
if (confirmaCompra.toLowerCase() === "sim") {
  console.log(`Obrigado pela compra! `);
  exibirRemedios(carrinho, "comprou");
  let totalCompra = calcularTotal(carrinho);
  console.log(`O valor total da sua compra é: R$${totalCompra}`);
} else {
  console.log(`Compra cancelada com sucesso!`);
}