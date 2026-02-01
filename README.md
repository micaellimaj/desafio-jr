# <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd4MTQyZ3IxejR2bTdreWdpMjJocGlseDF3MjFxZWdrMWNmbGhlZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VPrF9XoIRDYljQqFTB/giphy.gif" alt="class" width="50" height="50" /> Desafio Dev : PetShop

![logo](images/bannerpetshop.png)

## <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODd3eWUweHVlM2FwejZoYXZwOXlheXI3N3BsMWMzYzQ1em1rMTY0MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tn3Ej47sHXpgaxn3FZ/giphy.gif" alt="class" width="35" height="35" /> Introdução 
Este projeto foi desenvolvido como parte do Desafio Desenvolvedor Fullstack Jr. da InteraTo. Trata-se de uma dashboard SPA para gerenciamento de um Petshop, permitindo o controle completo (CRUD) de animais de estimação.

## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmgzdXhsczNxMTVqenVyd3Y3NTdiNDAxYWp4d3k1MGFocTFsaDN1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/u0oVfsSOcxX25UULu2/giphy.gif" alt="class" width="35" height="35" /> Objetivo
O foco principal da aplicação é oferecer uma interface intuitiva para o cadastro de pets (cães e gatos), integrando um sistema de autenticação robusto. O diferencial técnico reside na regra de negócio de permissões: embora todos os usuários autenticados possam visualizar a listagem geral, o privilégio de edição e exclusão é restrito exclusivamente ao usuário que realizou o cadastro original do pet.

## <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExanMyYnZhM3o2dXNiN2Jibjlmc242bnQ4OHRoMHp3b2JvejV1bXBuMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/NEmydmd0cXFdj4ZH9m/giphy.gif" alt="class" width="35" height="35" /> Tecnologias

<p align="center"> 
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> 
<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" /> 
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" /> 
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" /> 
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" /> 
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
 <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" /> 
  </p>


* O ecossistema do projeto foi selecionado para garantir escalabilidade, tipagem forte e uma experiência de desenvolvimento moderna:
    * Frontend: Next.js & React com Tailwind CSS para uma interface responsiva e otimizada.
    * Backend: NestJS para uma arquitetura de microserviços escalável e modular.
    * Linguagem: TypeScript garantindo segurança de tipos em todo o fluxo de dados.
    * Banco de Dados & ORM: PostgreSQL para persistência de dados e Prisma como ponte de comunicação.
    * Validação: Zod e React Hook Form para gestão de formulários e integridade de dados.
    * Infraestrutura: Docker para containerização do ambiente de desenvolvimento e banco de dados.

## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2FiZnA5bWlmYnA5MDFucjk5MmY2Yzl4Z2w1eTV4b3M1M25icDlnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IJOyqzfNrGedKWo6wG/giphy.gif" alt="class" width="35" height="35" /> Etapas do Projeto & Funcionalidades: 

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnZtYTJ6bDZhcnlmYXBtNDBwNWk0ZHM5djkxOHB4a3d1dzZkMjk0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sbwz2wLmWNssCj8o4Y/giphy.gif" alt="class" width="25" height="25" /> Back-end 

A API foi construída seguindo princípios de Clean Architecture e Modularidade, garantindo que cada domínio da aplicação (Autenticação e Pets) seja independente e testável.

1. **Módulo de Autenticação (auth)**
* Responsável por garantir o acesso seguro à plataforma e o controle de identidade.
* Cadastro de Usuários (register-user): Implementação da lógica de criação de conta com hashing de senha para segurança.
* Login e Sessão (login-user): Sistema de autenticação utilizando JWT (JSON Web Token).
* Estratégias de Segurança: Uso de Passport.js com a estratégia jwt.strategy.ts para validar tokens em rotas protegidas.
* Garantia de Qualidade: Testes unitários para os casos de uso e testes de ponta a ponta (auth.e2e.spec.ts) para validar o fluxo completo de login e registro.

2. **Módulo de Pets (pet)**
* Gerenciamento central da regra de negócio do Petshop, com controle rigoroso de propriedade.
* Operações CRUD Completas:
    * Criação: Registro de novos animais vinculados ao usuário logado.
    * Listagem: Visualização global de pets cadastrados no sistema.
    * Edição e Exclusão: Lógica de permissão que valida se o ID do usuário logado corresponde ao dono do registro antes de permitir alterações (regra de negócio crítica).
    * Busca Inteligente: Implementação de busca unificada via search-pet.dto.ts para filtrar por nome do animal ou nome do dono.
* Cobertura de Testes: Scripts de teste dedicados para cada operação (create, delete, list, update) e testes de integração E2E.

