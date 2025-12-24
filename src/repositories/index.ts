import { v4 as uuidv4 } from 'uuid';
import { IUser, IProduct, ICategory, IOrder } from '../models';

// Simulated in-memory database
let users: IUser[] = [];
let products: IProduct[] = [];
let categories: ICategory[] = [];
let orders: IOrder[] = [];

// User Repository
export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return users;
  }

  async findById(id: string): Promise<IUser | null> {
    return users.find(u => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return users.find(u => u.email === email) || null;
  }

  async create(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const user: IUser = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(user);
    return user;
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}

// Product Repository
export class ProductRepository {
  async findAll(page?: number, limit?: number): Promise<{ data: IProduct[]; total: number }> {
    const total = products.length;
    if (page && limit) {
      const start = (page - 1) * limit;
      const data = products.slice(start, start + limit);
      return { data, total };
    }
    return { data: products, total };
  }

  async findById(id: string): Promise<IProduct | null> {
    return products.find(p => p.id === id) || null;
  }

  async findByCategory(categoryId: string): Promise<IProduct[]> {
    return products.filter(p => p.categoryId === categoryId);
  }

  async create(data: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProduct> {
    const product: IProduct = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(product);
    return product;
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    const product = products.find(p => p.id === id);
    if (!product) return null;
    Object.assign(product, data, { updatedAt: new Date() });
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  }
}

// Category Repository
export class CategoryRepository {
  async findAll(): Promise<ICategory[]> {
    return categories;
  }

  async findById(id: string): Promise<ICategory | null> {
    return categories.find(c => c.id === id) || null;
  }

  async create(data: Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICategory> {
    const category: ICategory = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categories.push(category);
    return category;
  }

  async update(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
    const category = categories.find(c => c.id === id);
    if (!category) return null;
    Object.assign(category, data, { updatedAt: new Date() });
    return category;
  }

  async delete(id: string): Promise<boolean> {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  }
}

// Order Repository
export class OrderRepository {
  async findAll(userId?: string): Promise<IOrder[]> {
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    return orders;
  }

  async findById(id: string): Promise<IOrder | null> {
    return orders.find(o => o.id === id) || null;
  }

  async create(data: Omit<IOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<IOrder> {
    const order: IOrder = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    orders.push(order);
    return order;
  }

  async update(id: string, data: Partial<IOrder>): Promise<IOrder | null> {
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    Object.assign(order, data, { updatedAt: new Date() });
    return order;
  }

  async delete(id: string): Promise<boolean> {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  }
}
