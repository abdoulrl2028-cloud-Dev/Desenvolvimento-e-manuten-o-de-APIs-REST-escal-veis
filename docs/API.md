# Documentação da API REST

## 📖 Guia Completo da API

Esta é a documentação completa da API REST escalável.

### Base URL
```
http://localhost:3000/api
```

## 🔐 Autenticação

Atualmente, a API não possui autenticação. Nos próximos updates, será implementado JWT.

## 📊 Modelos de Dados

### Usuário
```typescript
{
  id: string (UUID)
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}
```

### Produto
```typescript
{
  id: string (UUID)
  name: string
  description: string
  price: number
  stock: number
  categoryId: string
  createdAt: Date
  updatedAt: Date
}
```

### Categoria
```typescript
{
  id: string (UUID)
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
```

### Pedido
```typescript
{
  id: string (UUID)
  userId: string
  items: Array<{productId: string, quantity: number}>
  totalPrice: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}
```

## 🛣️ Endpoints Detalhados

### Usuários

#### GET /users
Retorna todos os usuários.

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "João Silva",
      "email": "joao@example.com",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### GET /users/:id
Retorna um usuário específico por ID.

**Parâmetros:**
- `id` (path) - UUID do usuário

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### POST /users
Cria um novo usuário.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  },
  "message": "Usuário criado com sucesso"
}
```

#### PUT /users/:id
Atualiza um usuário existente.

**Parâmetros:**
- `id` (path) - UUID do usuário

**Body:**
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva Atualizado",
    "email": "joao.novo@example.com",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T13:00:00.000Z"
  },
  "message": "Usuário atualizado com sucesso"
}
```

#### DELETE /users/:id
Deleta um usuário.

**Parâmetros:**
- `id` (path) - UUID do usuário

**Resposta (204):**
Sem conteúdo

### Produtos

#### GET /products
Retorna todos os produtos com suporte a paginação.

**Parâmetros Query:**
- `page` (optional) - Número da página (padrão: 1)
- `limit` (optional) - Limite de produtos por página (padrão: 10)

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "name": "Laptop",
      "description": "Laptop de alto desempenho",
      "price": 2500.00,
      "stock": 10,
      "categoryId": "cat123",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### POST /products
Cria um novo produto.

**Body:**
```json
{
  "name": "Laptop",
  "description": "Laptop de alto desempenho",
  "price": 2500.00,
  "stock": 10,
  "categoryId": "cat123"
}
```

### Categorias

#### GET /categories
Retorna todas as categorias.

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat123",
      "name": "Eletrônicos",
      "description": "Produtos eletrônicos em geral",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

#### POST /categories
Cria uma nova categoria.

**Body:**
```json
{
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos em geral"
}
```

### Pedidos

#### GET /orders
Retorna todos os pedidos.

**Parâmetros Query:**
- `userId` (optional) - Filtrar pedidos por ID do usuário

#### POST /orders
Cria um novo pedido.

**Body:**
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "items": [
    {
      "productId": "prod123",
      "quantity": 2
    }
  ]
}
```

## ❌ Códigos de Erro

| Código | Status | Descrição |
|--------|--------|-----------|
| NOT_FOUND | 404 | Recurso não encontrado |
| VALIDATION_ERROR | 400 | Erro de validação |
| CONFLICT | 409 | Conflito (ex: email duplicado) |
| UNAUTHORIZED | 401 | Não autorizado |
| FORBIDDEN | 403 | Acesso proibido |
| INTERNAL_SERVER_ERROR | 500 | Erro interno do servidor |

## 🔗 Health Check

#### GET /health
Verifica se a API está online.

**Resposta:**
```json
{
  "success": true,
  "message": "API está online",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```
