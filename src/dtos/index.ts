export class CreateUserDTO {
  name!: string;
  email!: string;
  password!: string;
}

export class UpdateUserDTO {
  name?: string;
  email?: string;
}

export class CreateProductDTO {
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  categoryId!: string;
}

export class UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}

export class CreateCategoryDTO {
  name!: string;
  description!: string;
}

export class UpdateCategoryDTO {
  name?: string;
  description?: string;
}

export class CreateOrderDTO {
  userId!: string;
  items!: Array<{
    productId: string;
    quantity: number;
  }>;
}

export class UserResponseDTO {
  id!: string;
  email!: string;
  name!: string;
  createdAt!: Date;
}

export class ProductResponseDTO {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  categoryId!: string;
  createdAt!: Date;
}
