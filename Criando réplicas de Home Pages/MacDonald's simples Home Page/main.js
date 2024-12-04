//Esse código de javascript será responsável pelas animações que irão acontecer no site

// Seleciona a imagem principal
const image = document.querySelector('#ImagemPrincipal');

// Caminhos das imagens para alternar
const firstImageSrc = "Imagens/Imagem1.png";
const secondImageSrc = "Imagens/Imagem18.png";

// Variável para rastrear o estado atual da imagem
let isShowingFirstImage = true;

// Adiciona o evento para alternar as imagens ao arrastar
image.addEventListener("mousedown", () => {
    const onMouseMove = () => {
        // Alterna entre as imagens
        image.src = isShowingFirstImage ? secondImageSrc : firstImageSrc;
        isShowingFirstImage = !isShowingFirstImage; // Atualiza o estado

        // Remove o ouvinte de movimento após a troca
        document.removeEventListener("mousemove", onMouseMove);
    };

    // Detecta o movimento do mouse
    document.addEventListener("mousemove", onMouseMove);

    // Remove ouvintes após o mouse ser solto
    document.addEventListener(
        "mouseup",
        () => {
            document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
    );
});
