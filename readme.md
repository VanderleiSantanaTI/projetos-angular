2.1. Criar um Arquivo de Proxy
No diretório raiz do seu projeto Angular/Ionic, crie o arquivo proxy.conf.json:

json
Copiar
Editar
{
  "/api": {
    "target": "http://77.37.69.33/alphacode/public/v1",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}


2.2. Configurar o Proxy no angular.json
No arquivo angular.json, configure o proxy no comando serve:

json
Copiar
Editar
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}


O erro relatado indica que o navegador está bloqueando a requisição à API devido à política de CORS (Cross-Origin Resource Sharing). Isso ocorre porque a aplicação Angular/Ionic (rodando em http://localhost:8100) está tentando acessar um recurso em http://77.37.69.33 sem as permissões CORS configuradas corretamente no servidor.

Solução 1: Configurar CORS no Servidor
A solução definitiva é configurar o servidor para permitir requisições CORS. Abaixo estão exemplos de como configurar isso em diferentes tecnologias:

1.1. Em PHP
No arquivo de entrada da API (por exemplo, index.php ou no controlador principal), adicione os cabeçalhos CORS:

php
Copiar
Editar
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
Se o servidor usa Laravel, configure o CORS em app/Http/Middleware/ ou no pacote CORS:

Instale o pacote de CORS no Laravel:

bash
Copiar
Editar
composer require fruitcake/laravel-cors
Configure em config/cors.php:

php
Copiar
Editar
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
1.2. Em Node.js (Express)
Se o back-end for Node.js com Express, instale e configure o middleware CORS:

bash
Copiar
Editar
npm install cors
No arquivo principal do servidor (ex.: app.js ou server.js):

javascript
Copiar
Editar
const cors = require('cors');
app.use(cors());
Para mais controle, configure opções específicas:

javascript
Copiar
Editar
app.use(
  cors({
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
Solução 2: Usar Proxy no Angular/Ionic
Se não puder alterar o servidor, configure um proxy para evitar o erro de CORS durante o desenvolvimento.

2.1. Criar um Arquivo de Proxy
No diretório raiz do seu projeto Angular/Ionic, crie o arquivo proxy.conf.json:

json
Copiar
Editar
{
  "/api": {
    "target": "http://77.37.69.33/alphacode/public/v1",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
2.2. Configurar o Proxy no angular.json
No arquivo angular.json, configure o proxy no comando serve:

json
Copiar
Editar
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}


2.3. Alterar o Serviço para Usar o Proxy
No serviço DataService, altere a URL da API para usar o proxy:

private apiUrl = '/api/contatos/';

2.4. Rodar o Servidor com Proxy
Execute o servidor Angular/Ionic com:
ionic serve
