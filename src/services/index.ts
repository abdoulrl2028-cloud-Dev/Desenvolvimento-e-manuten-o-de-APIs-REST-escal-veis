import { IUser, IProduct, ICategory, IOrder } from '../models';
import {
  UserRepository,
  ProductRepository,
  CategoryRepository,
  OrderRepository,
} from '../repositories';
import {
  CreateUserDTO,
  UpdateUserDTO,
  CreateProductDTO,
  UpdateProductDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  CreateOrderDTO,
} from '../dtos';
import { ValidationError, NotFoundError, ConflictError } from '../exceptions/AppError';

export class UserService {
  private userRepository = new UserRepository();

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('Usuário');
    return user;
  }

  async createUser(dto: CreateUserDTO): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new ConflictError('Email já cadastrado');

    if (dto.password.length < 6) {
      throw new ValidationError('Senha deve ter no mínimo 6 caracteres');
    }

    return this.userRepository.create(dto);
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<IUser> {
    const user = await this.getUserById(id);

    if (dto.email && dto.email !== user.email) {
      const existing = await this.userRepository.findByEmail(dto.email);
      if (existing) throw new ConflictError('Email já cadastrado');
    }

    return this.userRepository.update(id, dto) as Promise<IUser>;
  }

  async deleteUser(id: string): Promise<void> {
    const exists = await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}

export class ProductService {
  private productRepository = new ProductRepository();
  private categoryRepository = new CategoryRepository();

  async getAllProducts(page?: number, limit?: number): Promise<{ data: IProduct[]; total: number }> {
    return this.productRepository.findAll(page, limit);
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError('Produto');
    return product;
  }

  async createProduct(dto: CreateProductDTO): Promise<IProduct> {
    const category = await this.categoryRepository.findById(dto.categoryId);
    if (!category) throw new NotFoundError('Categoria');

    if (dto.price <= 0) throw new ValidationError('Preço deve ser maior que zero');
    if (dto.stock < 0) throw new ValidationError('Estoque não pode ser negativo');

    return this.productRepository.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDTO): Promise<IProduct> {
    const product = await this.getProductById(id);

    if (dto.categoryId) {
      const category = await this.categoryRepository.findById(dto.categoryId);
      if (!category) throw new NotFoundError('Categoria');
    }

    if (dto.price !== undefined && dto.price <= 0) {
      throw new ValidationError('Preço deve ser maior que zero');
    }

    return this.productRepository.update(id, dto) as Promise<IProduct>;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.getProductById(id);
    await this.productRepository.delete(id);
  }
}

export class CategoryService {
  private categoryRepository = new CategoryRepository();
  private productRepository = new ProductRepository();

  async getAllCategories(): Promise<ICategory[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundError('Categoria');
    return category;
  }

  async createCategory(dto: CreateCategoryDTO): Promise<ICategory> {
    return this.categoryRepository.create(dto);
  }

  async updateCategory(id: string, dto: UpdateCategoryDTO): Promise<ICategory> {
    await this.getCategoryById(id);
    return this.categoryRepository.update(id, dto) as Promise<ICategory>;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.getCategoryById(id);

    const products = await this.productRepository.findByCategory(id);
    if (products.length > 0) {
      throw new ValidationError('Não é possível deletar uma categoria com produtos');
    }

    await this.categoryRepository.delete(id);
  }
}

export class OrderService {
  private orderRepository = new OrderRepository();
  private productRepository = new ProductRepository();
  private userRepository = new UserRepository();

  async getAllOrders(userId?: string): Promise<IOrder[]> {
    return this.orderRepository.findAll(userId);
  }

  async getOrderById(id: string): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundError('Pedido');
    return order;
  }

  async createOrder(dto: CreateOrderDTO): Promise<IOrder> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) throw new NotFoundError('Usuário');

    let totalPrice = 0;

    for (const item of dto.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) throw new NotFoundError(`Produto ${item.productId}`);

      if (product.stock < item.quantity) {
        throw new ValidationError(`Estoque insuficiente para o produto ${product.name}`);
      }

      totalPrice += product.price * item.quantity;
    }

    return this.orderRepository.create({
      ...dto,
      totalPrice,
      status: 'pending',
    });
  }

  async updateOrderStatus(
    id: string,
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ): Promise<IOrder> {
    await this.getOrderById(id);
    return this.orderRepository.update(id, { status }) as Promise<IOrder>;
  }

  async cancelOrder(id: string): Promise<IOrder> {
    const order = await this.getOrderById(id);
    if (order.status === 'delivered') {
      throw new ValidationError('Não é possível cancelar um pedido entregue');
    }
    return this.updateOrderStatus(id, 'cancelled');
  }
}
