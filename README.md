# <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd4MTQyZ3IxejR2bTdreWdpMjJocGlseDF3MjFxZWdrMWNmbGhlZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VPrF9XoIRDYljQqFTB/giphy.gif" alt="class" width="50" height="50" /> Desafio Dev : PetShop

![logo](images/bannerpetshop.png)

## <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODd3eWUweHVlM2FwejZoYXZwOXlheXI3N3BsMWMzYzQ1em1rMTY0MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tn3Ej47sHXpgaxn3FZ/giphy.gif" alt="class" width="35" height="35" /> Introdução 
Este projeto foi desenvolvido como parte do Desafio Desenvolvedor Fullstack Jr. da InteraTo. Trata-se de uma solução completa composta por uma Dashboard SPA para o gerenciamento de um Petshop e uma API robusta, permitindo o controle de ciclo de vida (CRUD) de animais de estimação.

## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmgzdXhsczNxMTVqenVyd3Y3NTdiNDAxYWp4d3k1MGFocTFsaDN1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/u0oVfsSOcxX25UULu2/giphy.gif" alt="class" width="35" height="35" /> Objetivo
O foco principal da aplicação é oferecer uma interface intuitiva para o cadastro de pets (cães e gatos), integrando um sistema de autenticação que segmenta as ações por níveis de permissão.

**Regras de Negócio e Níveis de Acesso:**

A aplicação diferencia as capacidades dos usuários através de uma lógica de permissões específica:

* **Usuário Comum**: Pode visualizar todos os pets cadastrados e realizar novos cadastros. No entanto, possui privilégios de edição e exclusão restritos exclusivamente aos animais que ele mesmo cadastrou.

* **Usuário Administrador (Admin)**: Atua como moderador global do sistema. Possui autoridade para editar ou deletar os dados de qualquer pet registrado na plataforma, independentemente de quem o cadastrou.

* **Restrição de Cadastro**: Diferente dos usuários comuns, o Admin não possui a função de cadastrar novos pets, sendo sua conta dedicada estritamente à gestão e manutenção das informações já existentes.

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


O ecossistema do projeto foi selecionado para garantir escalabilidade, tipagem forte e uma experiência de desenvolvimento moderna:

* **Frontend**: Next.js & React com Tailwind CSS para uma interface responsiva e otimizada.
* **Backend**: NestJS para uma arquitetura de microserviços escalável e modular.
* **Linguagem**: TypeScript garantindo segurança de tipos em todo o fluxo de dados.
* **Banco de Dados & ORM**: PostgreSQL para persistência de dados e Prisma como ponte de comunicação.
* **Validação**: Zod e React Hook Form para gestão de formulários e integridade de dados.
* **Infraestrutura**: Docker para containerização do ambiente de desenvolvimento e banco de dados.

## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2FiZnA5bWlmYnA5MDFucjk5MmY2Yzl4Z2w1eTV4b3M1M25icDlnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IJOyqzfNrGedKWo6wG/giphy.gif" alt="class" width="35" height="35" /> Etapas do Projeto & Funcionalidades: 

![etapas](images/etapasprojeto.gif)

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnZtYTJ6bDZhcnlmYXBtNDBwNWk0ZHM5djkxOHB4a3d1dzZkMjk0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sbwz2wLmWNssCj8o4Y/giphy.gif" alt="class" width="25" height="25" /> Back-end 

A API foi construída seguindo princípios de **Clean Architecture** e **Modularidade**, garantindo que cada domínio da aplicação seja independente e testável.

1. **Módulo de Autenticação (auth)**

* **Controle de Identidade**: Responsável por garantir o acesso seguro à plataforma.
* **Cadastro e Login**: Implementação de register-user.ts (com hashing de senha) e login-user.ts via JWT.
* **Estratégias de Segurança**: Uso de jwt.strategy.ts para validar tokens e identificar se o usuário possui o perfil de Usuário Comum ou Admin.
* **Qualidade**: Testes unitários e de ponta a ponta (auth.e2e.spec.ts) validam o fluxo de acesso.

2. **Módulo de Pets (pet) e Imagens (pet-image)**

