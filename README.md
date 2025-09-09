# Desaparecidos MT - App

Este é um projeto de front-end desenvolvido como parte de um teste prático, que consome a API de pessoas desaparecidas da Polícia Judiciária Civil de Mato Grosso. A aplicação permite que os cidadãos consultem registros de pessoas desaparecidas ou localizadas e enviem informações adicionais que possam ajudar nas investigações.

# Dados de Inscrição

* [cite_start]**Nome:** Erick Rodrigues da Costa [cite: 1]
* [cite_start]**Telefone:** (065) 99922-7352 [cite: 3]
* [cite_start]**Email:** erickrodriguesdacosta@hotmail.com [cite: 4]
* [cite_start]**Github:** [https://github.com/erickrodricosta](https://github.com/erickrodricosta) [cite: 5]
* [cite_start]**Linkedin:** [https://www.linkedin.com/in/erick-rodrigues-32b336157](https://www.linkedin.com/in/erick-rodrigues-32b336157) [cite: 6]

# Funcionalidades

- **Consulta de Registros**: Exibe cards de pessoas desaparecidas e localizadas com paginação.
- **Busca Avançada**: Permite a filtragem por nome, faixa etária, sexo e status (desaparecido ou localizado).
- **Página de Detalhes**: Mostra informações completas sobre uma pessoa ao clicar em seu card, com destaque para o status.
- **Envio de Informações**: Um formulário modal permite que o usuário envie novas informações sobre uma pessoa, como data e local onde foi vista, além da possibilidade de anexar fotos.
- **Responsividade**: Layout adaptável para os principais tamanhos de tela.
- **Lazy Loading**: As rotas são carregadas de forma otimizada para melhorar a performance inicial da aplicação.

# Tecnologias Utilizadas

- **React**: Biblioteca principal para a construção da interface.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build para um desenvolvimento rápido e otimizado.
- **Tailwind CSS**: Framework CSS para estilização da aplicação.
- **React Router DOM**: Para gerenciamento de rotas na SPA.
- **Axios**: Cliente HTTP para consumir a API.
- **Docker**: Para criação de um ambiente conteinerizado da aplicação.
- **Nginx**: Servidor web utilizado no contêiner Docker para servir os arquivos estáticos.

# Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (ou outro gerenciador de pacotes)
- Docker (para execução com contêiner)

### Execução Local

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/erickrodricosta/desaparecidos-app.git](https://github.com/erickrodricosta/desaparecidos-app.git)
    cd desaparecidos-app
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

### Execução com Docker

1.  **Construa a imagem Docker:**

    ```bash
    docker build -t desaparecidos-app .
    ```

2.  **Execute o contêiner:**
    ```bash
    docker run -p 8080:80 desaparecidos-app
    ```
    A aplicação estará disponível em `http://localhost:8080`.

# Documentação da API

A documentação completa dos endpoints utilizados pode ser encontrada no seguinte endereço:
[https://abitus-api.geia.vip/swagger-ui/index.html](https://abitus-api.geia.vip/swagger-ui/index.html)
