# PixelFix Games — Sistema Web de Gestão de Oficina de Games

## 1. Requisitos Funcionais (RF)
| Cód. | Requisito |
|---|---|
| RF01 | O sistema deve permitir cadastrar clientes (nome, e-mail, senha, CPF e telefone celular). |
| RF02 | O sistema deve permitir listar todos os clientes. |
| RF03 | O sistema deve permitir consultar um cliente pelo código. |
| RF04 | O sistema deve permitir atualizar os dados de um cliente. |
| RF05 | O sistema deve permitir apagar um cliente. |
| RF06 | O sistema deve autenticar o cliente por e-mail e senha (login), retornando mensagem de erro em caso de falha. |
| RF07 | O sistema deve gerar um token de sessão ao autenticar e permitir o logout. |
| RF08 | O sistema deve exibir uma página principal com o nome do cliente logado e menu de navegação no topo. |
| RF09 | O sistema deve permitir cadastrar um console vinculado a um cliente cadastrado. |
| RF10 | O sistema deve permitir listar todos os consoles. |
| RF11 | O sistema deve permitir consultar consoles por termo (número de série ou código do console). |
| RF12 | O sistema deve permitir cadastrar agendamentos de manutenção (data e hora) vinculados a cliente e console. |
| RF13 | O sistema deve permitir atualizar um agendamento. |
| RF14 | O sistema deve listar os agendamentos ordenados pela data (e hora) agendada. |

## 2. Requisitos Não Funcionais (RNF)
| Cód. | Requisito |
|---|---|
| RNF01 | Senha, CPF e número de série do console devem ser armazenados criptografados (crypto-js, AES) — LGPD. |
| RNF02 | A sessão deve expirar em 90 minutos após o login. |
| RNF03 | Todas as rotas, exceto `/`, `/login` e `POST /cliente`, exigem token válido. |
| RNF04 | A API deve seguir o padrão REST, trocando dados em JSON e usando códigos HTTP adequados (200, 201, 400, 401, 404, 409, 500). |
| RNF05 | A senha nunca deve ser devolvida pela API. |
| RNF06 | O sistema deve usar banco relacional MySQL (`db_pixelfix`) com integridade referencial (chaves estrangeiras). |
| RNF07 | O frontend deve funcionar em navegadores atuais e escapar os dados exibidos (prevenção de XSS). |

## 3. Regras de Negócio (RN)
| Cód. | Regra |
|---|---|
| RN01 | Todos os campos do cliente são obrigatórios. |
| RN02 | Não pode haver dois clientes com o mesmo e-mail (evita cadastro duplicado). |
| RN03 | Um console só pode ser cadastrado para um cliente existente. |
| RN04 | O número de série do console é gravado criptografado e só é exibido descriptografado para o cliente logado. |
| RN05 | Um agendamento só pode usar um console que pertença ao cliente informado. |
| RN06 | Não pode haver dois agendamentos na mesma data e horário (evita conflito de bancada). |
| RN07 | A listagem de agendamentos é sempre ordenada por data e hora. |
| RN08 | Ao apagar um cliente, seus consoles e agendamentos também são apagados. |
| RN09 | No login, e-mail inexistente ou senha incorreta retornam 401 (credenciais inválidas). |
| RN10 | A atualização de cliente e de agendamento exige todos os campos. |

## 4. Infraestrutura
| Item | Tecnologia / versão |
|---|---|
| Banco de dados | MySQL (banco `db_pixelfix`, usuário `root`, porta 3306) |
| Linguagem | JavaScript (Node.js v22) |
| Back-end | Express 5.3, Sequelize 6.37, mysql2 3.24, cors 2.8, crypto-js 4.2 |
| Servidor | API local em `http://localhost:3000`; frontend estático (HTML/CSS/JS) aberto pelo Live Server (`http://localhost:5500`) |
| Teste de integração | REST Client (VS Code) — arquivo `backend/teste.http` |

## 5. Modelo lógico
Ver `diagramaMER.png`. Relacionamentos: **Cliente 1—N Console**, **Cliente 1—N Agendamento**, **Console 1—N Agendamento**.

- `clientes`(codCliente PK, nome, email UNIQUE, senha*, cpf*, telefone)
- `consoles`(codConsole PK, modelo, marca, numeroSerie*, servico, idCliente FK)
- `agendamentos`(codAgendamento PK, data, hora, idCliente FK, idConsole FK)

\* criptografado. Script SQL com 3 registros por tabela: `database/script_db_pixelfix.sql`.

> O diagrama de classes não está no repositório; ele segue as mesmas 3 entidades acima (com os atributos e relacionamentos 1—N).

## 6. Plano de teste de integração (API)
Executar na ordem do arquivo `backend/teste.http`.

| # | Cenário | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Cadastro de cliente válido | todos os campos | 201 |
| 2 | Cadastro com campos faltando | só nome | 400 |
| 3 | Cadastro com e-mail repetido | e-mail já existente | 409 |
| 4 | Login com e-mail inexistente | e-mail não cadastrado | 401 |
| 5 | Login com senha errada | senha incorreta | 401 |
| 6 | Login correto | e-mail e senha válidos | 200 + token |
| 7 | Rota privada sem token / token inválido | — | 401 |
| 8 | Sessão expirada | token com `expiraEm` vencido | 401 "Sessão expirada" |
| 9 | CRUD de cliente | listar, consultar, atualizar, apagar | 200 (CPF aparece descriptografado só na consulta) |
| 10 | Cadastro de console válido | dados + idCliente existente | 201 (número de série criptografado no banco) |
| 11 | Console com cliente inexistente | idCliente que não existe | 404 |
| 12 | Consulta de console por termo | parte do nº de série | 200 com o console; 404 se não houver |
| 13 | Agendamento válido | data futura, cliente e console dele | 201 |
| 14 | Agendamento em horário ocupado | mesma data e hora | 409 |
| 15 | Agendamento com console de outro cliente | — | 400 |
| 16 | Listagem de agendamentos | — | 200, ordenada por data e hora |
| 17 | Atualização de agendamento | nova data/hora | 200 |

## 7. Como executar
1. `cd backend && npm install`
2. Criar o banco: `node sync.js` (cria as tabelas vazias; precisa do banco `db_pixelfix` existente) **ou** importar `database/script_db_pixelfix.sql` (cria banco, tabelas e 3 registros por tabela).
3. `node index.js` (API em `localhost:3000`).
4. Abrir `frontend/html/logar.html` com o Live Server. Login de teste (se importou o script): `carlos@gmail.com` / `abc`.
