import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import { UserService } from '../services';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';

const userService = new UserService();

export const userController = {
  getAllUsers: asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
      total: users.length,
    });
  }),

  getUserById: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  }),

  createUser: asyncHandler(async (req: Request, res: Response) => {
    const dto: CreateUserDTO = req.body;
    const user = await userService.createUser(dto);
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuário criado com sucesso',
    });
  }),

  updateUser: asyncHandler(async (req: Request, res: Response) => {
    const dto: UpdateUserDTO = req.body;
    const user = await userService.updateUser(req.params.id, dto);
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuário atualizado com sucesso',
    });
  }),

  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  }),
};

export const productController = {
  getAllProducts: asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const result = await userService['productRepository']?.findAll(page, limit) || { data: [], total: 0 };
    res.status(200).json({
      success: true,
      ...result,
    });
  }),
};

export const categoryController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Categorias listadas com sucesso',
    });
  }),
};

export const orderController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Pedidos listados com sucesso',
    });
  }),
};
