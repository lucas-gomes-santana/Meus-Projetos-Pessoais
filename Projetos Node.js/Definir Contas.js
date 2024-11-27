//Há diferenças desse código para o projeto lista de tarefas pois é um objeto que guarda os elementos criados aqui,não um array
const path = require('path');
const fs = require('fs'); 
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,output:process.stdout
});

const filePath = path.join(__dirname,'Contas.json'); //Arquivo onde as contas dos usuários serão salvas

//Função que irá carregar as contas do objeto contas para o arquivo.json
function CarregarContas() {
    let Contas = {}; //Inicializa o objeto dentro da função CarregarContas

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(data); // Tenta fazer o parse do JSON
        } 
        catch (error) {
            console.log("Erro ao carregar as tarefas: JSON inválido. Inicializando como vazio.");
            return {}; // Se o JSON estiver corrompido, inicializa como vazio
        }
    } 
    else {
        fs.writeFileSync(filePath, JSON.stringify(Contas,null,2), 'utf-8'); // Cria o arquivo.json vazio se der problema no anterior ou se não existir um
        return {};
    }
}

//Salva as contas dos usuários no arquivo.json
function SalvarContas(){
    fs.writeFileSync(filePath,JSON.stringify(Contas,null,2),'utf-8');
}

let Contas = CarregarContas(); //Fazendo o objeto contas ir para a função CarregarContas para poder ser armazenado no arquivo.json


console.log("Olá,seja bem vindo a este programa de transações bancárias");
Menu();

function Menu(){
    console.log("Você quer criar uma nova conta ou quer criar uma conta existente?");
    rl.question(`Digite CRIAR para fazer uma nova conta bancária,ACESSAR para entrar em uma existente,MENU para ir para o menu do programa ou SAIR para deixar o programa: `,(resposta) => {

        if (resposta.toLocaleLowerCase() === "criar"){
            CriarContas();
        }
        else if (resposta.toLocaleLowerCase() === "acessar"){
            GerenciarContas();
        }
        else if (resposta.toLocaleLowerCase() === "sair"){
            Encerrar();
        }
        else if (resposta.toLocaleLowerCase() === "menu"){
            Menu_2();
        }
        else{
            console.log("Erro no programa!A resposta inserida é inválida.Por favor tente novamente");
            Menu();
        }
    });
}

//Função que irá verificar se o nome da conta que está sendo criada tem caracteres especias
function CaracteresEspeciais(nome_conta){
    //Definindo os caracteres que não serão permitidos na hora de criar o nome 
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharactersRegex.test(nome_conta); 
}

function CriarContas(){
    rl.question(`Digite o nome da conta bancária que você está criando: `,(nome_conta) => {
        nome_conta.trim(); //Colocando o trim para o programa ingnorar excessos de espaços no nome da conta
        if (CaracteresEspeciais(nome_conta) || nome_conta.length < 8){
            console.log("Erro no programa!O nome da conta bancária deve conter apenas letras e números e não deve ter menos que 8 caracteres");
            CriarContas();
        }
        else if (Contas[nome_conta]){
            console.log(`A conta já ${nome_conta} já existe,defina um outro nome`);
            CriarContas();
        }
        else{
            DefinirSenha(nome_conta);
        }
    });
}

function DefinirSenha(nome_conta){
    rl.question(`Agora crie uma senha para a conta que tenha pelo menos 6 dígitos: `,(senha_conta) => {
        if (senha_conta.length < 6){
            console.log("Erro no programa!A senha para a conta deve ter 6 dígitos no mínimo!Defina outra senha");
            DefinirSenha(nome_conta);
        }
        else{
            //Salvando o nome e a senha no objeto Contas
            Contas[nome_conta] = { senha: senha_conta, saldo: 0 }; //Pré-dfinindo o valor da senha da conta e o saldo bancário da conta como zero para evitar problemas
            SalvarContas(); //Salvando a senha e o nome da conta recém-criada
            console.log(`Conta ${nome_conta} criada com sucesso`);
            Pergunta(nome_conta);
        }
    });
}

