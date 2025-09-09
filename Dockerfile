# Estágio 1: Build da aplicação React
# Usamos uma imagem Node.js para instalar as dependências e construir o projeto
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o resto do código-fonte do projeto
COPY . .

# Executa o script de build para gerar os arquivos estáticos
RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
# Usamos uma imagem leve do Nginx para servir os arquivos estáticos gerados
FROM nginx:stable-alpine

# Copia os arquivos estáticos do estágio de build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o servidor Nginx quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]