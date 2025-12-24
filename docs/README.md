# Documentação da Estrutura

Bem-vindo à documentação completa da API REST Escalável!

## 📑 Índice

1. **[API.md](./API.md)** - Referência completa dos endpoints
   - Modelos de dados
   - Endpoints com exemplos
   - Códigos de erro

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Design e arquitetura
   - Padrão em camadas
   - Fluxo de requisição
   - Estrutura de diretórios

3. **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia de desenvolvimento
   - Como adicionar novos endpoints
   - Padrões de código
   - Boas práticas

## 🎯 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev

# API disponível em http://localhost:3000
```

## 📖 Estrutura do Projeto

```
project/
├── src/
│   ├── config/          # Configurações
│   ├── controllers/     # HTTP Controllers
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Acesso a dados
│   ├── models/          # Interfaces
│   ├── dtos/            # Data Transfer Objects
│   ├── routes/          # Rotas
│   ├── middlewares/     # Middlewares
│   ├── utils/           # Utilidades
│   ├── exceptions/      # Tratamento de erros
│   ├── tests/           # Testes
│   ├── app.ts           # Express App
│   └── server.ts        # Servidor
├── docs/                # Documentação
├── .env                 # Variáveis de ambiente
├── docker-compose.yml   # Composição Docker
├── Dockerfile           # Docker Image
├── package.json         # Dependências
└── README.md            # Projeto README
```

## 🚀 Primeiros Passos

### 1. Configuração Inicial
- Clone o repositório
- Execute `npm install`
- Configure `.env`

### 2. Iniciar Servidor
```bash
npm run dev
```

### 3. Testar API
```bash
curl http://localhost:3000/health
```

## 📚 Recursos Principais

- **Usuários**: Gerenciamento de usuários
- **Produtos**: Catálogo de produtos
- **Categorias**: Organização de produtos
- **Pedidos**: Sistema de pedidos

## 🔒 Segurança

- Helmet.js para headers
- CORS configurável
- Validação de entrada
- Tratamento centralizado de erros

## 🧪 Testes

```bash
npm test                # Executar testes
npm run test:watch     # Modo watch
```

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue.

---

**Desenvolvido com ❤️ para aplicações escaláveis e resilientes**
