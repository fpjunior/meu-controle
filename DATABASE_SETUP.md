# ?? ERRO: Banco de Dados Não Configurado

## Problema Detectado

O erro `500 Internal Server Error` ocorre porque o banco de dados PostgreSQL não está configurado corretamente.

## ?? Solução Passo a Passo

### Opção 1: Usando PostgreSQL Local

#### 1. Certifique-se que o PostgreSQL está instalado e rodando

**Windows - Verificar se está rodando:**
- Abra "Serviços" (services.msc)
- Procure por "postgresql" 
- Status deve estar "Em execução"

**Se não estiver instalado:**
- Baixe em: https://www.postgresql.org/download/windows/
- Instale e anote a senha que você definir para o usuário `postgres`

#### 2. Crie o banco de dados

Abra o **SQL Shell (psql)** ou **pgAdmin** e execute:

```sql
CREATE DATABASE meu_controle;
```

#### 3. Configure o arquivo backend/.env

Edite o arquivo `backend/.env` e atualize esta linha com suas credenciais:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/meu_controle?schema=public"
```

Substitua `SUA_SENHA_AQUI` pela senha que você definiu na instalação do PostgreSQL.

#### 4. Execute as migrations

```bash
cd backend
npm run prisma:migrate
```

Digite um nome para a migration (exemplo: `init`) e pressione Enter.

#### 5. Reinicie o servidor backend

Se estiver rodando, pare com `Ctrl+C` e inicie novamente:

```bash
npm run dev
```

---

### Opção 2: Usando Docker (Mais Fácil!)

Se você tem Docker instalado, é muito mais simples:

#### 1. Crie um arquivo docker-compose.yml na raiz do projeto

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: meu_controle
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### 2. Inicie o PostgreSQL

```bash
docker-compose up -d
```

#### 3. Configure o backend/.env

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meu_controle?schema=public"
```

#### 4. Execute as migrations

```bash
cd backend
npm run prisma:migrate
```

---

### Opção 3: Banco de Dados na Nuvem (Grátis!)

Use um serviço gratuito de PostgreSQL:

#### Neon (Recomendado)

1. Acesse: https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a Connection String fornecida
5. Cole no `backend/.env`:

```env
DATABASE_URL="sua-connection-string-do-neon-aqui"
```

#### Supabase

1. Acesse: https://supabase.com
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Vá em Settings > Database
5. Copie a Connection String (URI)
6. Cole no `backend/.env`

---

## ? Como Saber se Funcionou

Após configurar, quando você executar `npm run prisma:migrate`, deve ver:

```
? Generated Prisma Client
? The migration has been created
```

E o servidor não deve mais dar erro 500!

---

## ?? Ainda com Problemas?

### Erro: "Port 5432 already in use"
Outro serviço está usando a porta. Altere a porta no DATABASE_URL ou pare o outro serviço.

### Erro: "Authentication failed"
Senha incorreta. Verifique a senha do PostgreSQL.

### Erro: "Database does not exist"
Execute `CREATE DATABASE meu_controle;` no PostgreSQL.

---

## ?? Qual opção escolher?

- **PostgreSQL Local**: Melhor para desenvolvimento, seus dados ficam no seu computador
- **Docker**: Mais fácil de configurar, recomendado se você já usa Docker
- **Nuvem**: Mais simples, não precisa instalar nada, mas depende de internet

**Recomendação:** Se você não tem PostgreSQL instalado, use **Neon** ou **Docker**.
