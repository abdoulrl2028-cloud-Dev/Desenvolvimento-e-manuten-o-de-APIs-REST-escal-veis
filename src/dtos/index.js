/**
 * DTO - Data Transfer Object para Usuário
 */
export class CreateUserDTO {
  constructor(data) {
    this.name = data?.name?.trim() || '';
    this.email = data?.email?.toLowerCase().trim() || '';
    this.password = data?.password || '';
  }

  validate() {
    const errors = {};

    if (!this.name || this.name.length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      errors.email = 'Email inválido';
    }

    if (!this.password || this.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}

export class UpdateUserDTO {
  constructor(data) {
    if (data?.name) this.name = data.name.trim();
    if (data?.email) this.email = data.email.toLowerCase().trim();
  }

  validate() {
    const errors = {};

    if (this.name && this.name.length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (this.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        errors.email = 'Email inválido';
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}

/**
 * DTO para Produto
 */
export class CreateProductDTO {
  constructor(data) {
    this.name = data?.name?.trim() || '';
    this.description = data?.description?.trim() || '';
    this.price = parseFloat(data?.price) || 0;
    this.stock = parseInt(data?.stock) || 0;
    this.category = data?.category?.trim() || '';
    this.sku = data?.sku?.toUpperCase().trim() || '';
  }

  validate() {
    const errors = {};

    if (!this.name || this.name.length < 3) {
      errors.name = 'Nome do produto deve ter pelo menos 3 caracteres';
    }

    if (this.price <= 0) {
      errors.price = 'Preço deve ser maior que 0';
    }

    if (this.stock < 0) {
      errors.stock = 'Estoque não pode ser negativo';
    }

    if (!this.category) {
      errors.category = 'Categoria é obrigatória';
    }

    if (!this.sku) {
      errors.sku = 'SKU é obrigatório';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}

export class UpdateProductDTO {
  constructor(data) {
    if (data?.name) this.name = data.name.trim();
    if (data?.description) this.description = data.description.trim();
    if (data?.price !== undefined) this.price = parseFloat(data.price);
    if (data?.stock !== undefined) this.stock = parseInt(data.stock);
    if (data?.category) this.category = data.category.trim();
  }

  validate() {
    const errors = {};

    if (this.name && this.name.length < 3) {
      errors.name = 'Nome do produto deve ter pelo menos 3 caracteres';
    }

    if (this.price !== undefined && this.price <= 0) {
      errors.price = 'Preço deve ser maior que 0';
    }

    if (this.stock !== undefined && this.stock < 0) {
      errors.stock = 'Estoque não pode ser negativo';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}

/**
 * DTO para Pedido
 */
export class CreateOrderDTO {
  constructor(data) {
    this.userId = data?.userId || '';
    this.items = data?.items || [];
    this.deliveryAddress = data?.deliveryAddress?.trim() || '';
  }

  validate() {
    const errors = {};

    if (!this.userId) {
      errors.userId = 'ID do usuário é obrigatório';
    }

    if (!Array.isArray(this.items) || this.items.length === 0) {
      errors.items = 'Pedido deve conter pelo menos um item';
    }

    if (!this.deliveryAddress) {
      errors.deliveryAddress = 'Endereço de entrega é obrigatório';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}
