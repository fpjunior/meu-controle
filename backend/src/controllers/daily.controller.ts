import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createDaily = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, link, schedule, scrumMaster, participants } = req.body;

    const daily = await prisma.daily.create({
      data: {
        title,
        description,
        link,
        schedule,
        scrumMaster,
        userId: req.userId!,
        participants: {
          create: participants || [],
        },
      },
      include: { participants: true },
    });

    res.status(201).json(daily);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar daily' });
  }
};

export const getAllDailys = async (req: AuthRequest, res: Response) => {
  try {
    const dailys = await prisma.daily.findMany({
      where: { userId: req.userId },
      include: { participants: true },
      orderBy: { title: 'asc' },
    });

    res.json(dailys);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dailys' });
  }
};

export const updateDaily = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, link, schedule, scrumMaster } = req.body;

    const daily = await prisma.daily.update({
      where: { id },
      data: { title, description, link, schedule, scrumMaster },
      include: { participants: true },
    });

    res.json(daily);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar daily' });
  }
};

export const deleteDaily = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.daily.delete({ where: { id } });

    res.json({ message: 'Daily deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar daily' });
  }
};
