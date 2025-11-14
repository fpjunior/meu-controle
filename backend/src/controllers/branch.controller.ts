import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createBranch = async (req: AuthRequest, res: Response) => {
  try {
    const { name, rmNumber, purpose, createdDate, status } = req.body;

    const branch = await prisma.branch.create({
      data: {
        name,
        rmNumber,
        purpose,
        createdDate: createdDate ? new Date(createdDate) : new Date(),
        status: status || 'active',
        userId: req.userId!,
      },
    });

    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar branch' });
  }
};

export const getAllBranches = async (req: AuthRequest, res: Response) => {
  try {
    const branches = await prisma.branch.findMany({
      where: { userId: req.userId },
      orderBy: { createdDate: 'desc' },
    });

    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar branches' });
  }
};

export const updateBranch = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, rmNumber, purpose, status } = req.body;

    const updatedBranch = await prisma.branch.update({
      where: { id },
      data: { name, rmNumber, purpose, status },
    });

    res.json(updatedBranch);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar branch' });
  }
};

export const deleteBranch = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.branch.delete({ where: { id } });

    res.json({ message: 'Branch deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar branch' });
  }
};
