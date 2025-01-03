//Este código armazena as tarefas que são salvas no array tarefas em um arquivo chamado "tarefas/json" para guardar de forma permanente as tarefas mesmo se o usuário sair do VS code
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,output:process.stdout
});

//Indicando o caminho do arquivo.json onde as tarefas ficarão armazenadas
const filePath = path.join(__dirname,'Tarefas.json');

//Carregando as tarefas desse arquivo para o json
function CarregarTarefas() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(data); // Tenta fazer o parse do JSON
        } catch (error) {
            console.log("Erro ao carregar as tarefas: JSON inválido. Inicializando como vazio.");
            return []; // Se o JSON estiver corrompido, inicializa como vazio
        }
    } else {
        fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8'); // Cria o arquivo vazio
        return [];
    }
}

//Salva as tarefas no arquivo.JSON
function SalvarTarefas(){
    fs.writeFileSync(filePath,JSON.stringify(tarefas,null,2),'utf-8');
}

//Inicializa as tarefas carregando-as deste arquivo para o JSON
let tarefas = CarregarTarefas();


Inicio()//Essa função que foi chamada no final do código é o que define por onde o código começará a ser executado quando ele for iniciado

function Inicio(){
    console.log("Olá,seja bem vindo a este programa simples de lista de tarefas 2.0 feito em javascript");
    console.log("Esta nova versão comta com várias funcionalidades novas em comparação com o programa anterior");
    rl.question(`Você quer iniciar e usar o programa ou quer sair?(digite INICIAR para começar a list,SAIR para fechar o programa,ou MENU para ir direto ao menu de recursos do programa)\n`,(resposta) => {

        if (resposta.toLocaleLowerCase() === "iniciar"){
        DefinirTarefas();
        }
        else if (resposta.toLocaleLowerCase() === "menu"){
            Recursos();
        }
        else if (resposta.toLocaleLowerCase() === "sair"){
            Encerrar();
        }
        else{
            console.log("Erro no programa!A resposta inserida é inválida!Por favor,tente novamente")
            Inicio();
        }
    });
}

function DefinirTarefas(){
    rl.question(`Digite uma tarefa que você quer fazer para ser armazenada na lista: `,(tarefa) => {
        tarefa = tarefa.trim(); // Remove espaços extras antes e depois das palavras
        if (!isNaN(tarefa)){
            console.log(`Erro no programa!O conteúdo ${tarefa} não conta como tarefa nessa lista.Por favor,digite uma tarefa válida!`);
            DefinirTarefas();
        }
        else if (tarefas.includes(tarefa)){
            console.log(`A tarefa ${tarefa} já está contida na lista.Por favor,digite uma outra tarefa diferente`);
            DefinirTarefas();
        }
        //Verificando se a tarefa está vazia
        else if(!tarefa){
            console.log("Erro no programa!A tarefa não pode estar vazia ou conter somente espaços.Digite uma tarefa válida!");
            DefinirTarefas();
        }
        else{
            tarefa = tarefa.toLocaleLowerCase();
            tarefas.push(tarefa);
            SalvarTarefas(); // Salva a lista atualizada
            console.log(`A tarefa ${tarefa} está dentro da lista agora`);
            DefinirTarefas_2();

            function DefinirTarefas_2(){
                rl.question(`Você quer guardar outra tarefa ou vai fechar a lista?(digite MAIS UMA para definir outra tarefa ou FECHAR para sair e salvar a lista)\n`,(resposta_2) => {

                    if (resposta_2.toLocaleLowerCase() === "mais uma" || resposta_2.toLocaleLowerCase() === "maisuma"){
                        DefinirTarefas();
                    }
                    else if (resposta_2.toLocaleLowerCase() === "fechar"){
                        console.log("As alterações feitas na lista foram salvas");
                        PerguntaAoUsuario();
                    }
                    else{
                        console.log("Erro no programa!A resposta inserida é inválida!Por favor,tente novamnete");
                        DefinirTarefas_2();
                    }
                    
                });
            }
        }
    });
}