function Pergunta(nome_conta){
    console.log("Você quer depositar dinheiro na sua conta agora ou quer ir ao menu do programa?");
    rl.question(`Digite 1 para depositar dinheiro ou 2 para ir para o menu: `,(opcao_2) => {
        opcao_2 = Number(opcao_2); 
        switch (opcao_2) {
            case 1:
                GerenciarContas(nome_conta);
                break;

            case 2:
                Menu_2();
                break;

            default:
                console.log("Erro no programa!A opção inserida está errada.Tente novamente");
                Pergunta(nome_conta);
                break;
            
        }
    });
}

function Menu_2(){
    console.log("O que você deseja fazer agora?");
    rl.question(`
Digite 1 para depositar ou sacar dinheiro da sua conta bancária
Digite 2 para voltar para o início
Digite 3 para remover uma conta do programa
Digite 4 para sair do programa: `,(opcao) => {
        opcao = Number(opcao);
        switch (opcao) {
            case 1:
                console.log("Seja bem vindo a área de gerenciamneto de contas");
                GerenciarContas();
                break;

            case 2:
                Menu();
                break;

            case 3:
                RemoverConta();
                break;

            case 4:
                Encerrar();
                break;
        
            default:
                console.log("Erro no programa!A opção selecionada não existe neste momento.Tente novamente");
                Menu_2();
                break;
        }
    });
}

function GerenciarContas(){
    console.log(`Contas existentes no programa bancário: `,Object.keys(Contas)); //O comando Object.keys também importa os elementos que estão no objeto em forma de array 
    rl.question(`Digite o nome da sua conta: `,(nome_conta_2) => {
        nome_conta_2 = nome_conta_2.trim();//Colocando o trim para o programa ingnorar excessos de espaços no nome da conta
        if (Contas[nome_conta_2]){
            rl.question(`Digite a senha da conta ${nome_conta_2}: `,(senha_conta) => {
                if (Contas[nome_conta_2].senha === senha_conta){
                    DepositarOuSacar(nome_conta_2);
                }
                else{
                    console.log("Erro no programa!");
                    console.log(`A senha da conta ${nome_conta_2} está incorreta!Digite a senha novamente`);
                    GerenciarContas(nome_conta_2);
                }
            });
        }
        else{
            console.log(`A conta ${nome_conta_2} não existe no programa!Tente digitar o nome novamente`);
            GerenciarContas(nome_conta_2);
        }
    });
}

