# Guia de Desenvolvimento

## 🚀 Começando

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/rest-api-escalavel.git

# Entre no diretório
cd rest-api-escalavel

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env

# Inicie em modo desenvolvimento
npm run dev
```

### Estrutura de Pastas

Explique onde cada tipo de arquivo deve ir:

```
src/
├── controllers/     # Controladores HTTP
├── services/        # Lógica de negócio
├── repositories/    # Acesso a dados
├── models/          # Interfaces e tipos
├── dtos/            # Data Transfer Objects
├── routes/          # Definição de rotas
├── middlewares/     # Middlewares
├── utils/           # Funções utilitárias
├── exceptions/      # Classes de erro
└── tests/           # Testes
```

## 📝 Adicionando um Novo Endpoint

### 1. Criar o Modelo

```typescript
// src/models/index.ts
export interface INewResource {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Criar DTOs

```typescript
// src/dtos/index.ts
export class CreateNewResourceDTO {
  name!: string;
}

export class UpdateNewResourceDTO {
  name?: string;
}
```

### 3. Criar Repository

```typescript
// src/repositories/index.ts
export class NewResourceRepository {
  async findAll(): Promise<INewResource[]> {
    // implementação
  }

  async create(data: Omit<INewResource, 'id'>): Promise<INewResource> {
    // implementação
  }
}
```

### 4. Criar Service

```typescript
// src/services/index.ts
export class NewResourceService {
  private repository = new NewResourceRepository();

  async getAll(): Promise<INewResource[]> {
    return this.repository.findAll();
  }

  async create(dto: CreateNewResourceDTO): Promise<INewResource> {
    return this.repository.create(dto);
  }
}
```

### 5. Criar Controller

```typescript
// src/controllers/index.ts
const resourceService = new NewResourceService();

export const resourceController = {
  getAll: asyncHandler(async (req, res) => {
    const resources = await resourceService.getAll();
    res.status(200).json({ success: true, data: resources });
  }),

  create: asyncHandler(async (req, res) => {
    const resource = await resourceService.create(req.body);
    res.status(201).json({ success: true, data: resource });
  }),
};
```

### 6. Criar Rotas

```typescript
// src/routes/newresources.ts
import { Router } from 'express';
import { resourceController } from '../controllers';

const router = Router();

router.get('/resources', resourceController.getAll);
router.post('/resources', resourceController.create);

export default router;
```

### 7. Registrar Rotas

```typescript
// src/routes/index.ts
import newResourceRoutes from './newresources';

const router = Router();
router.use('/api', newResourceRoutes);
```

## 🧪 Escrevendo Testes

```typescript
// src/tests/newresource.test.ts
import { NewResourceService } from '../services';
import { CreateNewResourceDTO } from '../dtos';

describe('NewResourceService', () => {
  let service: NewResourceService;

  beforeEach(() => {
    service = new NewResourceService();
  });

  it('deve criar um recurso', async () => {
    const dto: CreateNewResourceDTO = { name: 'Teste' };
    const resource = await service.create(dto);
    
    expect(resource).toBeDefined();
    expect(resource.name).toBe('Teste');
  });
});
```

Executar testes:
```bash
npm test                 # Executar uma vez
npm run test:watch      # Modo watch
npm test -- --coverage  # Com cobertura
```

## 🔧 Padrões de Código

### Naming Conventions

- **Interfaces**: `I` + Nome (ex: `IUser`)
- **Classes**: PascalCase (ex: `UserService`)
- **Funções/Métodos**: camelCase (ex: `getUserById`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_RETRIES`)
- **Arquivo Routes**: plural (ex: `users.ts`)

### Tratamento de Erros

Sempre use as exceções customizadas:

```typescript
// ✅ Bom
if (!user) {
  throw new NotFoundError('Usuário');
}

// ❌ Evite
if (!user) {
  throw new Error('User not found');
}
```

### Validação

Valide em múltiplas camadas:

```typescript
// 1. Controller (validação básica)
// 2. Service (regras de negócio)
// 3. Repository (integridade)
```

### Async/Await

Sempre use async/await em vez de promises:

```typescript
// ✅ Bom
async function getUserById(id: string) {
  const user = await repository.findById(id);
  return user;
}

// ❌ Evite
function getUserById(id: string) {
  return repository.findById(id).then(user => user);
}
```

## 📚 Boas Práticas

### 1. DRY (Don't Repeat Yourself)
- Extraia lógica repetida para funções utilitárias
- Use composição de serviços

### 2. SOLID Principles
- **S**: Cada classe tem uma responsabilidade
- **O**: Aberto para extensão, fechado para modificação
- **L**: Classes derivadas devem ser substituíveis
- **I**: Interfaces específicas
- **D**: Dependa de abstrações, não de implementações

### 3. Type Safety
```typescript
// ✅ Bom - Tipagem explícita
async function create(data: CreateUserDTO): Promise<IUser>

// ❌ Evite - Tipagem implícita
async function create(data: any): any
```

### 4. Error Handling
```typescript
// ✅ Bom
try {
  const user = await userService.create(dto);
  res.status(201).json({ success: true, data: user });
} catch (error) {
  next(error); // Passa para error handler
}

// ❌ Evite
const user = await userService.create(dto); // Sem try/catch
```

### 5. Documentação
```typescript
/**
 * Cria um novo usuário
 * @param dto - Dados do usuário
 * @returns Usuário criado
 * @throws ConflictError se email já existe
 * @throws ValidationError se dados inválidos
 */
async create(dto: CreateUserDTO): Promise<IUser>
```

## 🔍 Debugging

### Console Logs
```typescript
console.log('mensagem:', objeto);
console.error('erro:', erro);
console.warn('aviso:', mensagem);
```

### Debugger do Node.js
```bash
# Execute com debugger
node --inspect dist/src/server.js

# Ou em dev mode
node --inspect-brk --require ts-node/register src/server.ts
```

## 📦 Variáveis de Ambiente

Sempre adicione novas variáveis ao `.env`:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
# Adicione suas variáveis aqui
```

## 🚀 Deploy

### Build
```bash
npm run build
```

### Docker
```bash
docker build -t api-rest .
docker run -p 3000:3000 api-rest
```

## ✅ Checklist para PR

- [ ] Código segue o padrão de naming
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem console.log na produção
- [ ] Tipos TypeScript corretos
- [ ] Sem erros de lint (`npm run lint`)
- [ ] Commit messages descritivas

---

**Bom desenvolvimento! 🚀**
