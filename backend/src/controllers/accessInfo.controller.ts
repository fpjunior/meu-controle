import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createAccessInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, key, username, password, url, notes } = req.body;

    const accessInfo = await prisma.accessInfo.create({
      data: {
        name,
        description,
        key,
        username,
        password,
        url,
        notes,
        userId: req.userId!,
      },
    });

    res.status(201).json(accessInfo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar informação de acesso' });
  }
};

export const getAllAccessInfo = async (req: AuthRequest, res: Response) => {
  try {
    const accessInfos = await prisma.accessInfo.findMany({
      where: { userId: req.userId },
      orderBy: { name: 'asc' },
    });

    res.json(accessInfos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações de acesso' });
  }
};

export const updateAccessInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, key, username, password, url, notes } = req.body;

    const accessInfo = await prisma.accessInfo.update({
      where: { id },
      data: { name, description, key, username, password, url, notes },
    });

    res.json(accessInfo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar informação de acesso' });
  }
};

export const deleteAccessInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.accessInfo.delete({ where: { id } });

    res.json({ message: 'Informação de acesso deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar informação de acesso' });
  }
};
