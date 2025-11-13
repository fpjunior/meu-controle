import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createTeamsMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, classification, date } = req.body;

    const message = await prisma.teamsMessage.create({
      data: {
        title,
        content,
        classification: classification || 'normal',
        date: date ? new Date(date) : new Date(),
        userId: req.userId!,
      },
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar mensagem' });
  }
};

export const getAllTeamsMessages = async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.teamsMessage.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'desc' },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
};

export const updateTeamsMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, classification } = req.body;

    const message = await prisma.teamsMessage.update({
      where: { id },
      data: { title, content, classification },
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar mensagem' });
  }
};

export const deleteTeamsMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.teamsMessage.delete({ where: { id } });

    res.json({ message: 'Mensagem deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar mensagem' });
  }
};
