# ?? Guia Rápido de Início

## Pré-requisitos
- ? Node.js instalado
- ? PostgreSQL instalado e rodando
- ? Dependências instaladas (já feito!)

## Passos para Rodar

### 1. Configure o PostgreSQL

**? OPÇÃO MAIS RÁPIDA - Usando Docker (Recomendado):**

Se você tem Docker instalado, simplesmente execute:

```bash
docker-compose up -d
```

Pronto! O PostgreSQL estará rodando. Pule para o passo 2.

**?? OPÇÃO ALTERNATIVA - PostgreSQL Local:**

Se você já tem PostgreSQL instalado:

1. Certifique-se que está rodando
2. Abra o SQL Shell (psql) ou pgAdmin
3. Execute: `CREATE DATABASE meu_controle;`

**?? OPÇÃO ALTERNATIVA - Banco na Nuvem (Grátis):**

Use Neon (https://neon.tech) ou Supabase (https://supabase.com):
- Crie conta gratuita
- Crie novo projeto PostgreSQL
- Copie a Connection String fornecida

?? **Se tiver problemas, consulte: `DATABASE_SETUP.md`**

### 2. Configure o Backend

Edite o arquivo `backend/.env` e atualize a linha:

**Se estiver usando Docker:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meu_controle?schema=public"
```

**Se estiver usando PostgreSQL local:**
```env
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/meu_controle?schema=public"
```

**Se estiver usando nuvem:**
```env
DATABASE_URL="sua-connection-string-aqui"
```

### 3. Execute as Migrations

```bash
cd backend
npm run prisma:migrate
```

Quando perguntar o nome da migration, você pode digitar: `init`

### 4. Inicie os Servidores

**Opção 1 - Usando VS Code Tasks (Recomendado):**
- Pressione `Ctrl+Shift+B`
- Selecione "Start Full Stack"
- Isso iniciará backend e frontend automaticamente!

**Opção 2 - Manualmente:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 5. Acesse a Aplicação

Abra seu navegador em: **http://localhost:5173**

## Primeiro Uso

1. Clique em "Registrar"
2. Crie sua conta com:
   - Nome
   - Email
   - Senha
3. Faça login
4. Comece a usar!

## Dicas Úteis

### Ver o Banco de Dados Visualmente
```bash
cd backend
npm run prisma:studio
```
Abre em: http://localhost:5555

### Comandos Úteis

**Backend:**
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Compilar para produção
- `npm run prisma:migrate` - Executar migrations
- `npm run prisma:studio` - Abrir GUI do banco

**Frontend:**
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção

## Problemas Comuns

### ? Erro 500 ao registrar/logar
**Causa:** Banco de dados não configurado ou inacessível

**Solução:**
1. Verifique se o PostgreSQL está rodando
2. Confira se o `DATABASE_URL` no `backend/.env` está correto
3. Execute `npm run prisma:migrate` no backend
4. Consulte `DATABASE_SETUP.md` para ajuda detalhada

### Erro "Cannot connect to database"
- Verifique se o PostgreSQL está rodando
- Confira o `DATABASE_URL` no `backend/.env`
- Se usar Docker: execute `docker-compose up -d`

### Erro "Port 3001 already in use"
- Outro processo está usando a porta 3001
- Pare o processo ou mude a porta no `backend/.env`

### Erro "Port 5173 already in use"
- Outro processo está usando a porta 5173
- Pare o processo ou será oferecida outra porta automaticamente

### Erro "P1001: Can't reach database server"
- PostgreSQL não está rodando
- Porta incorreta (padrão: 5432)
- Se usar Docker: `docker-compose up -d`

## Estrutura do Projeto

```
meu-controle/
??? backend/          # API Node.js + Express
?   ??? src/         # Código fonte
?   ??? prisma/      # Schema e migrations
?   ??? .env         # Variáveis de ambiente
??? frontend/         # App React
?   ??? src/         # Código fonte
?   ??? .env         # Variáveis de ambiente
??? README.md        # Documentação completa
```

## Próximos Passos

Após tudo funcionando, você pode:
- ? Personalizar as cores no TailwindCSS
- ?? Adicionar mais funcionalidades
- ?? Fazer deploy na web (veja README.md)
- ?? Configurar backups do banco de dados

## Suporte

Consulte o `README.md` para documentação completa!
