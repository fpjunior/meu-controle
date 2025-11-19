import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../utils/prisma';

export const createRM = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Dados recebidos:', req.body);
    console.log('User ID:', req.userId);
    
    // Verificar se o usu�rio existe
    const user = await prisma.user.findUnique({
      where: { id: req.userId! }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Usu�rio n�o encontrado. Fa�a login novamente.' });
    }
    
    const { rmNumber, description, observations, implementationDate, branchName, status, type, createdAt } = req.body;

    const allowedStatus = ['pending', 'preparado', 'in-progress', 'implanted', 'closed'];
    const statusValue = allowedStatus.includes(status) ? status : 'pending';
    const rm = await prisma.rM.create({
      data: {
        rmNumber,
        description,
        observations,
        implementationDate: implementationDate ? new Date(implementationDate) : null,
        branchName,
        status: statusValue,
        type: type || 'RM',
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        userId: req.userId!,
      },
    });

    res.status(201).json(rm);
  } catch (error: any) {
    console.error('Erro ao criar RM:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'RM Number j� existe' });
    }
    if (error.code === 'P2003') {
      return res.status(401).json({ error: 'Usu�rio inv�lido. Fa�a login novamente.' });
    }
    res.status(500).json({ error: 'Erro ao criar RM' });
  }
};

export const getAllRMs = async (req: AuthRequest, res: Response) => {
  try {
    const rms = await prisma.rM.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(rms);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar RMs' });
  }
};

export const getRM = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const rm = await prisma.rM.findFirst({
      where: { id, userId: req.userId },
    });

    if (!rm) {
      return res.status(404).json({ error: 'RM n�o encontrada' });
    }

    res.json(rm);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar RM' });
  }
};

export const updateRM = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
  const { rmNumber, description, observations, implementationDate, branchName, status, type, createdAt } = req.body;

    const rm = await prisma.rM.findFirst({
      where: { id, userId: req.userId },
    });

    if (!rm) {
      return res.status(404).json({ error: 'RM n�o encontrada' });
    }

    const allowedStatus = ['pending', 'preparado', 'in-progress', 'implanted', 'closed'];
    const statusValue = allowedStatus.includes(status) ? status : rm.status;
    const updatedRM = await prisma.rM.update({
      where: { id },
      data: {
        rmNumber,
        description,
        observations,
        implementationDate: implementationDate ? new Date(implementationDate) : null,
        branchName,
        status: statusValue,
        type: type || 'RM',
        createdAt: createdAt ? new Date(createdAt) : rm.createdAt,
      },
    });

    res.json(updatedRM);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'RM Number j� existe' });
    }
    res.status(500).json({ error: 'Erro ao atualizar RM' });
  }
};

export const deleteRM = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const rm = await prisma.rM.findFirst({
      where: { id, userId: req.userId },
    });

    if (!rm) {
      return res.status(404).json({ error: 'RM n�o encontrada' });
    }

    await prisma.rM.delete({ where: { id } });

    res.json({ message: 'RM deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar RM' });
  }
};
