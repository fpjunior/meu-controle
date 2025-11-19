import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;
    console.log('Dados recebidos:', { name, role });
    
    const member = await prisma.teamMember.create({
      data: {
        name,
        role
      } as any // força tipo Unchecked
    });
    
    console.log('Funcionário criado:', member);
    res.status(201).json(member);
  } catch (error: any) {
    console.error('Erro ao cadastrar funcionário:', error);
    console.error('Mensagem:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar funcionário.', details: error.message });
  }
};

export const getTeamMembers = async (_req: Request, res: Response) => {
  try {
    const members = await prisma.teamMember.findMany();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionários.' });
  }
};
