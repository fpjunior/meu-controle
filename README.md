# Meu Controle - Sistema de Organização de Trabalho

Sistema web completo para organização e controle de informações de trabalho para desenvolvedores full-stack.

## ?? Funcionalidades

- **RMs (Requisições de Mudança)**: Gerencie RMs com data de implantação, descrição, observações, número IB e branch relacionada
- **Equipes**: Controle de equipes, membros e hierarquia organizacional
- **Branches**: Acompanhamento de branches com IB vinculado e finalidade
- **Mensagens Teams**: Armazene mensagens importantes do Teams com classificação
- **Informações de Acesso**: Guarde credenciais e chaves de acesso de forma segura
- **Dailys**: Controle de reuniões com links, participantes e scrum master
- **Links Importantes**: Organize links de ferramentas do dia a dia

## ?? Tecnologias

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- Bcrypt para hash de senhas

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios

## ?? Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- Git

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd meu-controle
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
copy .env.example .env

# Editar .env e configurar sua conexão PostgreSQL
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/meu_controle?schema=public"
# JWT_SECRET="seu_secret_super_seguro_aqui"

# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Iniciar servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 3. Configurar Frontend

Abra um novo terminal:

```bash
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
copy .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## ?? Scripts Disponíveis

### Backend

- `npm run dev` - Inicia servidor em modo desenvolvimento com hot-reload
- `npm run build` - Compila o código TypeScript
- `npm start` - Inicia servidor de produção
- `npm run prisma:generate` - Gera Prisma Client
- `npm run prisma:migrate` - Executa migrations do banco
- `npm run prisma:studio` - Abre Prisma Studio (GUI do banco)

### Frontend

- `npm run dev` - Inicia aplicação em modo desenvolvimento
- `npm run build` - Compila aplicação para produção
- `npm run preview` - Preview da build de produção

## ?? Estrutura do Banco de Dados

```
User
?? RMs (Requisições de Mudança)
?? Branches
?? TeamsMessages
?? AccessInfo
?? Dailys
?  ?? DailyParticipants
?? ImportantLinks

Team
?? TeamMembers
```

## ?? Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação. O token é armazenado no localStorage e enviado em todas as requisições autenticadas.

### Primeiro Acesso

1. Acesse `http://localhost:5173/register`
2. Crie sua conta com email, senha e nome
3. Faça login e comece a usar

## ?? Deploy

### Frontend (Vercel)

```bash
cd frontend
npm run build

# Deploy para Vercel
# Adicione variável de ambiente:
# VITE_API_URL=https://seu-backend.railway.app/api
```

### Backend (Railway/Render)

1. Crie conta no Railway ou Render
2. Conecte seu repositório
3. Configure variáveis de ambiente:
   - `DATABASE_URL` - URL do PostgreSQL fornecida pelo serviço
   - `JWT_SECRET` - Secret seguro para JWT
   - `PORT` - Porta (geralmente 3001)
   - `FRONTEND_URL` - URL do frontend deployado
4. O serviço irá:
   - Instalar dependências
   - Executar `prisma generate`
   - Executar `prisma migrate deploy`
   - Iniciar aplicação com `npm start`

### Banco de Dados

Você pode usar:
- **Railway** - PostgreSQL gratuito incluso
- **Render** - PostgreSQL gratuito
- **Supabase** - PostgreSQL gratuito
- **Neon** - PostgreSQL serverless gratuito

## ?? Configuração de Ambiente

### Backend (.env)

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meu_controle?schema=public"
JWT_SECRET="seu_secret_super_seguro_aqui_mude_em_producao"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001/api
```

## ?? Segurança

- Senhas são hasheadas com bcrypt antes de serem salvas
- Tokens JWT expiram em 7 dias
- CORS configurado para permitir apenas frontend autorizado
- Todas as rotas (exceto login/register) requerem autenticação

## ?? Personalização

### Modificar Cores (TailwindCSS)

Edite `frontend/tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#3b82f6', // Azul
      // Adicione suas cores
    },
  },
}
```

### Adicionar Novos Módulos

1. Crie model no `backend/prisma/schema.prisma`
2. Execute `npm run prisma:migrate`
3. Crie controller em `backend/src/controllers/`
4. Crie routes em `backend/src/routes/`
5. Adicione route no `backend/src/server.ts`
6. Crie página no `frontend/src/pages/`
7. Adicione rota no `frontend/src/App.tsx`

## ?? API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (autenticado)

### RMs
- `GET /api/rms` - Listar todas RMs
- `POST /api/rms` - Criar RM
- `GET /api/rms/:id` - Buscar RM específica
- `PUT /api/rms/:id` - Atualizar RM
- `DELETE /api/rms/:id` - Deletar RM

### Teams
- `GET /api/teams` - Listar equipes
- `POST /api/teams` - Criar equipe
- `PUT /api/teams/:id` - Atualizar equipe
- `DELETE /api/teams/:id` - Deletar equipe

### Outros Endpoints
Seguem o mesmo padrão para: `branches`, `teams-messages`, `access-info`, `dailys`, `important-links`

## ?? Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas!

## ?? Licença

ISC

## ?? Autor

Sistema desenvolvido para organização pessoal de trabalho.

---

**Nota**: Lembre-se de configurar backups regulares do banco de dados para não perder suas informações importantes!