* **Gestão de Propriedade**: Implementa a lógica central onde a edição/exclusão é restrita ao dono do registro.
* **Hierarquia Administrativa (Admin)**: Inclusão de lógica nos controladores (pet.controller.ts) que permite ao Admin gerenciar qualquer pet, ignorando a restrição de proprietário.
* **Módulo de Imagens**: Pasta dedicada (pet-image) para o processamento e upload de fotos dos animais (upload-pet-image.ts).
* **Busca**: Filtros avançados via search-pet.dto.ts para localização rápida por nome ou tutor.

3. **Estrutura Transversal (shared)**

* **Componentes**: compartilhados que sustentam a infraestrutura da API.
* **Banco de Dados**: Integração com PostgreSQL através do Prisma ORM, centralizada no prisma.service.ts.
* **Validação de Dados**: Uso de um zod-validation.pipe.ts personalizado para interceptar requisições e garantir que os dados estejam no formato correto antes de chegarem aos controladores.
* **Proteção de Rotas**: Guarda de autenticação global (jwt-auth.guard.ts) pronta para ser aplicada em rotas privadas.

4. **Infraestrutura e DevOps**
* **Containerização**: Arquivo docker-compose.yml configurado para subir o banco de dados e a aplicação de forma isolada.
* **Variáveis de Ambiente**: Gestão de credenciais e segredos através de arquivos .env.

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnZtYTJ6bDZhcnlmYXBtNDBwNWk0ZHM5djkxOHB4a3d1dzZkMjk0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sbwz2wLmWNssCj8o4Y/giphy.gif" alt="class" width="25" height="25" /> Front-end
O front-end foi construído utilizando Next.js 14+ com a estrutura de App Router, priorizando a separação de responsabilidades e uma experiência de usuário (UX) fluida.

1. **Estrutura de Rotas e Páginas (app)**
* **Utilização de Route Groups para organizar o fluxo da aplicação**:
    * **Fluxo de Autenticação ((auth))**: Páginas dedicadas de login e register com layouts específicos para o contexto de entrada.
    * **Área Restrita ((dashboard))**: Dashboard protegida onde ocorre o gerenciamento dos pets.
  
2. **Componentização Inteligente (components)**
* Arquitetura baseada em componentes reutilizáveis e modulares:
    * **Pets Management**: Componentes específicos como pet-card.tsx para exibição, pet-form-dialog.tsx para criação/edição, e delete-confirm-dialog.tsx para ações críticas.
    * **User Experience (UX)**: Implementação de pet-list-skeleton.tsx para estados de carregamento (Skeleton Screens) e pet-list-empty.tsx para estados vazios.
    * **Dashboard**: Header persistente e sistema de filtros (pet-filters.tsx) e busca em tempo real (search-input.tsx).
    * **Interface Admin**: O dashboard adapta a exibição de botões de ação (editar/excluir) baseando-se no perfil do usuário logado (Dono do pet ou Admin).

3. **Gerenciamento de Estado e Lógica (contexts & hooks)**
* **Contextos**: auth-context.tsx centraliza as informações do usuário logado e protege as rotas privadas. ThemeContext.tsx gerencia a preferência de tema (Light/Dark).
* **Custom Hooks**: 
    * **use-mobile.ts**: Hook para garantir a responsividade (Mobile First).
    * **use-toast.ts**: Feedback visual imediato para ações do usuário.

4. **Serviços e Integrações (services & lib)**
* **Camada de Serviço**: Arquivos auth.ts e pets.ts isolam as chamadas HTTP (via Axios ou Fetch) facilitando a manutenção.
* **Tipagem e Validação**: Definição de interfaces em types.ts e esquemas de validação com Zod em schemas.ts, garantindo que o front-end valide os dados antes mesmo do envio ao servidor.

## <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXB0amw4OG9sN3g3ZzlhaGVxMGgxY3B0c3AwNXI4bmFoMzkwZzFwaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2cuI0vwb7w0wmDv7b0/giphy.gif" alt="class" width="35" height="35" />  Visualização do Projeto

![apresentacap](images/apresentacaoprojetopet.gif)