3. **Estrutura Transversal (shared)**
* Componentes compartilhados que sustentam a infraestrutura da API.
* Banco de Dados: Integração com PostgreSQL através do Prisma ORM, centralizada no prisma.service.ts.
* Validação de Dados: Uso de um zod-validation.pipe.ts personalizado para interceptar requisições e garantir que os dados estejam no formato correto antes de chegarem aos controladores.
* Proteção de Rotas: Guarda de autenticação global (jwt-auth.guard.ts) pronta para ser aplicada em rotas privadas.

4. **Infraestrutura e DevOps**
* Containerização: Arquivo docker-compose.yml configurado para subir o banco de dados e a aplicação de forma isolada.
* Variáveis de Ambiente: Gestão de credenciais e segredos através de arquivos .env.

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnZtYTJ6bDZhcnlmYXBtNDBwNWk0ZHM5djkxOHB4a3d1dzZkMjk0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sbwz2wLmWNssCj8o4Y/giphy.gif" alt="class" width="25" height="25" /> Front-end
O front-end foi construído utilizando Next.js 14+ com a estrutura de App Router, priorizando a separação de responsabilidades e uma experiência de usuário (UX) fluida.

1. Estrutura de Rotas e Páginas (app)
* Utilização de Route Groups para organizar o fluxo da aplicação:
    * Fluxo de Autenticação ((auth)): Páginas dedicadas de login e register com layouts específicos para o contexto de entrada.
    * Área Restrita ((dashboard)): Dashboard protegida onde ocorre o gerenciamento dos pets.
    * API Routes: Implementação de rotas internas (api/auth e api/pets) que servem como ponte segura para o back-end.

2. Componentização Inteligente (components)
* Arquitetura baseada em componentes reutilizáveis e modulares:
    * Pets Management: Componentes específicos como pet-card.tsx para exibição, pet-form-dialog.tsx para criação/edição, e delete-confirm-dialog.tsx para ações críticas.
    * User Experience (UX): Implementação de pet-list-skeleton.tsx para estados de carregamento (Skeleton Screens) e pet-list-empty.tsx para estados vazios.
    * Dashboard: Header persistente e sistema de filtros (pet-filters.tsx) e busca em tempo real (search-input.tsx).

3. Gerenciamento de Estado e Lógica (contexts & hooks)
* Contextos: auth-context.tsx centraliza as informações do usuário logado e protege as rotas privadas. ThemeContext.tsx gerencia a preferência de tema (Light/Dark).
* Custom Hooks: * use-pets.ts: Abstrai toda a lógica de comunicação com a API de pets (fetch, mutations).
    * use-mobile.ts: Hook para garantir a responsividade (Mobile First).
    * use-toast.ts: Feedback visual imediato para ações do usuário.

4. Serviços e Integrações (services & lib)
* Camada de Serviço: Arquivos auth.ts e pets.ts isolam as chamadas HTTP (via Axios ou Fetch) facilitando a manutenção.
* Tipagem e Validação: Definição de interfaces em types.ts e esquemas de validação com Zod em schemas.ts, garantindo que o front-end valide os dados antes mesmo do envio ao servidor.

## <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXE4ZjI2NGR3ZjBnY3ZlZ2x5bmk3NXh1MDV3Mzd4ZmRic3dtbXpvdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Wf9dyOrB0nGJn5FIYf/giphy.gif" alt="class" width="35" height="35" />  Estrutura do Banco de Dados

A persistência do projeto é feita utilizando PostgreSQL em conjunto com Prisma ORM no backend NestJS. As tabelas a seguir representam os principais modelos de dados da aplicação, garantindo integridade e relacionamentos consistentes.

* Entidade: Usuário (User)

Esta tabela armazena as credenciais e informações básicas dos usuários, servindo de base para o sistema de autenticação e controle de propriedade dos registros

| Campo     | Tipo           | Descrição                                                     |
|-----------|----------------|---------------------------------------------------------------|
| id        | UUID / String  | Identificador único universal do usuário                      |
| name      | String         | Nome completo (mín. 3 caracteres) (obrigatório)               |
| email     | String         | E-mail único utilizado para login (obrigatório)               |
| password  | String         | Senha armazenada como Hash (mín. 6 caracteres) (obrigatório)  |
| createdAt | DateTime       | Data e hora de criação do usuário                             |
| updatedAt | DateTime       | Data da última modificação do perfil                          |

* Entidade: Pet (pets)

Esta tabela gerencia os registros dos animais no sistema. Cada pet possui uma relação direta com um usuário (owner do sistema), permitindo que a regra de negócio restrinja a edição e exclusão apenas ao criador do registro.

