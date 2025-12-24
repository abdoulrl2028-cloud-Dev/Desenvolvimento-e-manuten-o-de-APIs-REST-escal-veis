# Arquitetura da Aplicação

## 📐 Padrão de Arquitetura

Esta aplicação segue o padrão de arquitetura em **camadas** (Layered Architecture), que promove separação de responsabilidades, testabilidade e manutenibilidade.

## 🏗️ Camadas da Aplicação

### 1. **Camada de Apresentação (Controllers)**
- Responsável por receber requisições HTTP
- Valida entrada de dados
- Chama os serviços apropriados
- Retorna respostas padronizadas
- Não contém lógica de negócio

**Arquivo:** `src/controllers/index.ts`

```typescript
export const userController = {
  createUser: asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  }),
};
```

### 2. **Camada de Negócio (Services)**
- Contém toda a lógica de negócio
- Valida regras de negócio
- Coordena operações entre repositories
- Lança exceções customizadas
- Independente de como os dados são acessados

**Arquivo:** `src/services/index.ts`

```typescript
export class UserService {
  async createUser(dto: CreateUserDTO): Promise<IUser> {
    // Validações de negócio
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new ConflictError('Email já cadastrado');
    
    return this.userRepository.create(dto);
  }
}
```

### 3. **Camada de Acesso a Dados (Repositories)**
- Abstrai o acesso a dados
- Implementa padrão Repository
- Facilita testes e mudança de banco de dados
- Operações CRUD básicas

**Arquivo:** `src/repositories/index.ts`

```typescript
export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return users.find(u => u.email === email) || null;
  }

  async create(data: Omit<IUser, 'id'>): Promise<IUser> {
    const user = { id: uuidv4(), ...data };
    users.push(user);
    return user;
  }
}
```

### 4. **Camada de Modelos (Models)**
- Define interfaces e tipos TypeScript
- Representa estrutura de dados
- Sem implementação, apenas contrato

**Arquivo:** `src/models/index.ts`

```typescript
export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5. **Camada de Transfer Objects (DTOs)**
- Define estrutura de entrada/saída
- Validação de dados na entrada
- Separação entre modelo interno e externo

**Arquivo:** `src/dtos/index.ts`

```typescript
export class CreateUserDTO {
  name!: string;
  email!: string;
  password!: string;
}
```

### 6. **Camada de Rotas**
- Define endpoints e sua correspondência com controllers
- Organiza rotas por recurso
- Aplica middlewares específicos

**Arquivo:** `src/routes/index.ts`

```typescript
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
```

### 7. **Camada de Middlewares**
- Processamento transversal (cross-cutting concerns)
- Autenticação, logging, validação
- Tratamento de erros

**Arquivo:** `src/middlewares/index.ts`

```typescript
export const loggerMiddleware = (req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
};
```

### 8. **Camada de Exceções**
- Classes de erro customizadas
- Códigos de erro padronizados
- Status HTTP apropriados

**Arquivo:** `src/exceptions/AppError.ts`

```typescript
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} não encontrado`, 404, 'NOT_FOUND');
  }
}
```

## 📊 Fluxo de Requisição

```
Requisição HTTP
    ↓
Routes (Roteamento)
    ↓
Middlewares (CORS, Logger, etc)
    ↓
Controller (Validação básica)
    ↓
Service (Lógica de negócio)
    ↓
Repository (Acesso a dados)
    ↓
Database / In-Memory
    ↓
Repository (Retorna dados)
    ↓
Service (Processa resultado)
    ↓
Controller (Formata resposta)
    ↓
Response (JSON)
    ↓
Cliente HTTP
```

## 🔄 Ciclo de Vida de uma Requisição

### Exemplo: Criar um Usuário

1. **Cliente** envia POST `/api/users` com `{ name, email, password }`

2. **Router** encontra a rota e chama `userController.createUser`

3. **Controller** recebe a requisição e chama `userService.createUser(dto)`

4. **Service** executa:
   - Valida se email já existe: `findByEmail(email)`
   - Valida se senha é forte
   - Chama `userRepository.create(dto)`

5. **Repository** executa:
   - Gera UUID
   - Salva em memoria (ou DB)
   - Retorna usuário criado

6. **Service** retorna usuário ao controller

7. **Controller** retorna resposta 201 com dados do usuário

8. **Cliente** recebe resposta JSON

## 🎯 Princípios de Design

### Single Responsibility Principle (SRP)
Cada classe tem uma única responsabilidade:
- Controllers: Recebem requisições
- Services: Lógica de negócio
- Repositories: Acesso a dados

### Dependency Inversion
Dependências fluem de fora para dentro (injeção de dependências)

### DRY (Don't Repeat Yourself)
Funcionalidades comuns centralizadas em utils e middlewares

### Separation of Concerns
Cada camada cuida de sua responsabilidade específica

## 📁 Estrutura de Diretórios Completa

```
src/
├── config/
│   └── index.ts              # Configurações da aplicação
├── controllers/
│   └── index.ts              # Controllers de todos os recursos
├── services/
│   └── index.ts              # Services (regras de negócio)
├── repositories/
│   └── index.ts              # Repositories (acesso a dados)
├── models/
│   └── index.ts              # Interfaces e tipos
├── dtos/
│   └── index.ts              # Data Transfer Objects
├── middlewares/
│   ├── errorHandler.ts       # Tratamento de erros
│   └── index.ts              # Middlewares customizados
├── routes/
│   ├── users.ts              # Rotas de usuários
│   ├── products.ts           # Rotas de produtos
│   ├── categories.ts         # Rotas de categorias
│   ├── orders.ts             # Rotas de pedidos
│   └── index.ts              # Router principal
├── utils/
│   └── index.ts              # Funções utilitárias
├── exceptions/
│   └── AppError.ts           # Classes de erro
├── tests/
│   └── user.service.test.ts  # Testes automatizados
├── app.ts                    # Configuração do Express
└── server.ts                 # Entrada da aplicação
```

## 🧪 Testabilidade

A arquitetura em camadas facilita testes:

```typescript
// Teste unitário de Service
describe('UserService', () => {
  it('deve criar usuário', async () => {
    const userService = new UserService();
    const user = await userService.createUser({
      name: 'João',
      email: 'joao@test.com',
      password: 'senha123'
    });
    
    expect(user.email).toBe('joao@test.com');
  });
});
```

## 🔐 Escalabilidade

Esta arquitetura permite fácil expansão:

- **Adicionar novo recurso**: Crie controller → service → repository
- **Mudar banco de dados**: Apenas modifique repositories
- **Adicionar autenticação**: Apenas um middleware
- **Adicionar cache**: Layer adicional entre service e repository

## 📈 Performance

Otimizações possíveis:

1. Cache em Redis (implementar entre service e repository)
2. Paginação (já suportada em queries)
3. Índices no banco de dados
4. Compressão de resposta (gzip)
5. Rate limiting e throttling

---

**Essa arquitetura fornece uma base sólida e escalável para aplicações backend modernas.**