## <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXE4ZjI2NGR3ZjBnY3ZlZ2x5bmk3NXh1MDV3Mzd4ZmRic3dtbXpvdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Wf9dyOrB0nGJn5FIYf/giphy.gif" alt="class" width="35" height="35" />  Estrutura do Banco de Dados

A persistência do projeto é feita utilizando PostgreSQL em conjunto com Prisma ORM no backend NestJS. As tabelas a seguir representam os principais modelos de dados da aplicação, garantindo integridade e relacionamentos consistentes.

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXI1YnU1NmxtejE1djFweDNpMmZxd2EzeWVzMnY5d3NseTV1eGh6aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/H0hik4FKVdiSBDAchu/giphy.gif" alt="class" width="25" height="25" /> Entidade: Usuário (`users`)

Esta tabela armazena as credenciais e define o nível de acesso do usuário no sistema.

| Campo     | Tipo           | Descrição                                                     |
|-----------|----------------|---------------------------------------------------------------|
| `id`        | UUID (String)  | Identificador único universal do usuário                      |
| `name`     | String         | Nome completo (mín. 3 caracteres) (obrigatório)               |
| `email`    | String         | E-mail único utilizado para login (obrigatório)               |
| `password`  | String         | Senha armazenada como Hash (mín. 6 caracteres) (obrigatório)  |
| `role`      | Enum (Role)       | Define o nível de acesso: `USER` ou `ADMIN `                       |
| `createdAt` | DateTime       | Data de criação do usuário                             |

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXI1YnU1NmxtejE1djFweDNpMmZxd2EzeWVzMnY5d3NseTV1eGh6aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/H0hik4FKVdiSBDAchu/giphy.gif" alt="class" width="25" height="25" />  Entidade: Pet (`pets`)

Centraliza as informações dos animais e estabelece o vínculo de propriedade com o usuário que realizou o cadastro.

| Campo        | Tipo            | Descrição                                                     |
|--------------|-----------------|---------------------------------------------------------------|
| `id`          | UUID (String)  | Identificador único do pet no banco de dados                  |
| `name`         | String          | Nome do animal (obrigatório)                                  |
| `age`          | Number (Integer)| Idade do pet (mínimo 0) (obrigatório)                         |
| `type`         | Enum            | Tipo do animal: `GATO` ou `CACHORRO`(obrigatório)                |
| `breed`        | String          | Raça do animal (obrigatório)                                  |
| `ownerName`    | String          | Nome completo do dono do pet (obrigatório)                    |
| `ownerContact` | String          | Telefone/Contato do dono do pet (obrigatório)                 |
| `userId `      | String (UUID)   | FK: Referência ao usuário que cadastrou o pet                 |
| `createdAt`    | DateTime        | Data de criação do registro                                   |
| `updatedAt`   | DateTime           | Data da última atualização dos dados                          |

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXI1YnU1NmxtejE1djFweDNpMmZxd2EzeWVzMnY5d3NseTV1eGh6aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/H0hik4FKVdiSBDAchu/giphy.gif" alt="class" width="25" height="25" />  Entidade: Imagem do Pet (`pet_images`)

Permite que cada pet possua múltiplas fotos associadas, utilizando uma relação de 1:N com deleção em cascata.

| Campo        | Tipo            | Descrição                                                     |
|--------------|-----------------|---------------------------------------------------------------|
| `id`          | UUID (String)    |  Identificador único da imagem.            |
| `url`         | String          | Caminho do arquivo ou link de armazenamento externo                              |
| `petId`          | UUID (FK)  |        Vincula a imagem a um pet específico.        |               |
| `createdAt`    | DateTime          | Data do upload da imagem              |

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXI1YnU1NmxtejE1djFweDNpMmZxd2EzeWVzMnY5d3NseTV1eGh6aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/H0hik4FKVdiSBDAchu/giphy.gif" alt="class" width="25" height="25" />  Exemplos de Relacionamentos

