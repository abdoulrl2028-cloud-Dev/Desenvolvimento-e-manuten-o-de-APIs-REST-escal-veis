import { UserService } from '../services';
import { CreateUserDTO } from '../dtos';
import { ConflictError } from '../exceptions/AppError';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      const dto: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      };

      const user = await userService.createUser(dto);

      expect(user).toBeDefined();
      expect(user.email).toBe(dto.email);
      expect(user.name).toBe(dto.name);
      expect(user.id).toBeDefined();
    });

    it('deve falhar se o email já existe', async () => {
      const dto: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      };

      await userService.createUser(dto);

      expect(async () => {
        await userService.createUser(dto);
      }).rejects.toThrow(ConflictError);
    });

    it('deve falhar se a senha é muito curta', async () => {
      const dto: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '123',
      };

      expect(async () => {
        await userService.createUser(dto);
      }).rejects.toThrow();
    });
  });

  describe('getAllUsers', () => {
    it('deve retornar lista vazia no início', async () => {
      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });
  });
});
