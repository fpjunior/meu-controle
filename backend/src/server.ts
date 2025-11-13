import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import rmRoutes from './routes/rm.routes';
import teamRoutes from './routes/team.routes';
import branchRoutes from './routes/branch.routes';
import teamsMessageRoutes from './routes/teamsMessage.routes';
import accessInfoRoutes from './routes/accessInfo.routes';
import dailyRoutes from './routes/daily.routes';
import importantLinkRoutes from './routes/importantLink.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rms', rmRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/teams-messages', teamsMessageRoutes);
app.use('/api/access-info', accessInfoRoutes);
app.use('/api/dailys', dailyRoutes);
app.use('/api/important-links', importantLinkRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`?? Server running on port ${PORT}`);
});

export default app;