* **User ↔ Pet**: Um usuário pode ter muitos pets (1:N). O campo userId no modelo Pet garante a regra de negócio de que apenas o dono (ou um Admin) possa manipular o dado.
* **Pet ↔ PetImage**: Um pet pode ter várias imagens associadas (1:N). Ao excluir um pet, todas as suas imagens relacionadas são removidas automaticamente através da propriedade onDelete: Cascade.

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
git clone https://github.com/micaellimaj/desafio-jr
cd DESAFIO-JR
```

#### 2. Configurar o Back-end e o Banco de Dados

```bash
cd back-end
```

Crie um arquivo .env na raiz da pasta /back-end:
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET="sua_chave_secreta_aqui_123"
ADMIN_EMAIL=admin@petshop.com
ADMIN_PASSWORD=SenhaMuitoForte123
PORT=4001
FRONTEND_URL=http://localhost:3000
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

Envie as credenciais do usuário admin:

```bash
npx prisma db seed
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

Crie um arquivo .env na raiz da pasta /front-end:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4001
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

| Entidade  | Método | Rota Base | Rota Completa                  | Descrição |
|----------|--------|-----------|--------------------------------|-----------|
| Auth ❌  | `POST`   | `/auth`     | `/auth/register`                 | Cria uma nova conta de usuário |
| Auth ❌  | `POST`  | `/auth`     | `/auth/login`                    | Realiza o login e retorna o token JWT |
| Pets ✅  | `POST`   | `/pets`     | `/pets`                          | Cadastra um novo pet (apenas Usuário Comum) |
| Pets ✅  | `GET`    | `/pets`     | `/pets?query=`                  | Lista todos os pets (filtra por nome do pet ou tutor) |
| Pets ✅  | `PATCH`  | `/pets`     | `/pets/:id`                     | Atualiza dados do pet (Dono ou Admin) |
| Pets ✅  | `DELETE` | `/pets`     | `/pets/:id`                     | Remove um pet do sistema (Dono ou Admin) |
| Imagens ✅ | `POST`  | `/pets`     | `/pets/:id/images`              | Faz upload de uma foto para o pet específico |
| Imagens ✅ | `PATCH` | `/pets`     | `/pets/images/:imageId`         | Substitui uma imagem existente por um novo arquivo |
| Imagens ✅ | `DELETE` | `/pets`     | `/pets/images/:imageId`         | Remove permanentemente uma imagem |

* Dica: Comece sempre pelas rotas de Auth para obter seu token JWT. Sem ele, você não conseguirá acessar ou manipular os dados dos pets.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2sxNXVqYmxiczgyOWdoeG12dzc4YjI0OHJjNHNycGxqcHlscWZpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c39G3b12cyqmEhOxib/giphy.gif" alt="class" width="25" height="25" /> Guia de Autenticação e Permissões

| Legenda | Descrição                                                                 |
|---------|---------------------------------------------------------------------------|
| ✅      | Requer Token JWT. Use no header: `Authorization: Bearer <seu_token>`      |
| ❌      | Rota pública. Não requer autenticação para ser acessada                   |


### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2sxNXVqYmxiczgyOWdoeG12dzc4YjI0OHJjNHNycGxqcHlscWZpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c39G3b12cyqmEhOxib/giphy.gif" alt="class" width="25" height="25" /> Regra de Ouro: Controle de Acesso (RBAC)

A API valida o perfil do usuário contido no token JWT (USER ou ADMIN):

* **Propriedade (Dono)**: Usuários comuns só podem manipular (Editar/Deletar/Alterar Imagem) os registros onde o userId do pet corresponde ao seu próprio ID.
* **Moderação (Admin)**: Usuários com a role ADMIN ignoram a trava de propriedade, podendo gerenciar qualquer pet ou imagem no sistema, mas são impedidos de criar novos registros de pets.
* **Imagens**: As rotas de PATCH e DELETE de imagens também verificam o userRole, garantindo que um Admin possa limpar conteúdos inapropriados.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2sxNXVqYmxiczgyOWdoeG12dzc4YjI0OHJjNHNycGxqcHlscWZpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c39G3b12cyqmEhOxib/giphy.gif" alt="class" width="25" height="25" /> Passos para Teste Manual

1. **Obter Acesso**: Registre-se e faça login para copiar o access_token.
2. **Configurar Header**: Em sua ferramenta de teste (Postman/Insomnia), utilize o token em Bearer Auth.
3. **Upload de Imagem**: * Use a rota POST /pets/:id/images.
    * No corpo da requisição (form-data), adicione um campo chamado file e selecione um arquivo de imagem.