function DepositarOuSacar(nome_conta_2){
    rl.question("Você quer depositar ou sacar dinheiro da sua conta?(digite 1 para DEPOSITAR ou 2 para SACAR): ",(opcao_3) => {
        opcao_3 = Number(opcao_3);
        switch (opcao_3) {
            case 1:
                //Criando a variável saldo que representará o saldo bancário da conta
                console.log(`O saldo atual da conta ${nome_conta_2} é R$${Contas[nome_conta_2].saldo.toFixed(2)}`) //O comando toFixed arredonda as casa decimais dos números
                rl.question(`Insira a quantia que você quer depositar na sua conta: `,(deposito) => {
                    //Transformando a variável deposito em um número do tipo Float
                    deposito = Number(deposito);
                    deposito = parseFloat(deposito); 
                    //Verificando se o valor do depósito é válido
                    if (deposito > 0){
                        Contas[nome_conta_2].saldo += deposito //Adicionado o valor do depósito ao saldo da conta
                        SalvarContas(); //Salvando o valor do depósito da conta
                        console.log(`Depósito de ${deposito.toFixed(2)} realizado na conta ${nome_conta_2} com sucesso!`)
                        console.log(`O saldo bancário da conta ${nome_conta_2} é R${Contas[nome_conta_2].saldo.toFixed(2)}`);
                        console.log("Voltando para o menu de opções do programa...");
                        Menu_2();
                    }
                    //Verificando se o usuário está colocando letras no valor do depósito
                    else if (isNaN(deposito)){
                        console.log("Erro no programa!Você deve fazer um depósito de dinheiro com um número válido,não com letras!");
                        DepositarOuSacar(nome_conta_2);
                    }
                    else{
                        console.log(`Erro no programa!R$${deposito.toFixed(2)} não é uma quantia válida para fazer um depósito!Faça um depósito válido!`);
                        DepositarOuSacar(nome_conta_2);
                    }
                });
                break;

            case 2:
                if (Contas[nome_conta_2].saldo.toFixed(2) == 0){
                    console.log("Erro no programa!");
                    console.log(`Não pode ser sacado dinheiro dessa conta pois o saldo bancário da conta ${nome_conta_2} é R$${Contas[nome_conta_2].saldo.toFixed(2)}`);
                    DepositarOuSacar(nome_conta_2);
                }
                else{
                    console.log(`O saldo da conta ${nome_conta_2} é R$${Contas[nome_conta_2].saldo.toFixed(2)}`);
                    rl.question(`Insira a quantia que você sacar dessa conta: `,(saque) => {
                        //Transformando a variável deposito em um número do tipo Float
                        saque = Number(saque)
                        saque = parseFloat(saque);
                        if(saque > Contas[nome_conta_2].saldo.toFixed(2)){
                            console.log("Erro no programa!");
                            console.log(`O valor de saque R${saque} é maior do que o saldo da conta ${nome_conta_2} que é de R$${Contas[nome_conta_2].saldo.toFixed(2)}`);
                            console.log("Portanto,este saque é inválido!")
                            DepositarOuSacar(nome_conta_2);
                        }
                        //Verificando se o usuário está colocando letras no valor do depósito
                        else if (isNaN(saque)){
                            console.log("Erro no programa!Você deve fazer um saque de dinheiro com um número válido,não com letras!");
                            DepositarOuSacar(nome_conta_2);
                        }
                        else{
                            Contas[nome_conta_2].saldo -= saque; //Retirando dinheiro da conta
                            SalvarContas(); //Salvando as mudanças
                            console.log(`Saque de R$${saque.toFixed(2)} realizado com sucesso`);
                            console.log(`O saldo bancário da conta ${nome_conta_2} é R$${Contas[nome_conta_2].saldo.toFixed(2)}`);
                            console.log("Voltando para o menu de opções do programa...");
                            Menu_2();
                        }
                    });
                }
                break;
        
            default:
                console.log("Erro no programa!A opção escolhida é inválida!Por favor,tente novaente");
                DepositarOuSacar(nome_conta_2);
                break;
        }
    });
}

function RemoverConta(){
    console.log(`Contas existentes no programa bancário: `,Object.keys(Contas));
    rl.question(`Digite o nome da conta que você quer remover da lista: `,(remover_conta) => {
        if(Contas[remover_conta]){
            rl.question(`Insira a senha da conta ${remover_conta}: `,(senha_conta) => {
                if (Contas[remover_conta].senha === senha_conta){
                    //Verifiando se a conta bancária que o usuário quer remover ainda tem saldo bancário
                    if(Contas[remover_conta].saldo > 0){
                        console.log(`A conta ${remover_conta} não pode ser removida do programa pois ela ainda possui um saldo de R$${Contas[remover_conta].saldo.toFixed(2)}`);
                        console.log(`Retire todo o dinheiro da conta ${remover_conta} antes de excluir ela do programa`);
                        console.log("Você agora irá para a área de depósito ou saque para poder sacar o dinheiro da conta bancária que você quer excluir");
                        DepositarOuSacar();
                    }
                    else{
                        delete Contas[remover_conta]; //Remove a conta bancária caso ela não tiver dinheiro guardado
                        SalvarContas(); //Salva as mudanças feitas
                        console.log(`Conta bancária ${remover_conta} removida com sucesso`);
                        Menu_2();
                    }
                }
                else{
                    console.log(`A senha que você inseriu para acessar a conta ${remover_conta} está errada!Tente novamente`);
                    RemoverConta();
                }
            }); 
        }
        else{
            console.log(`Erro no programa!A conta ${remover_conta} não existe!Tente novamente`);
            RemoverConta();
        }
    });
}

function Encerrar(){
    console.log("Programa encerrado");
    rl.close();
}