| Campo        | Tipo            | Descrição                                                     |
|--------------|-----------------|---------------------------------------------------------------|
| id           | String (UUID)   | Identificador único do pet no banco de dados                  |
| name         | String          | Nome do animal (obrigatório)                                  |
| age          | Number (Integer)| Idade do pet (mínimo 0) (obrigatório)                         |
| type         | Enum            | Tipo do animal: GATO ou CACHORRO (obrigatório)                |
| breed        | String          | Raça do animal (obrigatório)                                  |
| ownerName    | String          | Nome completo do dono do pet (obrigatório)                    |
| ownerContact | String          | Telefone/Contato do dono do pet (obrigatório)                 |
| userId       | String (UUID)   | FK: Referência ao usuário que cadastrou o pet                 |
| createdAt    | Date            | Data de criação do registro                                   |
| updatedAt    | Date            | Data da última atualização dos dados                          |

## <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWlmcm1hdW9sbDhsMWRzam44MjNiYTZqeGZuY3JpOGFpZzNvOWZyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cswKtqXhBDTJZCp6yJ/giphy.gif"  alt="class" width="35" height="35" />  Como Executar o Projeto

Este projeto utiliza **Node.js** para os serviços e **Docker** para a execução do banco de dados PostgreSQL.


###  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlpNmo2Nnp6NWdoZjJjZTJ2cGxjam5tbTBleW9weXBrMjc1cnU0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3og0IJHMqlmPzy7sGs/giphy.gif" alt="class" width="25" height="25" /> Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** — versão **18 ou superior**
- **Docker Desktop** — necessário para rodar o PostgreSQL
- **npm** — gerenciador de pacotes
- **Git** — para clonar o repositório

---

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlpNmo2Nnp6NWdoZjJjZTJ2cGxjam5tbTBleW9weXBrMjc1cnU0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3og0IJHMqlmPzy7sGs/giphy.gif" alt="class" width="25" height="25" /> Instruções de Inicialização

#### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

#### 2. Configurar o Back-end e o Banco de Dados

```bash
cd back-end
```

Crie um arquivo .env na raiz da pasta /back-end:
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET="sua_chave_secreta_aqui_123"
```


Instale as dependências:

```bash
npm install
```

Suba o banco de dados com Docker:

```bash
docker-compose up -d
```


Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run start:dev
```

#### 3. Configurar e Executar o Front-end

Em um novo terminal:

```bash
cd front-end
```

Intalar dependências:
```bash
npm install
```


Executar o front:
```bash
npm run dev
```
### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlpNmo2Nnp6NWdoZjJjZTJ2cGxjam5tbTBleW9weXBrMjc1cnU0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3og0IJHMqlmPzy7sGs/giphy.gif" alt="class" width="25" height="25" /> Execução de Testes:

Na pasta /back-end:

* Testes unitários
```bash
npm run test
```

* Testes E2E (banco rodando)

```bash
npm run test:e2e
```

* Todos os testes

```bash
npm run test:all
```

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlpNmo2Nnp6NWdoZjJjZTJ2cGxjam5tbTBleW9weXBrMjc1cnU0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3og0IJHMqlmPzy7sGs/giphy.gif" alt="class" width="25" height="25" /> Comando úteis do Docker

* Subir e reconstruir serviços

```bash
docker-compose up --build -d
```

* Ver status dos contêineres

```bash
docker-compose ps
```

* Parar e remover contêineres

```bash
docker-compose down
```

* Acompanhar logs de um serviço específico (ex.: backend)

```bash
docker-compose logs -f backend
```

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlpNmo2Nnp6NWdoZjJjZTJ2cGxjam5tbTBleW9weXBrMjc1cnU0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3og0IJHMqlmPzy7sGs/giphy.gif" alt="class" width="25" height="25" /> Boas práticas:

* Use terminais separados para front-end e back-end.
* Garanta que o Docker Desktop esteja em execução.
* Não versionar arquivos .env.
* Utilize um JWT_SECRET forte em produção.
* Finalize com docker-compose down para liberar recursos.

##  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGU2dXJ6Y2xnOGtoa3gwNXpycG1zdHR1MXVqeHlpNTZta2RvdXR1aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/d5MdpCA8K9dNd10Z62/giphy.gif" alt="class" width="35" height="35" /> Testando as Rotas da API:

O backend está configurado para rodar em http://localhost:4001.


### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2sxNXVqYmxiczgyOWdoeG12dzc4YjI0OHJjNHNycGxqcHlscWZpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c39G3b12cyqmEhOxib/giphy.gif" alt="class" width="25" height="25" /> Todas as rotas

