# 1. Para construir a imagem, use o comando:
docker build -t chamadas-dev -f Dockerfile.dev .

# 2. Para rodar o container, use o comando:
docker run -d \
    -p 3000:3000 \
    -v /$(pwd):/app \
    --name chamadas-dev-container \
    chamadas-dev

# 3. Ver logs do container
docker logs -f chamadas-dev-container

# 4. Acessar o container no shell
docker exec -t chamadas-dev-container sh 

# 5. Parar o container
docker stop chamadas-dev-container

# 6. Remover o container
docker rm chamadas-dev-container

# 7. Limpeza geral (cuidado)
docker system prune -a

# 8. Copiar um arquido do container para o host
docker cp chamadas-dev-container:/app/arquivo.txt ./arquivo.txt

# 9. Instalar biblioteca em modo dev
npm install nodemon -D

============================
# 1. Para construir a imagem, use o comando:
docker build -t chamadas-prod -f Dockerfile.prod .

# 2. Para rodar o container, use o comando:
docker run -d \
    -p 3000:3000 \
    -v /$(pwd):/app \
    --name chamadas-prod-container \
    chamadas-prod

============================
# 1. Rodar os serviços
docker compose up -d
# ou --bulid para forçar a construção da imagem
docker compose up -d --build

# 2. Parar os serviços
docker compose down

# 3. Verificar os logs
docker compose logs -f

# 4. Verificar a configuração do nginx 
docker compose exec nginx nginx -t

# 5. Recarregar o nginx após alterações na configuração 
docker compose exec nginx nginx -s reload

===============================
# certificado ssl
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes -keyout nginx/certs/key.pem -out nginx/certs/cert.pem -subj "/CN=localhost"