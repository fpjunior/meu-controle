import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createTeam = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, members } = req.body;

    const team = await prisma.team.create({
      data: {
        name,
        description,
        members: {
          create: members || [],
        },
      },
      include: { members: true },
    });

    res.status(201).json(team);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Equipe com esse nome já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar equipe' });
  }
};

export const getAllTeams = async (req: AuthRequest, res: Response) => {
  try {
    const teams = await prisma.team.findMany({
      include: { members: true },
      orderBy: { name: 'asc' },
    });

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar equipes' });
  }
};

export const updateTeam = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const team = await prisma.team.update({
      where: { id },
      data: { name, description },
      include: { members: true },
    });

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar equipe' });
  }
};

export const deleteTeam = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.team.delete({ where: { id } });

    res.json({ message: 'Equipe deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar equipe' });
  }
};
