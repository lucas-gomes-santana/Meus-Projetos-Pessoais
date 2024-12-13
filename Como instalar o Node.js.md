Este é um tutorial escrito simples de como instalar o framework do javascript Node.js
OBS:Os comandos que serão passados aqui deverão ser inseridos no terminal do seu computador em sequência(de cima para baixo)
Se houver erros neste tutorial escrito.Deixe comentários na seção de discussões deste repositório

Instalando o Node.js no Windows
Baixe o instalador:

Acesse o site oficial do Node.js: https://nodejs.org.
Baixe a versão recomendada (LTS) para maior estabilidade.
Execute o instalador:

Clique duas vezes no arquivo baixado (.msi).
Siga as instruções do assistente de instalação.
Certifique-se de marcar a opção para instalar o gerenciador de pacotes npm.
Verifique a instalação:

Abra o Prompt de Comando (CMD) e execute:
node -v
npm -v

Isso exibirá as versões instaladas do Node.js e do npm.
Instalando o Node.js no Linux 
O processo de instalação do Node.js pode variar ligeiramente entre as diferentes distribuições Linux, pois cada uma usa um gerenciador de pacotes diferente ou configurações específicas. Aqui está uma visão geral das principais distribuições:

1. Ubuntu, Linux Mint e Debian
Essas distribuições usam o gerenciador de pacotes apt.

Instalação com o apt:
sudo ap update
sudo apt install nodejs npm
Nota: Essa versão pode estar desatualizada, dependendo do repositório.

2. Fedora, CentOS e RHEL
Essas distribuições usam o gerenciador de pacotes dnf ou yum.

Instalação com o dnf (Fedora) ou yum (CentOS/RHEL):
sudo dnf install nodejs npm   # Para Fedora
sudo yum install nodejs npm   # Para CentOS/RHEL

3. Arch Linux e Manjaro
Essas distribuições usam o gerenciador de pacotes pacman.

Instalação com o pacman:
sudo pacman -S nodejs npm

4. OpenSUSE
OpenSUSE usa o gerenciador de pacotes zypper.

Instalação com o zypper:
sudo zypper install nodejs npm

5. Distribuições baseadas no Linux genérico (via NVM)
Se a distribuição não tem suporte direto ou você deseja a maior flexibilidade, use o Node Version Manager (NVM). Esse método funciona em qualquer Linux:

Instalar o NVM:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
Após instalar, reinicie o terminal.

Instalar a versão LTS do Node.js com o NVM:
nvm install --lts

Instalando o Node.js no macOS
Baixe o instalador:

Acesse https://nodejs.org e baixe a versão recomendada (LTS).
Execute o instalador:

Abra o arquivo .pkg baixado e siga as instruções.
Verifique a instalação:

node -v
npm -v

(Opcional) Instale via Homebrew:

Se você usa o Homebrew, pode instalar com:
bash
Copiar código
brew install node
