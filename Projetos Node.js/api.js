//Exemplo de um código que faz uma API simples usando a biblioteca express

//Importando o express para fazer o código da API
const express = require('express')
//Criando e inicializando para a API
const servidor = express()

//Parte da API que faz a requisição e a resposta 
//o conteúdo '/mensagem' deve ser inserido na barra de pesquisa superior de um navegador de pesquisa como o Google Chrome,o conteúdo chave de pesquisa deve ser assim:localhost:3000(pode ser qualquer outra porta definida no código)/mensagem(pode ser qualquer outra palavra chave definida no código)
servidor.get('/mensagem', (req,res) => {
    //Objeto que gera uma mensagem na API
    return res.json({mensagem: 'Nossa API está funcionando'})
})

servidor.get('/usuario', (req,res) => {
    //Objeto que gera uma mensagem na API
    return res.json({usuario: 'Lucas Gomes Santana'})
})


//Criando uma porta para o servidor da API "escutar"
servidor.listen(3000, () => { //3000 é o número da porta onde o servidor da API está configurado para rodar.O número da porta pode ser qualquer valor entre 0 e 65535, desde que essa porta não esteja em uso por outro serviço no seu sistema.
    //Mensagem que é impressa no terminal que indica que a API está funcionando coretamente
    console.log("O servidor está funcionando") 
})