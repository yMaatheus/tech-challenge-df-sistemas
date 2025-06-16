# Teste técnico DF Sistemas

## ✨ Funcionalidades desenvolvidas

- **CRUD de Produtos**
  - Cadastro, listagem, atualização e remoção de produtos
- **CRUD de Avaliações**
  - Avaliação de produtos, edição, listagem por produto e exclusão
- **Endpoint de média das avaliações**
  - Calcula a média de avaliações de um produto utilizando aggregation pipeline do MongoDB   
- **Seed automatizado** (com dados fake)
- **Documentação Swagger completa**
  - Todos os endpoints e modelos de DTOs documentados
- **Docker Compose pronto para producão e desenvolvimento**
  - MongoDB, Backend (NestJS) e Frontend integrados

---

## 🧑‍💻 Tecnologias e padrões

- **NestJS** com arquitetura limpa (camadas: interface, app, domain)
- **Mongoose** para ODM MongoDB
- **Docker Compose** para ambiente local completo (banco, API, frontend)
- **Validação de dados** com `class-validator` e mensagens de erro customizadas
- **Testes automatizados** com Jest para repository, com ```80% de cobertura```, use cases e controllers
- **Swagger** em `/v1/docs` com exemplos e contratos

---

## Deploy

- **URL de Produção:**  
  - Backend NestJS(Fly.io): [https://df-sistemas-nestjs.fly.dev/v1](https://df-sistemas-nestjs.fly.dev/v1)
  - Frontend Vite React(Vercel): [https://dfcom.ymaatheus.dev/](https://dfcom.ymaatheus.dev/)
 
  ---
  > Documentação Swagger: [https://expenses-tech-challenge.fly.dev/v1/docs](https://df-sistemas-nestjs.fly.dev/v1/docs)

---

## 🚀 Como rodar em Docker

**Pré-requisitos**:

- Docker
- Docker Compose

1. **Clone o repositório**

   ```sh
   git clone git@github.com:yMaatheus/tech-challenge-df-sistemas.git
   cd tech-challenge-df-sistemas
   ```

2. **Instale as dependências**

   ```sh
   cd server/
   npm install

   cd ..

   cd client/
   npm install
   ```

3. **📦 Variáveis de ambiente**
  
   - Crie dentro da pasta ```/server``` crie um arquivo ```.env.file``` com o ```MONGO_URI``` do banco de dados, no docker deixe assim:

   ```
   MONGO_URI=mongodb://admin:admin123@mongo:27017/products_db?authSource=admin
   ```

   - Crie dentro da pasta ```/client``` crie um arquivo ```.env``` com o ```VITE_API_URL``` apontando para o backend:

   ```
   VITE_API_URL=http://localhost:3333/v1
   ```

4. **Suba os containers**

   ```sh
   docker compose -f docker-compose.dev.yml up -d
   ```

   Isso irá iniciar:
   - MongoDB
   - Backend(NestJS)
   - Frontend

5. **Acesse a documentação Swagger**

  - http://localhost:3333/api/docs
  

# 🌱 Seed de dados (opcional)

  Para popular o banco com produtos e avaliações fake:
  ```sh
   docker compose exec api npm run seed
   ```
   Isso criará produtos e avaliações automáticas para testes.

# 🧪 Testes
  Execute os testes unitários no ```backend```:

  ```sh
   cd server/
   npm run test
   ```

# 📑 Estrutura de pastas

  * `client/`
    * `src/`
      * `assets/`: Logo, imagens, ícones ficam nessa pasta.
      * `common/*`: Interfaces, enums, tipos separados por module/feature ficam nessa pasta.
      * `components/`
        * `app/*`: Componentes que possuem regras de negócio e estão presentes em uma ou mais páginas da aplicação.
        * `ui/*`: Aqui ficam componentes relacionados ao design system, ou seja, componentes que são utilizados em mais de um local e <b>não possuem regra de negócio</b>, exemplo: Botões, Inputs e etc.
      * `contexts/`: Estados que são usados em toda ou diversos lugares da aplicação.
      * `hooks/`: Componentes utilitários.
      * `lib/`: Implementações e/ou abstrações de libs externas.
      * `pages/`: Arquivos relacionados as páginas do projeto, a estrura de pastas devem seguir o mesmo caminho da url, exemplo: https://localhost:3000/products/review/create ficaria assim:
        ```
        pages/
          products/
            review/
              create/
                create-review.tsx
                create-review.test.ts
                index.ts
        ```
        * `pages/(page)/components`: Para componentes que existem apenas naquela pagina, criamos uma pasta <b>components/</b> dentro, exemplo:
            ```
              pages/
                dashboard/
                  chats/
                    chat/
                      components/
                        chat-content/
                        chat-content.tsx
                        chat-content.styles.scss
                    chat.tsx
                    chat.styles.scss
            ```
      * `services/`: Chamadas externas a APIs ou serviços externos.
      * `utils/`: Funções úteis que não necessariamente possua alguma regra de negócio.
  * `server/`
    * `src/`
      * `app/*`: Casos de uso e lógica de negócio.
      * `interface/*`: Repositórios, schemas (Mongoose).
      * `http/*`: # Controllers, módulo de rotas
      * `utils/*`: Funções úteis que não necessariamente possua alguma regra de negócio.

# 🔗 Endpoints principais

  ### Produtos
  - `POST /v1/products` — Criar produto  
  - `GET /v1/products` — Listar produtos
  - `GET /v1/products/:id` — Busca um produto especifico
  - `PATCH /v1/products/:id` — Atualizar produto  
  - `DELETE /v1/products/:id` — Remover produto  

  ### Avaliações
  - `GET /v1/reviews/product/:productId/average` — Média das avaliações  
  - `POST /v1/reviews` — Criar avaliação  
  - `GET /v1/reviews/product/:productId` — Listar avaliações de um produto  
  - `PATCH /v1/reviews/:id` — Atualizar avaliação  
  - `DELETE /v1/reviews/:id` — Remover avaliação  