4. **Testar Permissão Admin**: * Tente deletar uma imagem de um pet que você não criou usando um token de usuário comum (deve retornar erro).
    * Repita a operação com um token de Admin (deve retornar sucesso).
5. **Validação de Arquivo**: Ao usar PATCH ou POST em imagens, o envio do arquivo é obrigatório; caso contrário, a API retornará 400 Bad Request.



## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmZiZDdyNGRjbjFnZ3FzMmt4c3g5Ymp3d3djbW9lZ3M3dTg1Zm8yNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/nFyixvuEJ4WLAPrC4b/giphy.gif" alt="class" width="35" height="35" /> Estrutura do Repositório




```
DESAFIO-JR/
back-end/
├── prisma/                    # Configurações do Banco de Dados
│   ├── migrations/            # Histórico de alterações do DB
│   └── schema.prisma          # Definição de modelos e enums (User, Pet, PetImage)
├── src/
│   ├── modules/               # Módulos de Domínio
│   │   ├── auth/              # Autenticação e Autorização
│   │   │   ├── dto/           # Objetos de transferência (Login/Register)
│   │   │   ├── strategies/    # Estratégia JWT para validação
│   │   │   ├── use-cases/     # Lógica de negócio isolada
│   │   │   └── _tests_/       # Testes unitários e E2E do módulo
│   │   ├── pet/               # Gestão principal de Pets
│   │   │   ├── dto/           # Schemas de validação e busca
│   │   │   ├── use-cases/     # Casos de uso (Create, List, Update, Delete)
│   │   │   └── _tests_/       # Testes de integração e comportamento
│   │   └── pet-image/         # Gestão de Mídias (Imagens dos Pets)
│   │       ├── dto/           # DTOs para Upload e Update de imagens
│   │       ├── use-cases/     # Lógica de armazenamento e deleção de arquivos
│   │       └── _tests_/       # Testes específicos de manipulação de mídias
│   ├── shared/                # Recursos Globais e Infraestrutura
│   │   ├── database/          # Prisma Service e Database Module
│   │   ├── guards/            # JWT e Roles Guard (Admin/User)
│   │   └── pipes/             # Validadores globais (Zod Validation Pipe)
│   ├── app.module.ts          # Orquestrador central de módulos
│   └── main.ts                # Inicialização da API NestJS
├── test/                      # Configurações globais de testes (e2e setup)
├── uploads/                   # Armazenamento local temporário de imagens
├── docker-compose.yml         # Containerização do PostgreSQL e App
└── .env                       # Variáveis de ambiente (Secrets e URLs)
front-end/
├── app/                        # Estrutura principal do App Router
│   ├── (auth)/                 # Grupo de rotas para autenticação
│   │   ├── login/              # Página de acesso (page.tsx)
│   │   └── register/           # Página de criação de conta (page.tsx, layout.tsx)
│   ├── (dashboard)/            # Grupo de rotas autenticadas
│   │   └── dashboard/          # Interface administrativa (page.tsx, layout.tsx)
│   ├── api/                    # Route Handlers para backend
│   │   ├── auth/               # Proxy para login e registro
│   │   └── pets/               # Proxy para operações de Pets
│   │       └── [id]/           # Rotas dinâmicas para pets específicos
│   ├── globals.css             # Estilos globais
│   ├── layout.tsx              # Root Layout da aplicação
│   └── page.tsx                # Home/Landing Page
├── components/                 # Componentes reutilizáveis
│   ├── dashboard/              # UI de estrutura (header.tsx)
│   ├── pets/                   # Gestão de Pets
│   │   ├── delete-confirm-dialog.tsx  # Modal de confirmação de exclusão
│   │   ├── pet-card.tsx               # Card para exibição individual
│   │   ├── pet-detail-dialog.tsx      # Modal de detalhes do pet
│   │   ├── pet-filters.tsx            # Filtros de busca e tipo
│   │   ├── pet-form-dialog.tsx        # Modal para criação/edição
│   │   ├── pet-list-empty.tsx         # Estado vazio da listagem
│   │   ├── pet-list-skeleton.tsx      # Loading state (Skeleton Screen)
│   │   └── search-input.tsx           # Input de busca em tempo real
│   └── ui/                     # Componentes base e provedores
│       ├── providers.tsx              # Provedor global de contextos
│       ├── theme-provider.tsx         # Provedor para o sistema de temas
│       └── theme-toggle.tsx           # Alternador de tema Light/Dark
├── contexts/                   # Estados globais (Context API)
│   ├── auth-context.tsx        # Gerenciamento de sessão do usuário
│   └── ThemeContext.tsx        # Controle de tema personalizado
├── hooks/                      # Hooks customizados para lógica de UI
│   ├── use-mobile.ts           # Detecção de visualização mobile
│   └── use-toast.ts            # Hook para notificações (Toasts)
├── lib/                        # Utilitários e configurações centrais
│   ├── api.ts                  # Instância e configuração do Axios/Fetch
│   ├── schemas.ts              # Esquemas de validação (Zod)
│   ├── types.ts                # Definições de interfaces TypeScript
│   └── utils.ts                # Funções utilitárias globais
├── public/                     # Ativos estáticos (icon.png, icon.svg)
├── services/                   # Camada de comunicação direta com API
│   ├── auth.ts                 # Serviços de Login/Registro
│   └── pets.ts                 # Serviços de CRUD e Imagens
├── styles/                     # Arquivos de estilo adicionais
└── .env                       # Variáveis de ambiente (Secrets e URLs)

```

