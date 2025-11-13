import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createImportantLink = async (req: AuthRequest, res: Response) => {
  try {
    const { title, url, description, category } = req.body;

    const link = await prisma.importantLink.create({
      data: {
        title,
        url,
        description,
        category,
        userId: req.userId!,
      },
    });

    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar link' });
  }
};

export const getAllImportantLinks = async (req: AuthRequest, res: Response) => {
  try {
    const links = await prisma.importantLink.findMany({
      where: { userId: req.userId },
      orderBy: { title: 'asc' },
    });

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar links' });
  }
};

export const updateImportantLink = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, url, description, category } = req.body;

    const link = await prisma.importantLink.update({
      where: { id },
      data: { title, url, description, category },
    });

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar link' });
  }
};

export const deleteImportantLink = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.importantLink.delete({ where: { id } });

    res.json({ message: 'Link deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar link' });
  }
};