function PerguntaAoUsuario(){
    console.log("Existem alguns recursos desta lista que podem ser explorados")
    rl.question(`Vocẽ quer usá-los ou quer sair de vez do programa?(digite MENU para ir para o menu de recursos ou ENCERRAR para encerrar o programa)\n`,(resposta_3) => {

        if (resposta_3.toLocaleLowerCase() === "menu"){
            Recursos();
        }
        else if (resposta_3.toLocaleLowerCase() === "encerrar"){
            Encerrar();
        }
        else{
            console.log("Erro no programa!A resposta inserida é inválida!Por favor,tente novamente")
            PerguntaAoUsuario();
        }
    });
}

function Recursos(){
    console.log("Seja bem vindo ao menu de recursos");
    rl.question(`
Digite a tecla 1 para ver as tarefas da lista
Digite 2 para remover uma tarefa da lista
Digite 3 para voltar a adicionar tarefas na lista
Digite 4 para sair do programa\n`,(opcao) => {
        
        opcao = parseInt(opcao);

        switch (opcao) {
            case 1:
                ExibirTarefas();
                break;

            case 2:
                RemoverTarefas();
                break;

            case 3:
                DefinirTarefas();
                break;

            case 4:
                Encerrar();
                break;
        
            default:
                console.log(`Erro no programa!A opção ${opcao} não exite no menu de recursos!Por favor,escolha apenas uma das opções oferecidas pelo programa`);
                Recursos();
                break;
        }
    })
}

function ExibirTarefas(){

    if (tarefas.length === 0){
        console.log("A lista de tarefas está vazia")
    }

    console.log("As tarefas da lista são:");
    for (let i = 0;i < tarefas.length;i++){
        console.log(tarefas[i]);
    }
    PerguntaAoUsuario_2();

    function PerguntaAoUsuario_2(){
        rl.question(`Você quer voltar ao menu de recursos ou quer sair do programa?(digite VOLTAR ou SAIR)\n`,(resposta_4) => {
            if (resposta_4.toLowerCase() === "voltar"){
                Recursos();
            }
            else if (resposta_4.toLowerCase() === "sair"){
                Encerrar();
            }
            else{
                console.log("Erro no programa!A resposta inserida é inválida!.Por favor,tente novamente")
                PerguntaAoUsuario_2();
            }
        });
    }
}

function RemoverTarefas(){
    console.log(`Tarefas que estão na lista: `,tarefas); //Para escrever um array dentro de um console.log,deve-se separar o nome do array com uma vírgula fora do conteúdo entre as crases,semalhante a outras linguagens de programação
    rl.question(`Qual dessas tarefas você quer remover da lista?(digite o nome da tarefa que você quer remover)\n`,(remover) => {

        if (tarefas.includes(remover)){

            const posicao = tarefas.indexOf(remover);
            tarefas.splice(posicao, 1);
            SalvarTarefas(); // Salva a lista após a remoção da tarefa
            console.log(`A tarefa ${remover} foi removida da lista`);
            console.log(`Tarefas contidas na lista agora: `,tarefas);
            PerguntaAoUsuario_3();

            function PerguntaAoUsuario_3(){
                rl.question(`Você quer remover outra tarefa da lista ou quer voltar ao menu de recursos?(digite REMOVER ou VOLTAR)\n`,(resposta_5) => {

                    if (resposta_5.toLocaleLowerCase() === "remover"){
                        RemoverTarefas();
                    }
                    else if (resposta_5.toLocaleLowerCase() === "voltar"){
                        Recursos()
                    }
                    else{
                        console.log("Erro no programa!A resposta inserida não é válida!Por favor,tente novamente")
                        PerguntaAoUsuario_3();
                    }
                });
            }
        }
        //Se a lista de tarefas estiver vazia o programa não deixará o usuário remover mais tarefas pois não tem nenhuma
        else if (tarefas.length === 0){
            console.log(`A lista de tarefas está vazia,portanto,não há mais tarefas que possam ser removidas`)
            Recursos();
        }
        else{
            console.log(`Erro no programa,a tarefa ${remover} não existe na lista!Por favor,insira tarefas que estão na lista`)
            RemoverTarefas();
        }
    });
}

function Encerrar(){
    console.log("Programa encerrado");
    rl.close();
}