| Entidade | Método | Rota Base | Rota Completa        | Descrição                                                     |
|----------|--------|-----------|----------------------|---------------------------------------------------------------|
| Auth ❌  | POST   | /auth     | /auth/register       | Cria uma nova conta de usuário                                |
| Auth ❌  | POST   | /auth     | /auth/login          | Realiza o login e retorna o token JWT                         |
| Pets ✅  | POST   | /pets     | /pets                | Cadastra um novo pet (vinculado ao ID do usuário)             |
| Pets ✅  | GET    | /pets     | /pets?query=         | Lista pets (filtra por nome do pet ou nome do dono)           |
| Pets ✅  | PATCH  | /pets     | /pets/:id            | Atualiza dados de um pet (apenas se for o dono)               |
| Pets ✅  | DELETE | /pets     | /pets/:id            | Remove um pet do sistema (apenas se for o dono)               |

* Dica: Comece sempre pelas rotas de Auth para obter seu token JWT. Sem ele, você não conseguirá acessar ou manipular os dados dos pets.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2sxNXVqYmxiczgyOWdoeG12dzc4YjI0OHJjNHNycGxqcHlscWZpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c39G3b12cyqmEhOxib/giphy.gif" alt="class" width="25" height="25" /> Guia de Autenticação e Permissões

| Legenda | Descrição                                                                 |
|---------|---------------------------------------------------------------------------|
| ✅      | Requer Token JWT. Use no header: `Authorization: Bearer <seu_token>`      |
| ❌      | Rota pública. Não requer autenticação para ser acessada                   |


* Regra de Ouro: A validação de quem pode editar ou deletar um pet é feita diretamente no backend. Se você tentar alterar um pet que não cadastrou, a API retornará um erro de permissão.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2sxNXVqYmxiczgyOWdoeG12dzc4YjI0OHJjNHNycGxqcHlscWZpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c39G3b12cyqmEhOxib/giphy.gif" alt="class" width="25" height="25" /> Passos para Teste Manual

* Registro: Envie um POST para /auth/register com name, email e password.
* Login: Envie um POST para /auth/login com as mesmas credenciais. O backend responderá com um access_token.
* Configurar Header: Em ferramentas como Postman/Insomnia, vá na aba Auth, escolha Bearer Token e cole o token gerado.
* Gerenciar Pets: Agora você pode usar o POST para criar pets e o GET para visualizar a lista completa. Note que ao tentar o PATCH ou DELETE, a API verificará se o sub do seu token condiz com o dono do registro.


## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmZiZDdyNGRjbjFnZ3FzMmt4c3g5Ymp3d3djbW9lZ3M3dTg1Zm8yNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/nFyixvuEJ4WLAPrC4b/giphy.gif" alt="class" width="35" height="35" /> Estrutura do Repositório




```
PETSHOP-FULLSTACK-CHALLENGE/
├──  back-end/               # API REST (NestJS + Prisma)
│   ├── prisma/                # Schema do PostgreSQL e Migrations
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # Módulo de Autenticação (Login/Registro)
│   │   │   └── pet/           # CRUD de Animais e Regras de Negócio
│   │   ├── shared/            # Pipes (Zod), Guards (JWT) e Database
│   │   └── main.ts            # Ponto de entrada da aplicação NestJS
│   └── docker-compose.yml     # Orquestração do banco de dados e API
│
├──  front-end/               # Interface Web (Next.js + Tailwind)
│   ├── app/                   # App Router (Rotas (auth) e (dashboard))
│   ├── components/            # UI Components e Modais (Shadcn/UI)
│   ├── contexts/              # Provedores de Autenticação e Tema
│   ├── hooks/                 # Lógica de consumo da API (use-pets)
│   └── services/              # Camada de integração com o back-end
│
├── 🔐 .env                    # Variáveis de ambiente globais
└── README.md                  # Documentação principal do projeto

```

## <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg2N3UxdWRsbGtjcjF6a2draXpocTk0ODFoZ2lhZ3l4eHI2ZXBnMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3YAxVrJrjWIeeADRM7/giphy.gif" alt="class" width="35" height="35" /> Conclusão

Este projeto reflete a entrega de uma solução Fullstack robusta, onde a prioridade foi alinhar a experiência do usuário (UX) a uma arquitetura de código limpa e segura. Através da separação clara de responsabilidades no backend (NestJS) e uma interface reativa no frontend (Next.js), o desafio de criar um CRUD com regras de acesso personalizadas foi superado com sucesso.

* Pontos de Destaque
    * Segurança em Primeiro Lugar: Implementação de autenticação JWT e guardas de rota que garantem que apenas os proprietários manipulem seus próprios registros de pets.
    * Escalabilidade: Uso de ferramentas modernas como Prisma ORM e Docker, permitindo que a aplicação cresça de forma organizada.
    * Qualidade de Código: Validações rigorosas com Zod e uma cobertura de testes automatizados que asseguram a estabilidade do sistema.
    * Foco no Usuário: Interface responsiva desenvolvida com TailwindCSS e componentes Shadcn UI, proporcionando uma navegação fluida em qualquer dispositivo.