## <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg2N3UxdWRsbGtjcjF6a2draXpocTk0ODFoZ2lhZ3l4eHI2ZXBnMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3YAxVrJrjWIeeADRM7/giphy.gif" alt="class" width="35" height="35" /> Conclusão

Este projeto reflete a entrega de uma solução Fullstack robusta, onde a prioridade foi alinhar a experiência do usuário (UX) a uma arquitetura de código limpa, segura e funcional. O desafio de criar um ecossistema de gerenciamento com regras de acesso personalizadas foi superado através da separação clara de responsabilidades entre o NestJS no backend e o Next.js no frontend.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHFoMzdwcmF1bDEwNGM0YWoyMnFhNTc0MHV5eGlld3ZyaTJ6bTJlNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XUA7ZZcBl0McuVqwd8/giphy.gif" alt="class" width="25" height="25" /> Pontos de Destaque

* **Gestão Avançada de Permissões**: Implementação de um sistema de controle de acesso (RBAC) que diferencia Usuários Comuns (donos de registros) de Administradores (moderadores globais), garantindo a integridade dos dados.
* **Manipulação de Mídias**: Inclusão de um módulo dedicado para o gerenciamento de imagens dos pets, permitindo upload, substituição e deleção com persistência vinculada.
* **Escalabilidade e Infraestrutura**: Uso de ferramentas de ponta como Prisma ORM e Docker, facilitando a manutenção e permitindo que a aplicação cresça de forma organizada.
* **Qualidade e Estabilidade**: Validações rigorosas com Zod, tipagem estrita com TypeScript e uma cobertura de testes automatizados (unitários e E2E) que asseguram o funcionamento contínuo do sistema.
* **Foco no Usuário**: Interface responsiva e moderna desenvolvida com Tailwind CSS e Shadcn UI, proporcionando uma navegação fluida e estados de feedback (Skeletons e Toasts) em qualquer dispositivo.

##  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGRtYnRkZnY4cGc4ZzYzMzFkcnI2Y3BkYnk4Nm0xMHRzd2FjZjY5OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BXjqytvu9bKzCUHdzz/giphy.gif" alt="class" width="35" height="35" /> Agradecimentos

Gostaria de expressar minha gratidão à InteraTo pela oportunidade de participar deste desafio técnico. O desenvolvimento deste projeto foi uma experiência enriquecedora que permitiu consolidar conhecimentos em arquitetura modular, segurança da informação e desenvolvimento de interfaces modernas.

<br />
<p align="center">
  <kbd>
    <b>🐶 Sem bugs, apenas miau-ravilhas e cão-fiança. Obrigado por explorar este ecossistema! 🐱</b>
  </kbd>
</p>
