# TP2 — Tasks e GitHub Projects com Angular + NestJS

Plano de implantação do quadro, elaborado a partir das 30 histórias do arquivo `Historias_de_Usuario_TP2_Priorizadas(1).md`. Os textos e prioridades das HUs são preservados abaixo. Este documento não cria nem altera itens no GitHub.

## 1. Premissas e decisões a preencher

- Um Project pessoal chamado **TP2 — Product Backlog e Desenvolvimento**, reunindo frontend e backend.
- `<REPO_FRONT>` e `<REPO_BACK>` representam os nomes completos `dono/repositorio`; substituir antes do cadastro. As HUs ficam no backend por convenção deste plano, e as tasks ficam no repositório em que o trabalho será entregue.
- Responsáveis e datas ficam sem preenchimento até a distribuição da equipe. Não há estimativas de horas inventadas.
- Prioridades P0/P1/P2 expressam importância, não dispensam requisitos P1/P2 da entrega final.
- Autenticação e papéis são pré-requisitos técnicos das histórias, sem ampliar para recuperação de senha, cadastro social ou gestão completa de usuários. Para demonstração, contas de teste previamente criadas bastam se compatíveis com a especificação do professor.
- Stack confirmada: **Angular no frontend e NestJS no backend**, ambos com TypeScript. Versões, biblioteca visual, banco, ORM, autenticação, provedor de mapas, e-mail e hospedagem ainda precisam ser definidos ou registrados conforme os repositórios existentes. Não pressupor PrimeNG, Prisma, TypeORM ou JWT como decisões já tomadas.
- Decisões propostas a ratificar na preparação: se o bairro não puder ser identificado com confiança, bloquear cadastro com explicação; manter coordenadas originais na edição; definir se editar conteúdo invalida validação prévia; usar data de criação e status atual nas estatísticas; ao excluir categoria com monitoramento, cancelar o monitoramento afetado, sem ampliar critérios. Essas propostas não substituem requisitos adicionais da especificação do professor.

## 2. Hierarquia e divisão entre repositórios

| Item | Local | Uso |
|---|---|---|
| 30 HUs, uma issue por história | `<REPO_BACK>` | Texto original, aceite funcional e links para tasks |
| Tasks BE | `<REPO_BACK>` | Regras, persistência, API, e-mail e PDF |
| Tasks FE | `<REPO_FRONT>` | Interface, integração com API e verificação pela interface |
| Preparação técnica | Repositório indicado no catálogo | Trabalho transversal, referenciado pelas HUs |
| Project único | Conta pessoal | Reúne todas as issues acima |

Vincular cada task de HU como sub-issue da sua HU, inclusive quando estiver no outro repositório. Adicionar **as HUs e as tasks** ao Project: não pressupor que adicionar a issue pai inclua as filhas automaticamente. Uma task compartilhada tem apenas um pai; as outras HUs referenciam sua dependência. As tasks BASE permanecem independentes.

Os identificadores deste documento são códigos de planejamento, não números reais de issues. Após cadastrar, substituir referências por links reais, inclusive entre repositórios. Não duplicar uma HU no frontend só para fazê-la aparecer na visualização desse repositório.

## 3. Campos do Project

Usar campos personalizados do próprio Project para não depender de configuração de uma organização. Campos nativos são reaproveitados.

| Campo | Tipo | Valores / regra |
|---|---|---|
| Status | Seleção única | A fazer; Em andamento; Concluído |
| Prioridade | Seleção única | P0; P1; P2, nesta ordem |
| Natureza | Seleção única | História; Task |
| Área | Seleção única | Produto; Frontend; Backend |
| Etapa | Seleção única | E0 Preparação; E1 Fluxo principal; E2 Acompanhamento; E3 Administração e análise; E4 Entrega |
| Bloqueado | Seleção única | Não; Sim |
| Ordem | Número | Sequência manual dentro da etapa, definida na reunião de distribuição |
| Assignees | Nativo | Uma pessoa responsável por task; colaboradores podem participar |
| Repository | Nativo | Repositório real da issue |
| Parent issue | Nativo | HU pai da task |
| Sub-issue progress | Nativo | Progresso de tasks da HU, sem substituir aceite funcional |

Configuração inicial: Status = A fazer; Bloqueado = Não, salvo dependência ainda pendente; Natureza = História e Área = Produto nas HUs. Tasks recebem Natureza = Task e a área indicada. Prioridade das tasks acompanha a HU; BASE é P0. A prioridade não é necessariamente herdada automaticamente: preencher explicitamente. Dependências ficam no corpo da issue, com links; marcar Bloqueado quando impedirem o próximo trabalho real.

## 4. Visualizações

Os filtros abaixo são condições a configurar no editor de filtros do Project. São descrições, não comandos para copiar.

| Visualização | Layout | Filtro | Organização |
|---|---|---|---|
| Product Backlog | Tabela | Natureza = História | Agrupar por Prioridade; ordenar por Ordem; mostrar status e progresso |
| Kanban | Quadro | Natureza = Task | Colunas por Status; mostrar prioridade, responsável, área e bloqueio |
| Frontend | Quadro | Natureza = Task e Repository = `<REPO_FRONT>` | Colunas por Status |
| Backend | Quadro | Natureza = Task e Repository = `<REPO_BACK>` | Colunas por Status |
| Por história | Tabela | Natureza = Task | Agrupar por Parent issue; BASE fica sem pai |
| Bloqueios | Tabela | Bloqueado = Sim e Status diferente de Concluído | Mostrar prioridade, responsável e pai; consultar motivo na issue |
| Entrega | Tabela | Todos os itens | Agrupar por Etapa; mostrar Natureza para distinguir HUs de tasks |

O Kanban tem exatamente **A fazer → Em andamento → Concluído**. Revisão, integração e correções permanecem Em andamento, identificadas no checklist da task. Não criar uma quarta coluna para revisão ou bloqueio. Sugestão de limite: uma task ativa por pessoa; a pessoa pode revisar PRs enquanto aguarda dependência.

## 5. Labels, PRs e automações

Criar nos dois repositórios: `tp2`, `historia`, `task`, `bug`, `bloqueado`. Usar `tp2` em todos os itens deste plano e `historia`/`task` conforme a natureza. Prioridade e área são campos do Project; evitar replicá-las em labels e criar divergência. O campo Bloqueado é a referência do quadro; caso use também a label, atualizar ambos juntos.

- Ativar workflow de novo item com Status A fazer e issue fechada com Status Concluído, quando disponíveis. Configurar retorno para A fazer em reabertura se o workflow permitir; caso contrário, fazê-lo manualmente.
- Adicionar manualmente os itens dos dois repositórios. Auto-add por `label:tp2` é opcional e depende da disponibilidade/limites da conta; não é pré-requisito do plano.
- Fechar task por PR com `Closes #NUMERO` no mesmo repositório ou referência completa entre repositórios. Conferir o efeito de fechamento após o merge na branch padrão.
- Não fechar automaticamente uma HU só porque uma task terminou. Fechar a HU após todas as dependências obrigatórias e critérios funcionais passarem.
- Não automatizar conclusão da HU pelo percentual de sub-issues: tasks compartilhadas externas ao pai também precisam estar prontas.
- Reabertura da issue deve ser refletida no Project; conferir essa sincronização no teste inicial do quadro.

Branch sugerida: `feat/hu01-3-formulario`. Cada PR informa task atendida, comportamento implementado, testes e evidências. Se a disciplina exigir TDD, seguir o ciclo teste que falha → implementação mínima → refatoração e registrar evidência; este documento não pressupõe uma exigência de três commits por teste.

## 6. Preparação transversal

Cada linha corresponde a uma issue independente. Não criar uma task extra de teste para cada pequeno passo: incluir os testes relevantes na própria entrega.

| ID / título                                             | Repo / área      | Etapa | Entrega e aceite                                                                                                                                                                                                                                            | Dependências                                  |
| ------------------------------------------------------- | ---------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| BASE-CONTRATOS — Definir modelo e contrato mínimo       | BACK / Backend   | E0    | Entregar `docs/contratos-api.md` no backend, revisado por front e back: entidades, operações REST, requests/responses, erros, autenticação, upload e PDF; ver checklist detalhado em 6.1                                                                    | Nenhuma                                       |
| BASE-BE — Preparar API, dados e autenticação            | BACK / Backend   | E0    | Preparar NestJS, configuração de ambiente, persistência/migrações conforme banco escolhido, autenticação, guards de autorização, ValidationPipe e padrão de erros; configurar documentação OpenAPI; contas de teste por papel e teste HTTP de acesso negado | BASE-CONTRATOS                                |
| BASE-FE — Preparar interface e sessão                   | FRONT / Frontend | E0    | Preparar Angular, rotas públicas/restritas, HttpClient, configuração da URL da API, serviço de sessão e interceptor conforme autenticação acordada; implementar login/logout, route guards e tratamento de sessão expirada                                  | BASE-CONTRATOS                                |
| BASE-MAPA — Preparar integração de mapas                | BACK / Backend   | E0    | Criar MapasService injetável no NestJS para consulta geográfica; documentar provedor, credenciais e resposta normalizada; orientar biblioteca de mapa no Angular; geolocalização do dispositivo fica no navegador; substituir provedor por mock nos testes  | BASE-CONTRATOS                                |
| BASE-EMAIL — Preparar envio de e-mails                  | BACK / Backend   | E0    | Criar NotificacoesService injetável no NestJS, transporte configurável, ambiente de teste e templates; definir falha/retentativa e deduplicação sem impor broker; separar envio de novos registros e conclusão                                              | BASE-BE                                       |
| BASE-CI-BE — Automatizar verificações do backend        | BACK / Backend   | E0    | Build NestJS/TypeScript, lint e testes de regras e endpoints executam em PR; comandos e versões fixados no README e lockfile                                                                                                                                | BASE-BE                                       |
| BASE-CI-FE — Automatizar verificações do frontend       | FRONT / Frontend | E0    | Build Angular, lint configurado e testes pertinentes de formulários, componentes e cliente HTTP executam em PR; usar runner compatível com a versão instalada e documentar comandos                                                                         | BASE-FE                                       |
| ENTREGA-BE — Validar entrega integrada e documentação   | BACK / Backend   | E4    | Executar cenários finais, revisar setup e variáveis, conferir requisitos da disciplina com a especificação oficial e registrar pendências; HUs obrigatórias aceitas                                                                                         | Todas as tasks BE de HU                       |
| ENTREGA-FE — Validar demonstração e interface integrada | FRONT / Frontend | E4    | Percorrer fluxos por papel, verificar estados vazios/erros e links de e-mail, documentar execução e evidências da demonstração                                                                                                                              | Todas as tasks FE de HU; APIs correspondentes |

BASE e ENTREGA são P0 por necessidade de entrega, não por alterar prioridade das HUs. Datas e responsáveis: a definir. Não concluir ENTREGA antes da verificação conjunta dos dois repositórios.

### 6.1. BASE-CONTRATOS — O que precisa ser combinado

**Objetivo:** permitir que Angular e NestJS sejam implementados por pessoas diferentes sem divergências sobre nomes de campos, formatos e regras. Esta task entrega um acordo documentado; as implementações pertencem às tasks seguintes.

**Local e responsabilidade:** `docs/contratos-api.md` no backend, com link no README do frontend. Uma pessoa conduz e representantes das duas camadas revisam. Começar pelas operações de E1 e ampliar o contrato junto das próximas funcionalidades; não bloquear todo o trabalho tentando prever cada detalhe da entrega final.

- [ ] Registrar versões adotadas de Angular, NestJS e Node e o gerenciador de pacotes; respeitar o setup existente.
- [ ] Definir entidades e campos mínimos, formato dos identificadores e relações. DTO de API não é automaticamente uma tabela do banco.
- [ ] Para cada operação da etapa: método HTTP, caminho, papel autorizado, parâmetros, corpo, resposta de sucesso e erros.
- [ ] Escolher nomes de propriedades e enumerações. Proposta: camelCase, status `PENDENTE`/`CONCLUIDA` e `validada` booleano separado; interface apresenta textos em português.
- [ ] Definir quais campos são obrigatórios, opcionais ou nulos, limites de texto/imagem e formato de datas com fuso. Não usar limites diferentes em Angular e NestJS.
- [ ] Definir autenticação: como a sessão é estabelecida, enviada e encerrada. Se usar cookies, documentar credenciais, CORS e proteção contra CSRF; se usar token, documentar envio, validade e armazenamento escolhido. Nenhuma dessas opções foi decidida pelas HUs.
- [ ] Definir envelope de erros e códigos estáveis, para o Angular apresentar mensagens por campo sem interpretar frases do servidor.
- [ ] Definir upload de foto: proposta de um cadastro `multipart/form-data`, com fotografia opcional, campos escalares e conversão explícita dos números no backend. Não exigir um serviço de upload separado.
- [ ] Definir PDF como resposta binária `application/pdf`, nome do arquivo e resposta de erro; frontend deve distinguir PDF de erro.
- [ ] Registrar regras pendentes de negócio da seção 1 e sua decisão antes da implementação afetada.
- [ ] Incluir exemplos de sucesso e falha que possam ser usados como mocks no Angular e casos de teste no NestJS.

**Exemplo de contrato proposto para cadastro — confirmar na BASE-CONTRATOS:**

| Item | Acordo proposto |
|---|---|
| Operação | `POST /ocorrencias` |
| Autorização | Cidadão autenticado; autor extraído da sessão no backend |
| Conteúdo | `multipart/form-data`: titulo, descricao, categoriaId, latitude, longitude; fotografia opcional |
| Conversão | Latitude/longitude chegam como texto no multipart; converter e validar números e limites geográficos no servidor |
| Campos definidos pelo servidor | autor, região resolvida, status inicial, validação inicial, identificador e datas |
| Sucesso | HTTP 201, corpo com id, status, validada e criadoEm |
| Falhas | 400 para entrada inválida; 401 sem sessão; 403 sem permissão; 422 para regra de atendimento/categoria; 503 para indisponibilidade externa que impeça validar |

Exemplo de resposta de sucesso (identificador e data ilustrativos):

```json
{"id":"ocorrencia-exemplo","status":"PENDENTE","validada":false,"criadoEm":"2026-11-12T18:00:00Z"}
```

Exemplo de envelope de erro a implementar e documentar, não presumido como padrão automático do NestJS:

```json
{"statusCode":400,"code":"DADOS_INVALIDOS","message":"Revise os campos informados.","fieldErrors":{"titulo":["Informe o título."]}}
```

O Angular usa interfaces TypeScript para representar esses dados. O NestJS usa DTOs/classes ou esquemas com validação em execução, conforme a abordagem escolhida. Tipagem TypeScript sozinha não valida uma requisição recebida. O frontend não envia autor, status ou validação como autoridade sobre esses valores.

**Pronta quando:** os dois lados conseguem montar uma requisição e interpretar suas respostas usando somente o contrato; o fluxo inicial tem exemplos acordados e não resta decisão bloqueante para as tasks que vão começar. A geração OpenAPI/Swagger entra na BASE-BE e é atualizada nas tasks das funcionalidades; manter exemplos e implementação coerentes, sem exigir geração automática de cliente Angular.

### 6.2. Organização técnica proposta

Adotar uma aplicação Angular e uma API NestJS. A separação abaixo é por funcionalidade, dentro dos dois repositórios existentes; não implica microserviços, novos repositórios ou uma task por arquivo.

| Funcionalidade | Angular: páginas/componentes e serviços HTTP | NestJS: módulo e responsabilidades |
|---|---|---|
| Autenticação | Login, sessão, interceptor e route guards | AuthModule, autenticação e guards de papéis |
| Ocorrências | Mapa, detalhes e formulário reutilizável; OcorrenciasApiService | OcorrenciasModule, controller, service e DTOs de criação/edição/consulta |
| Categorias | Administração e seletor; CategoriasApiService | CategoriasModule, controller, service e DTOs |
| Regiões/mapas | Administração, geolocalização e mapa; RegioesApiService | RegioesModule e MapasService para identificação geográfica |
| Acompanhamentos | Controle Acompanhar/Cancelar; AcompanhamentosApiService | AcompanhamentosModule, inscrição e encerramento |
| Monitoramentos | Formulário e lista; MonitoramentosApiService | MonitoramentosModule, critérios e correspondência |
| Notificações | Navegação pelo link recebido; não enviar e-mail no navegador | NotificacoesModule, transporte e templates reutilizados pelos fluxos |
| Estatísticas/relatórios | Painel público e consulta administrativa; serviços HTTP de consulta/PDF | ConsultasModule proposto com controllers público/administrativo, agregação e geração PDF |

Os nomes são sugestões para orientar as tasks, não exigência de classes com grafia exata. Reutilizar componentes e services existentes. Usar componentes standalone em projeto Angular novo se compatível com a versão escolhida; não migrar um projeto existente somente para seguir esta proposta. Reactive Forms é a proposta para formulários; uma biblioteca visual pode ser escolhida pela equipe sem alterar as HUs.

**Divisão de responsabilidades:** componente apresenta dados e interações; serviço HTTP Angular conversa com a API; controller NestJS recebe e encaminha requisição; service NestJS aplica regras e coordena persistência. DTO valida formato de entrada; regras como região ativa e permissão do autor precisam ser verificadas no backend. Route guard melhora navegação, mas não substitui autorização no servidor.

### 6.3. Integração e testes sem aumentar o escopo

- Em BASE-FE/BASE-BE, registrar portas, URL base, origens permitidas e modo de sessão. Segredos de banco/e-mail ficam no backend; configuração entregue ao navegador é pública.
- Testes NestJS: priorizar regras nos services, com substitutos para mapas/e-mail, e testes HTTP para comprovar validação e autorização. Testar um método diretamente não comprova que o guard ou pipe foi executado na rota.
- Testes Angular: verificar formulários, estados da interface e chamadas HTTP esperadas com backend de teste. Usar ferramentas compatíveis com a versão instalada; não impor um runner ainda não escolhido.
- Para TDD, escrever o cenário de regra antes da implementação quando exigido pela disciplina; manter teste e implementação dentro da mesma task funcional.
- Integrar ao menos os fluxos essenciais com as duas aplicações executando. Mock permite avançar, mas não comprova a integração real.
- Não introduzir biblioteca global de estado, filas externas, cliente gerado ou pacote compartilhado entre repositórios apenas para cumprir esta documentação. Adotar somente se a equipe já utiliza ou houver necessidade concreta.

## 7. Ordem de execução e dependências críticas

| Etapa | Trabalho sugerido | Condição de saída |
|---|---|---|
| E0 Preparação | Tasks BASE | Projetos executáveis, contratos acordados e serviços de teste disponíveis |
| E1 Fluxo principal | HUs P0, antecipando HU04.1/HU04.2 | Registrar, consultar, validar e concluir; HU01.4 só é aceita com aviso aos monitoramentos |
| E2 Acompanhamento | Demais HUs P1 | Acompanhar/cancelar, notificar conclusão, moderar e editar respeitando regras |
| E3 Administração e análise | HUs P2 | Desativações, exclusão de categoria, estatísticas, filtros e PDF |
| E4 Entrega | ENTREGA-BE e ENTREGA-FE | Integração, evidências e documentação verificadas |

**HU04.1 e HU04.2 continuam P1, mas entram em E1 por dependência da HU01.4.** Implementar primeiro o serviço de correspondência e testá-lo com dados controlados; depois conectá-lo ao evento de criação. Não fazer HU04.2 depender da HU01.4 completa, evitando um ciclo artificial. A integração final é verificada na HU01.4.

A HU10.3 pode validar a transição de status antes do acompanhamento estar pronto, mas o fluxo completo de conclusão com e-mail só é aceito junto das HU03.2, HU03.3 e HU10.4. As tasks FE podem avançar com contrato/mock enquanto aguardam a API; só ficam concluídas depois de integradas.

## 8. Catálogo de histórias e tasks

**Regra comum a todas as tasks:** incluir testes pertinentes ao comportamento alterado, atualizar documentação do contrato quando necessário, passar pelas verificações do repositório e integrar com a outra camada antes do aceite. O critério funcional de cada HU é verificado com as entregas BE/FE em conjunto. As verificações específicas abaixo integram o checklist da HU, sem gerar automaticamente novas issues.

Pré-requisito transversal: tasks BE usam BASE-BE e tasks FE usam BASE-FE; essa dependência vale para todo o catálogo mesmo quando não repetida em cada linha. Dependências entre camadas indicam integração final; um backend pode avançar com contrato e testes sem aguardar uma tela concluída.

Cada task tem título no formato `[ID] Descrição`, prioridade da HU, Status inicial A fazer e responsável a definir. O campo Parent issue aponta para a HU desta seção. Os textos técnicos são uma proposta de decomposição, não uma alteração do texto original da HU.

### HU06.1 — Cadastrar e modificar categorias

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador, gostaria de consultar, cadastrar e modificar categorias, recebendo indicação de dados inválidos e disponibilizando as novas categorias válidas como ativas, para manter as opções de classificação das ocorrências.

#### [HU06.1-BE] Implementar API e regras: cadastrar e modificar categorias

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** BASE-BE.
- **Entrega:** Implementar consulta, criação e atualização de categorias; validar nome e dados obrigatórios; novas categorias começam ativas; restringir alterações ao administrador.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: CategoriasController/Service e DTOs de criação/edição; testar categoria criada ativa e autorização administrativa.

#### [HU06.1-FE] Implementar interface e integração: cadastrar e modificar categorias

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** BASE-BE; HU06.1-BE (integração final).
- **Entrega:** Criar lista e formulário administrativo de categorias com criação, edição, erros por campo e atualização da lista.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Página de categorias com Reactive Forms e CategoriasApiService; testar erro por campo e atualização da lista.

**Aceite funcional / verificações da história:**

- [ ] Administrador cria categoria ativa, consulta e altera.
- [ ] dados inválidos não persistem.
- [ ] cidadão não consegue alterar.

### HU07.1 — Definir as regiões atendidas

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador, gostaria de definir quais regiões reconhecidas a partir das informações da API de mapas estão ativas para atendimento, utilizando inicialmente bairros quando houver informação confiável e sem desenhar polígonos manualmente, para delimitar a área atendida pelo sistema.

#### [HU07.1-BE] Implementar API e regras: definir as regiões atendidas

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** BASE-BE; BASE-MAPA.
- **Entrega:** Integrar consulta de regiões reconhecidas pela API; persistir identificador geográfico, município e estado para evitar bairros homônimos; permitir ativação administrativa sem polígonos próprios.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: RegioesController/Service consumindo MapasService; DTO de região reconhecida com contexto geográfico.

#### [HU07.1-FE] Implementar interface e integração: definir as regiões atendidas

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** BASE-BE; BASE-MAPA; HU07.1-BE (integração final).
- **Entrega:** Criar busca e seleção das regiões reconhecidas, com contexto de município/estado e indicação das regiões ativas.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Página administrativa de regiões e RegioesApiService; seleção por resultado reconhecido, sem editor de polígonos.

**Aceite funcional / verificações da história:**

- [ ] Administrador ativa região reconhecida.
- [ ] bairro sem identificação confiável não é aceito silenciosamente.
- [ ] nenhuma delimitação manual é exigida.

### HU01.1 — Obter a localização atual

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria de cadastrar uma ocorrência utilizando exclusivamente a localização atual obtida do meu dispositivo, mediante minha permissão, e poder tentar novamente caso a obtenção falhe, para registrar o problema no local em que estou.

#### [HU01.1-FE] Implementar interface e integração: obter a localização atual

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** BASE-FE.
- **Entrega:** Solicitar permissão de geolocalização; capturar coordenadas atuais do dispositivo; tratar recusa, indisponibilidade e tempo esgotado com nova tentativa; não oferecer endereço digitado ou marcador arrastável.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Encapsular geolocalização do navegador em serviço Angular; componente trata permissão, falha e nova tentativa; testar com localização simulada.

**Aceite funcional / verificações da história:**

- [ ] Sem permissão ou sem coordenadas não se avança.
- [ ] nova tentativa funciona.
- [ ] localização não pode ser escolhida manualmente.

### HU07.2 — Verificar o bairro do registro

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria que meu bairro fosse identificado a partir da localização atual do dispositivo e verificado entre as regiões ativas, recebendo uma explicação caso o cadastro seja impedido, para saber se posso registrar uma ocorrência naquele local.

#### [HU07.2-BE] Implementar API e regras: verificar o bairro do registro

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU07.1-BE; HU01.1-FE.
- **Entrega:** Resolver coordenadas pela API de mapas; identificar bairro confiável e comparar com regiões ativas; devolver motivo de bloqueio para região não atendida, identificação inconclusiva ou falha externa.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: MapasService resolve coordenadas; RegioesService verifica atendimento; controller devolve resultado tipado e motivo de bloqueio.

#### [HU07.2-FE] Implementar interface e integração: verificar o bairro do registro

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU07.1-BE; HU01.1-FE; HU07.2-BE (integração final).
- **Entrega:** Mostrar bairro identificado e resultado da verificação; explicar bloqueio e permitir tentar obter a localização novamente.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Consumir verificação via RegioesApiService; renderizar bairro, carregamento e mensagem de bloqueio no fluxo de cadastro.

**Aceite funcional / verificações da história:**

- [ ] Coordenadas em região ativa liberam fluxo.
- [ ] região inativa, desconhecida ou API indisponível não libera cadastro por engano.

### HU01.2 — Verificar a região e escolher a categoria

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria que o sistema identificasse minha região e verificasse se ela está ativa e é atendida antes de permitir a escolha de uma categoria ativa, para cadastrar ocorrências dentro da área de atendimento.

#### [HU01.2-BE] Implementar API e regras: verificar a região e escolher a categoria

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU07.2-BE; HU06.1-BE.
- **Entrega:** Reutilizar verificação territorial e disponibilizar somente categorias ativas para novo registro; revalidar região/categoria no envio final, sem confiar apenas na interface.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Reutilizar RegioesService/CategoriasService; DTO e service rejeitam região/categoria inválida no cadastro definitivo.

#### [HU01.2-FE] Implementar interface e integração: verificar a região e escolher a categoria

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU07.2-BE; HU06.1-BE; HU01.2-BE (integração final).
- **Entrega:** Habilitar seleção de categoria apenas após validação da região; carregar opções ativas e informar quando nenhuma estiver disponível.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: No formulário Angular, habilitar seletor apenas após região válida e carregar opções pelo CategoriasApiService.

**Aceite funcional / verificações da história:**

- [ ] Região inválida impede escolha.
- [ ] categoria desativada entre consulta e envio é rejeitada no servidor.

### HU01.3 — Preencher os dados da ocorrência

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria de informar título, descrição, categoria e localização atual, podendo anexar uma fotografia opcionalmente e recebendo indicação de dados ausentes ou inválidos, para enviar uma ocorrência com as informações necessárias.

#### [HU01.3-BE] Implementar API e regras: preencher os dados da ocorrência

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU01.2-BE; HU01.2-FE.
- **Entrega:** Definir contrato de criação e validação de título, descrição, categoria e coordenadas; implementar recebimento opcional de imagem, limites e tipos permitidos documentados; preparar serviço para HU01.4 sem criar rota concorrente.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: CreateOcorrenciaDto ou esquema equivalente, ValidationPipe e validação de arquivo conforme adaptador HTTP escolhido; regras no OcorrenciasService.

#### [HU01.3-FE] Implementar interface e integração: preencher os dados da ocorrência

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU01.2-BE; HU01.2-FE; HU01.3-BE (integração final).
- **Entrega:** Criar formulário com título, descrição, categoria, localização somente para leitura e fotografia opcional; apresentar erros; manter preenchimento após erro recuperável.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Reactive Forms para título/descrição/categoria; preparar FormData para campos e foto; não definir manualmente o boundary multipart.

**Aceite funcional / verificações da história:**

- [ ] Registro sem fotografia é permitido.
- [ ] campos obrigatórios ausentes e anexo inválido geram erro.
- [ ] arquivo rejeitado não fica abandonado.

### HU01.4 — Confirmar o registro

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria de confirmar o cadastro da ocorrência e receber a confirmação de seu registro como Pendente, associado a mim, à localização, à região e à categoria selecionada, com notificação aos interessados nos monitoramentos correspondentes, para comunicar o problema e torná-lo conhecido por quem monitora esses critérios.

#### [HU01.4-BE] Implementar API e regras: confirmar o registro

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU01.3-BE; HU01.3-FE; HU04.2-BE.
- **Entrega:** Concluir operação transacional de cadastro com autor autenticado, região, categoria, coordenadas, data e status Pendente; acionar notificações de novas ocorrências via HU04.2; evitar duplicação por repetição acidental da requisição.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: OcorrenciasController recebe cadastro; OcorrenciasService obtém autor da sessão e persiste; chamar serviço de notificação após persistência bem-sucedida.

#### [HU01.4-FE] Implementar interface e integração: confirmar o registro

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU01.3-BE; HU01.3-FE; HU04.2-BE; HU01.4-BE (integração final).
- **Entrega:** Criar revisão e confirmação do envio; impedir clique repetido enquanto processa; mostrar sucesso somente após confirmação do servidor e abrir registro criado.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: OcorrenciasApiService faz POST; componente mostra revisão, bloqueia reenvio enquanto aguarda e navega para detalhes pelo Router após sucesso.

**Aceite funcional / verificações da história:**

- [ ] Uma confirmação cria uma ocorrência Pendente ligada ao autor correto.
- [ ] erros não exibem sucesso.
- [ ] monitoramentos correspondentes recebem notificação.

### HU02.1 — Visualizar ocorrências no mapa

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como pessoa interessada, gostaria de visualizar no mapa as ocorrências Pendentes e Concluídas e seus respectivos status, mesmo sem autenticação, para conhecer os problemas registrados na área consultada.

#### [HU02.1-BE] Implementar API e regras: visualizar ocorrências no mapa

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** BASE-MAPA; BASE-BE.
- **Entrega:** Criar consulta pública de ocorrências existentes com coordenadas, identificador e status Pendente/Concluída; incluir registros de regiões e categorias inativas.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Endpoint público no OcorrenciasController e resposta tipada com id, coordenadas e status; não aplicar guard de login à consulta pública.

#### [HU02.1-FE] Implementar interface e integração: visualizar ocorrências no mapa

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** BASE-MAPA; BASE-BE; HU02.1-BE (integração final).
- **Entrega:** Integrar mapa público com marcadores e legenda de status; tratar carregamento, falha e ausência de registros; atualizar dados após mudanças relevantes.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Componente de mapa consome OcorrenciasApiService; atualizar marcadores e legenda sem duplicá-los a cada resposta.

**Aceite funcional / verificações da história:**

- [ ] Visitante sem login vê os dois status.
- [ ] regiões inativas não ocultam registros antigos.
- [ ] excluídos não aparecem.

### HU02.2 — Consultar os detalhes de uma ocorrência

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como pessoa interessada, gostaria de selecionar um marcador no mapa e visualizar título, descrição, categoria, região, localização, status e fotografia, quando houver, da ocorrência selecionada, para compreender o problema registrado.

#### [HU02.2-BE] Implementar API e regras: consultar os detalhes de uma ocorrência

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU02.1-BE; HU02.1-FE.
- **Entrega:** Criar consulta pública por identificador com título, descrição, categoria, região, coordenadas, status, validação e foto opcional; responder adequadamente a registro inexistente.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: GET por identificador no OcorrenciasController, resposta pública com dados permitidos e 404 para ausência.

#### [HU02.2-FE] Implementar interface e integração: consultar os detalhes de uma ocorrência

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.1-BE; HU02.1-FE; HU02.2-BE (integração final).
- **Entrega:** Abrir detalhes ao selecionar marcador e por link direto; exibir foto somente quando existir; tratar registro removido.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Componente de detalhes acessível por rota com id e seleção no mapa; serviço HTTP compartilha consulta dos dois caminhos.

**Aceite funcional / verificações da história:**

- [ ] Marcador abre o registro correto.
- [ ] todos os dados da HU são exibidos sem autenticação.
- [ ] ausência de foto não quebra a tela.

### HU10.1 — Validar uma ocorrência

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como moderador, gostaria de analisar e marcar uma ocorrência como validada por meio de uma indicação independente do status, mantendo-a Pendente até a resolução, para distinguir a validação das informações da conclusão do problema.

#### [HU10.1-BE] Implementar API e regras: validar uma ocorrência

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU02.2-BE; BASE-BE.
- **Entrega:** Implementar ação exclusiva de moderador para marcar validação em atributo separado do status; preservar status Pendente; impedir alterações indevidas em concluídas.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Ação de validação no OcorrenciasController com guard de moderador; service altera validada preservando status.

#### [HU10.1-FE] Implementar interface e integração: validar uma ocorrência

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.2-BE; BASE-BE; HU10.1-BE (integração final).
- **Entrega:** Mostrar indicação de validação e ação para moderador na tela de detalhes; atualizar indicação sem apresentar conclusão.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Ação no componente de detalhes e método de validação em OcorrenciasApiService; atualizar resultado usando resposta do servidor.

**Aceite funcional / verificações da história:**

- [ ] Validar mantém Pendente.
- [ ] cidadão não valida pela API.
- [ ] marcação é distinta do status público.

### HU10.3 — Concluir uma ocorrência validada

**Prioridade:** P0 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como moderador, gostaria de marcar como Concluída uma ocorrência Pendente somente após sua validação e a constatação de que o problema foi solucionado, atualizando seu status nas consultas públicas, para informar sua resolução.

#### [HU10.3-BE] Implementar API e regras: concluir uma ocorrência validada

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU10.1-BE; HU10.1-FE.
- **Entrega:** Implementar transição atômica Pendente→Concluída apenas para ocorrência validada e por moderador; registrar data de conclusão; acionar serviço final de HU03.2 quando disponível; impedir repetição da transição.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Ação de conclusão com guard de moderador e verificação de estado no OcorrenciasService; testar requisições repetidas pelo endpoint.

#### [HU10.3-FE] Implementar interface e integração: concluir uma ocorrência validada

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU10.1-BE; HU10.1-FE; HU10.3-BE (integração final).
- **Entrega:** Exibir ação de conclusão ao moderador com confirmação de resolução; bloquear quando não validada; atualizar detalhes e mapa.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Confirmação de resolução em detalhes; método concluir no serviço HTTP; refletir status retornado no mapa e detalhes.

**Aceite funcional / verificações da história:**

- [ ] Não validada não conclui.
- [ ] moderador conclui validada.
- [ ] nova chamada não gera segunda transição.
- [ ] consulta pública reflete Concluída.

### HU03.1 — Acompanhar uma ocorrência

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria de acompanhar uma ocorrência Pendente, sem criar inscrições duplicadas, para receber notificações sobre sua conclusão.

#### [HU03.1-BE] Implementar API e regras: acompanhar uma ocorrência

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU02.2-BE; BASE-BE.
- **Entrega:** Implementar inscrição de usuário autenticado em ocorrência Pendente com unicidade usuário/ocorrência; rejeitar inscrição em concluída ou inexistente.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: AcompanhamentosController/Service usa usuário da sessão; restrição de unicidade na persistência, além da validação do service.

#### [HU03.1-FE] Implementar interface e integração: acompanhar uma ocorrência

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.2-BE; BASE-BE; HU03.1-BE (integração final).
- **Entrega:** Criar ação Acompanhar e indicação Já acompanhando; direcionar visitante para autenticação antes de inscrever.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Componente reutilizável Acompanhar/Cancelar e AcompanhamentosApiService; consultar estado da inscrição do usuário.

**Aceite funcional / verificações da história:**

- [ ] Duas tentativas geram uma inscrição.
- [ ] ocorrência concluída não aceita acompanhamento novo.

### HU03.2 — Receber a notificação de conclusão

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão que acompanha uma ocorrência, gostaria de receber um e-mail quando seu status mudar de Pendente para Concluído, sem receber notificações por alterações em outros dados, para saber quando o problema foi solucionado.

#### [HU03.2-BE] Implementar e verificar comportamento: receber a notificação de conclusão

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU03.1-BE; HU10.3-BE; BASE-EMAIL.
- **Entrega:** Integrar envio de e-mail aos acompanhantes na transição de conclusão; usar identificador de evento/destinatário para impedir processamento repetido; não acionar por edição ou validação; registrar falha técnica mínima para retentativa sem guardar conteúdo excluído.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: NotificacoesService recebe conclusão e destinatários; testar transporte substituído, falhas e deduplicação; não criar endpoint público de envio.

#### [HU03.2-FE] Integrar e verificar fluxo: receber a notificação de conclusão

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU03.1-BE; HU10.3-BE; BASE-EMAIL; HU03.2-BE (integração final).
- **Entrega:** Validar fluxo pela interface e caixa de e-mail de teste: acompanhar, concluir como moderador e abrir link público recebido; registrar evidência de integração.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Executar fluxo Angular integrado ao NestJS e caixa de teste; esta task é verificação, sem criar tela de envio de e-mail.

**Aceite funcional / verificações da história:**

- [ ] Acompanhante recebe e-mail ao concluir.
- [ ] validação e edição não disparam.
- [ ] reprocessar evento não repete envio já confirmado.

### HU03.3 — Encerrar o acompanhamento

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão que acompanha uma ocorrência, gostaria de poder cancelar o acompanhamento antes da conclusão e de tê-lo encerrado automaticamente após a notificação final de conclusão, caso ainda esteja inscrito, para deixar de receber e-mails quando o acompanhamento terminar.

#### [HU03.3-BE] Implementar API e regras: encerrar o acompanhamento

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU03.1-BE; HU03.2-BE.
- **Entrega:** Implementar cancelamento pelo próprio usuário; encerrar inscrição após envio final confirmado; coordenar cancelamento e envio para não notificar quem cancelou antes do processamento; tratar falha sem perder envio pendente.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: AcompanhamentosService implementa cancelamento e encerramento; integrar confirmação do transporte de e-mail ao fechamento do vínculo.

#### [HU03.3-FE] Implementar interface e integração: encerrar o acompanhamento

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU03.1-BE; HU03.2-BE; HU03.3-BE (integração final).
- **Entrega:** Permitir deixar de acompanhar enquanto Pendente e atualizar estado após conclusão/cancelamento, reutilizando controle de HU03.1.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Reutilizar controle de acompanhamento e serviço HTTP; estado visual segue resposta do backend, inclusive falha no cancelamento.

**Aceite funcional / verificações da história:**

- [ ] Cancelamento anterior ao envio impede notificação.
- [ ] envio final confirmado encerra vínculo.
- [ ] falha de envio permite retentativa.

### HU04.1 — Configurar um monitoramento

**Prioridade:** P1 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão autenticado, gostaria de configurar o monitoramento de uma região, de uma categoria ou da combinação de ambas, informando ao menos um critério, para selecionar quais novos registros são de meu interesse.

#### [HU04.1-BE] Implementar API e regras: configurar um monitoramento

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU06.1-BE; HU07.1-BE; BASE-BE.
- **Entrega:** Criar e listar monitoramentos por usuário com região, categoria ou ambas; exigir pelo menos um critério; combinação usa correspondência conjunta; restringir acesso ao proprietário.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: MonitoramentosController/Service e DTO com validação entre campos: região ou categoria obrigatória; ambos implicam AND.

#### [HU04.1-FE] Implementar interface e integração: configurar um monitoramento

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU06.1-BE; HU07.1-BE; BASE-BE; HU04.1-BE (integração final).
- **Entrega:** Criar tela de monitoramentos com seletores e resumo dos critérios; impedir submissão sem critérios e exibir erros do servidor.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Reactive Forms com validação de grupo exigindo ao menos um seletor; MonitoramentosApiService cria e lista inscrições.

**Aceite funcional / verificações da história:**

- [ ] Região isolada, categoria isolada e combinação são aceitas.
- [ ] formulário vazio é rejeitado.
- [ ] usuário não acessa monitoramentos alheios.

### HU04.2 — Receber notificações de novas ocorrências

**Prioridade:** P1 · **Etapa:** E1 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão com monitoramento ativo, gostaria de receber e-mails somente quando novas ocorrências corresponderem aos critérios selecionados, para conhecer novos problemas de meu interesse sem receber, por esse monitoramento, notificações de alterações posteriores.

#### [HU04.2-BE] Implementar e verificar comportamento: receber notificações de novas ocorrências

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU04.1-BE; BASE-EMAIL.
- **Entrega:** Implementar correspondência e envio de e-mail apenas em novos registros; região+categoria exige ambas; cancelar/inativar impede envios; deduplicar destinatário quando múltiplos monitoramentos correspondem à mesma ocorrência.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: MonitoramentosService seleciona destinatários e NotificacoesService envia; testar combinações e sobreposição sem exigir criação completa via interface.

#### [HU04.2-FE] Integrar e verificar fluxo: receber notificações de novas ocorrências

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU04.1-BE; BASE-EMAIL; HU04.2-BE (integração final).
- **Entrega:** Verificar os três modos de monitoramento ponta a ponta em caixa de teste; confirmar que mensagem contém dados mínimos e link público; documentar resultados.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Verificar formulários Angular e links recebidos com ambiente de e-mail de teste; nenhuma nova tela é necessária.

**Aceite funcional / verificações da história:**

- [ ] Novo registro correspondente envia e-mail.
- [ ] não correspondente não envia.
- [ ] edição, validação e conclusão não acionam monitoramento.

### HU04.3 — Escolher o acompanhamento individual

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão notificado por um monitoramento, gostaria de consultar a nova ocorrência e decidir se quero acompanhá-la individualmente, sem inscrição automática, para escolher de quais problemas desejo receber a notificação de conclusão.

#### [HU04.3-BE] Implementar e verificar comportamento: escolher o acompanhamento individual

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU04.2-BE; HU03.1-BE; HU02.2-FE.
- **Entrega:** Garantir que entrega de e-mail de monitoramento não cria acompanhamento; reutilizar inscrição explícita de HU03.1 e verificar ausência de vínculo após notificação.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Testar que serviço de monitoramento não chama criação de acompanhamento; reutilizar AcompanhamentosService somente na ação explícita.

#### [HU04.3-FE] Integrar e verificar fluxo: escolher o acompanhamento individual

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU04.2-BE; HU03.1-BE; HU02.2-FE; HU04.3-BE (integração final).
- **Entrega:** Abrir detalhes pelo link recebido; oferecer escolha explícita Acompanhar após autenticação e manter consulta pública sem inscrição.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Router abre detalhes pelo id do link; visitante consulta e só inscreve após autenticação e clique no controle de acompanhamento.

**Aceite funcional / verificações da história:**

- [ ] Abrir link ou receber e-mail não inscreve.
- [ ] clique explícito autenticado inscreve uma única vez.

### HU04.4 — Cancelar um monitoramento

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão com monitoramento ativo, gostaria de cancelá-lo sem alterar meus acompanhamentos individuais, para interromper os e-mails de novos registros e continuar acompanhando as ocorrências que escolhi.

#### [HU04.4-BE] Implementar API e regras: cancelar um monitoramento

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU04.1-BE; HU04.1-FE.
- **Entrega:** Implementar cancelamento de monitoramento pelo proprietário; retirar somente aquele monitoramento da seleção de destinatários; preservar acompanhamentos.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Endpoint de cancelamento em MonitoramentosController verifica proprietário; service não altera tabela/vínculos de acompanhamentos.

#### [HU04.4-FE] Implementar interface e integração: cancelar um monitoramento

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU04.1-BE; HU04.1-FE; HU04.4-BE (integração final).
- **Entrega:** Adicionar ação de cancelamento na lista de monitoramentos e atualizar lista após resposta; apresentar erro quando falhar.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Lista de monitoramentos chama cancelamento pelo MonitoramentosApiService e só remove item após resposta de sucesso.

**Aceite funcional / verificações da história:**

- [ ] Monitoramento cancelado para novos avisos.
- [ ] acompanhamentos individuais continuam ativos.
- [ ] outro usuário não cancela.

### HU09.1 — Confirmar a exclusão de conteúdo inadequado

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como moderador, gostaria de solicitar a exclusão de uma ocorrência inadequada e confirmar explicitamente seu caráter definitivo, podendo cancelar sem alterar os dados, para evitar remoções acidentais.

#### [HU09.1-FE] Implementar interface e integração: confirmar a exclusão de conteúdo inadequado

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.2-FE; HU09.2-BE.
- **Entrega:** Criar diálogo de exclusão exclusivo para moderador: avisar remoção definitiva de ocorrência, foto e acompanhamentos; Cancelar não envia exclusão; Confirmar chama HU09.2 e trata falha.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Diálogo Angular de confirmação no componente de detalhes; botão Cancelar só fecha diálogo; botão Confirmar chama OcorrenciasApiService.

**Aceite funcional / verificações da história:**

- [ ] Cancelar preserva dados.
- [ ] confirmação explícita é necessária.
- [ ] falha do servidor não remove marcador local como se tivesse concluído.

### HU09.2 — Excluir definitivamente uma ocorrência

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como moderador, gostaria de excluir definitivamente uma ocorrência inadequada, sua fotografia e seus vínculos de acompanhamento, retirando-a das consultas, do mapa, das estatísticas e dos relatórios, sem manter registro administrativo ou histórico da exclusão, para remover integralmente esse conteúdo do sistema.

#### [HU09.2-BE] Implementar API e regras: excluir definitivamente uma ocorrência

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU02.2-BE; BASE-BE.
- **Entrega:** Implementar exclusão definitiva exclusiva de moderador; remover ocorrência, fotografia, acompanhamentos e pendências de e-mail associadas; coordenar banco/arquivo para não reportar sucesso parcial; não criar histórico de exclusão ou soft delete.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: DELETE protegido no OcorrenciasController; service coordena exclusão de persistência, foto e pendências; testar falha parcial sem criar histórico administrativo.

#### [HU09.2-FE] Implementar interface e integração: excluir definitivamente uma ocorrência

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.2-BE; BASE-BE; HU09.2-BE (integração final).
- **Entrega:** Após exclusão confirmada, atualizar mapa/listas e fechar detalhes; tratar link antigo como indisponível; verificar ausência em estatísticas e relatórios quando disponíveis.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Serviço HTTP executa DELETE; componente fecha detalhes e atualiza mapa após sucesso; rota antiga trata 404.

**Aceite funcional / verificações da história:**

- [ ] Não restam ocorrência, foto ou vínculos.
- [ ] nenhuma consulta retorna conteúdo excluído.
- [ ] cidadão não exclui.
- [ ] não existe registro administrativo da exclusão.

### HU10.2 — Editar uma ocorrência pendente

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como autor autenticado da ocorrência ou moderador, gostaria de editar seus dados enquanto ela estiver Pendente, respeitando as validações aplicáveis e sem enviar e-mails aos acompanhantes por alterações que não mudem o status, para corrigir ou atualizar as informações do registro.

#### [HU10.2-BE] Implementar API e regras: editar uma ocorrência pendente

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU01.3-BE; HU02.2-FE.
- **Entrega:** Implementar edição só para autor ou moderador e apenas enquanto Pendente; reutilizar validações; manter localização capturada como somente leitura nesta proposta; não disparar e-mails; definir com equipe efeito da edição sobre validação antes da task.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: UpdateOcorrenciaDto e service verificam status e autoria no momento da gravação; não basta guard de papel para permitir edição do próprio registro.

#### [HU10.2-FE] Implementar interface e integração: editar uma ocorrência pendente

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU01.3-BE; HU02.2-FE; HU10.2-BE (integração final).
- **Entrega:** Reutilizar formulário para editar título, descrição, categoria e foto; ocultar ação sem permissão ou após conclusão; apresentar conflito se status mudar durante edição.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Reutilizar formulário Angular de ocorrência em modo edição; preencher controles com dados atuais e tratar conflito retornado pelo backend.

**Aceite funcional / verificações da história:**

- [ ] Terceiro não edita.
- [ ] concluída rejeita alteração também pela API.
- [ ] alteração inválida não persiste.
- [ ] edição não envia e-mails.

### HU10.4 — Consultar o resultado definitivo do acompanhamento

**Prioridade:** P1 · **Etapa:** E2 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como cidadão que acompanha uma ocorrência, gostaria de receber um e-mail de conclusão, ter o acompanhamento encerrado e continuar podendo consultar o registro concluído, sem edição ou reabertura e sem um segundo e-mail por monitoramento de região ou categoria, para conhecer e consultar o resultado final do problema.

#### [HU10.4-BE] Implementar e verificar comportamento: consultar o resultado definitivo do acompanhamento

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU03.2-BE; HU03.3-BE; HU10.2-BE; HU04.2-BE.
- **Entrega:** Verificar em integração o fluxo definitivo reutilizando HU03.2/HU03.3/HU10.3: concluir, notificar, encerrar acompanhamento e rejeitar edição/reabertura; não criar nova rota de conclusão.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Teste integrado NestJS dos services de conclusão, notificação e acompanhamento; verificar ausência de rota/regra de reabertura.

#### [HU10.4-FE] Integrar e verificar fluxo: consultar o resultado definitivo do acompanhamento

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU03.2-BE; HU03.3-BE; HU10.2-BE; HU04.2-BE; HU10.4-BE (integração final).
- **Entrega:** Exibir registro concluído consultável, sem controles de edição/reabertura; validar acesso pelo e-mail e ausência de segundo aviso por monitoramento.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: No componente de detalhes, concluída fica somente leitura; testar acesso pelo link e ausência dos controles de alteração.

**Aceite funcional / verificações da história:**

- [ ] Concluída permanece pública.
- [ ] acompanhamento termina após aviso.
- [ ] nenhum segundo e-mail vem de monitoramento.
- [ ] edição e reabertura são impedidas.

### HU05.1 — Consultar estatísticas

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como pessoa interessada, gostaria de consultar, sem autenticação, gráficos ou painéis de ocorrências Pendentes e Concluídas por região e período, para observar a quantidade, a distribuição e a evolução dos registros ao longo do tempo.

#### [HU05.1-BE] Implementar API e regras: consultar estatísticas

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU02.1-BE.
- **Entrega:** Criar agregação pública por região, período e status; retornar totais e série por data de criação, identificando status atual; definir limites do período e fuso; não inventar histórico de transições.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Controller público e service de consultas agregam registros; DTO de resposta contém totais e séries, sem expor dados de navegação.

#### [HU05.1-FE] Implementar interface e integração: consultar estatísticas

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.1-BE; HU05.1-BE (integração final).
- **Entrega:** Criar painel público com totais Pendentes/Concluídas, distribuição por região e evolução de registros por data de criação.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Página de estatísticas consome resposta tipada; componentes de totais/gráfico reutilizam os mesmos dados filtrados.

**Aceite funcional / verificações da história:**

- [ ] Visitante acessa.
- [ ] totais coincidem com registros existentes.
- [ ] série temporal tem eixo e critério de data identificados.

### HU05.2 — Filtrar e atualizar as estatísticas

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como pessoa interessada, gostaria de alterar a região, o período e o filtro de status e visualizar as estatísticas atualizadas, com indicação quando não houver dados e sem contabilizar ocorrências excluídas definitivamente, para analisar os registros existentes conforme meu interesse.

#### [HU05.2-BE] Implementar API e regras: filtrar e atualizar as estatísticas

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU05.1-BE; HU05.1-FE.
- **Entrega:** Aplicar filtros de região, início/fim e status à agregação; validar intervalos; retornar vazio/zero sem incluir registros excluídos.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: DTO de query para região, período e status; converter/validar parâmetros e reutilizar agregação.

#### [HU05.2-FE] Implementar interface e integração: filtrar e atualizar as estatísticas

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU05.1-BE; HU05.1-FE; HU05.2-BE (integração final).
- **Entrega:** Adicionar filtros e atualizar painel ao aplicar; tratar carregamento/erro e ausência de dados; evitar exibir resposta antiga após troca rápida de filtros.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Formulário de filtros e serviço HTTP com query params; cancelar/ignorar respostas antigas, por exemplo com switchMap.

**Aceite funcional / verificações da história:**

- [ ] Combinações retornam contagem correta.
- [ ] período inválido é explicado.
- [ ] consulta vazia mostra mensagem.
- [ ] exclusão afeta contagem seguinte.

### HU06.2 — Desativar categorias

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador, gostaria de desativar categorias, identificando-as na administração com um símbolo de alerta e indicação de inatividade, sem remover suas associações com ocorrências antigas, para impedir novos usos e preservar as informações históricas.

#### [HU06.2-BE] Implementar API e regras: desativar categorias

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU06.1-BE; HU06.1-FE.
- **Entrega:** Implementar desativação administrativa sem apagar categoria ou vínculos; impedir uso em novos registros; manter nome consultável em registros antigos.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: CategoriasService altera atividade e preserva vínculos; teste HTTP confirma que cadastro de ocorrência rejeita categoria desativada.

#### [HU06.2-FE] Implementar interface e integração: desativar categorias

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU06.1-BE; HU06.1-FE; HU06.2-BE (integração final).
- **Entrega:** Adicionar ação Desativar e exibir símbolo de alerta acompanhado de texto Inativa; retirar opção dos novos cadastros.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Reutilizar página administrativa e serviço de categorias; combinar ícone e texto Inativa; atualizar opções do cadastro.

**Aceite funcional / verificações da história:**

- [ ] Categoria inativa mantém ocorrências antigas.
- [ ] novos registros com seu identificador são rejeitados.
- [ ] alerta não depende só de cor.

### HU06.3 — Excluir categorias sem ocorrências vinculadas

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador, gostaria de excluir definitivamente uma categoria, após confirmação, somente quando ela não possuir ocorrências vinculadas, podendo apenas desativá-la nos demais casos, para remover categorias desnecessárias sem comprometer os registros existentes.

#### [HU06.3-BE] Implementar API e regras: excluir categorias sem ocorrências vinculadas

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU06.2-BE; HU04.1-BE.
- **Entrega:** Permitir exclusão de categoria somente sem ocorrências vinculadas; proteger contra vínculo concorrente; limpar vínculos de monitoramento sem transformar combinação em critério mais amplo.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: CategoriasService verifica vínculos e executa exclusão protegida por integridade no banco; retornar conflito documentado quando vinculada.

#### [HU06.3-FE] Implementar interface e integração: excluir categorias sem ocorrências vinculadas

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU06.2-BE; HU04.1-BE; HU06.3-BE (integração final).
- **Entrega:** Criar confirmação de exclusão e mensagem de impedimento com opção de desativar quando houver ocorrências.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Diálogo de exclusão na administração; tratar conflito retornado pela API e oferecer desativação.

**Aceite funcional / verificações da história:**

- [ ] Categoria vinculada não é apagada.
- [ ] sem vínculo pode ser excluída.
- [ ] cancelamento preserva.
- [ ] monitoramento não amplia seu alcance após exclusão.

### HU07.3 — Desativar regiões preservando os registros

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador, gostaria de desativar uma região por remoção lógica, impedindo novos cadastros e mantendo suas ocorrências anteriores visíveis no mapa, nas estatísticas e nos relatórios, sem redistribuí-las, para encerrar o atendimento naquela região preservando seus registros.

#### [HU07.3-BE] Implementar API e regras: desativar regiões preservando os registros

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU07.1-BE; HU07.1-FE.
- **Entrega:** Desativar região por indicador de atividade; bloquear novos registros e manter vínculos e coordenadas existentes sem redistribuição.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: RegioesService altera atividade sem remover entidade; consultas públicas não filtram ocorrências antigas pela atividade da região.

#### [HU07.3-FE] Implementar interface e integração: desativar regiões preservando os registros

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU07.1-BE; HU07.1-FE; HU07.3-BE (integração final).
- **Entrega:** Disponibilizar desativação na administração; indicar região inativa; verificar permanência dos registros no mapa e nas consultas analíticas.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Ação de desativação na página de regiões; atualizar indicador local e verificar mapa/painéis integrados.

**Aceite funcional / verificações da história:**

- [ ] Novo registro é impedido.
- [ ] antigos continuam consultáveis no mesmo bairro.
- [ ] não há exclusão física da região.

### HU08.1 — Consultar ocorrências com filtros administrativos

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador autenticado, gostaria de consultar ocorrências existentes por status, região, data ou período e categoria, incluindo as concluídas e desconsiderando as excluídas definitivamente, para selecionar os registros relevantes à análise administrativa.

#### [HU08.1-BE] Implementar API e regras: consultar ocorrências com filtros administrativos

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU02.1-BE; BASE-BE.
- **Entrega:** Criar consulta restrita a administrador com filtros combináveis de status, região, data/período e categoria; reutilizar regras de consulta em HU08.2.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Controller administrativo com guard e DTO de filtros; extrair consulta reutilizável pelo gerador de PDF.

#### [HU08.1-FE] Implementar interface e integração: consultar ocorrências com filtros administrativos

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU02.1-BE; BASE-BE; HU08.1-BE (integração final).
- **Entrega:** Criar tela administrativa com filtros e tabela de resultados, incluindo concluídas; apresentar vazio, erro e intervalo inválido.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Página administrativa com Reactive Forms para filtros, tabela e serviço HTTP; preservar filtros aplicados para exportação.

**Aceite funcional / verificações da história:**

- [ ] Filtros combinados funcionam.
- [ ] não administrador recebe negativa.
- [ ] excluídos não aparecem.
- [ ] concluídos podem ser consultados.

### HU08.2 — Gerar relatório em PDF

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador autenticado, gostaria de gerar um relatório em PDF com os filtros aplicados, a quantidade total e uma tabela com título, categoria, região, data e status das ocorrências encontradas, com indicação explícita quando não houver resultados, para obter um documento dos registros consultados.

#### [HU08.2-BE] Implementar API e regras: gerar relatório em pdf

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU08.1-BE; HU08.1-FE.
- **Entrega:** Gerar PDF a partir da mesma consulta de HU08.1, contendo filtros, total, título, categoria, região, data e status; garantir linhas legíveis, paginação e mensagem sem resultados.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Endpoint protegido retorna bytes PDF e cabeçalhos corretos; usar a mesma consulta de HU08.1 e biblioteca PDF escolhida pela equipe.

#### [HU08.2-FE] Implementar interface e integração: gerar relatório em pdf

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU08.1-BE; HU08.1-FE; HU08.2-BE (integração final).
- **Entrega:** Adicionar ação Gerar PDF usando filtros atuais e autenticação; sinalizar processamento/erro e disponibilizar arquivo retornado.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: HttpClient recebe blob; iniciar download, liberar URL temporária e tratar erro binário/JSON sem salvá-lo como PDF.

**Aceite funcional / verificações da história:**

- [ ] PDF corresponde aos filtros enviados e ao total no momento da geração.
- [ ] zero resultados produz documento explícito.
- [ ] textos longos e múltiplas páginas são legíveis.

### HU08.3 — Utilizar somente dados das ocorrências nos relatórios

**Prioridade:** P2 · **Etapa:** E3 · **Issue pai:** `<REPO_BACK>` · **Área:** Produto

> Eu, como administrador autenticado, gostaria de obter relatórios baseados exclusivamente nos dados das ocorrências armazenadas, sem coleta de acessos, buscas ou atividades de navegação e sem exigir gráficos, logs de auditoria ou estatísticas de acesso, para realizar uma consulta administrativa simples dos registros.

#### [HU08.3-BE] Implementar e verificar comportamento: utilizar somente dados das ocorrências nos relatórios

- **Repositório:** `<REPO_BACK>` · **Área:** Backend.
- **Depende de:** HU08.2-BE; HU08.2-FE.
- **Entrega:** Revisar consulta e geração de HU08.1/HU08.2; comprovar que dependem apenas de dados armazenados das ocorrências e seus vínculos de categoria/região; não implementar coleta de navegação ou relatório de acessos.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist NestJS: Revisar dependências do service de relatórios e testar dados de entrada; não criar novo endpoint apenas para esta HU.

#### [HU08.3-FE] Integrar e verificar fluxo: utilizar somente dados das ocorrências nos relatórios

- **Repositório:** `<REPO_FRONT>` · **Área:** Frontend.
- **Depende de:** HU08.2-BE; HU08.2-FE; HU08.3-BE (integração final).
- **Entrega:** Revisar tela/PDF para confirmar ausência de exigência de gráficos, acessos ou auditoria; registrar evidência no aceite da HU, reutilizando interface de relatórios.
- **Pronto quando:** entrega implementada/verificada na sua camada, verificações relevantes abaixo aprovadas e integração demonstrada.

- **Checklist Angular: Revisar página e serviço HTTP de relatórios; verificar ausência de coleta adicional; task de evidência, sem nova tela.

**Aceite funcional / verificações da história:**

- [ ] Relatório funciona sem dados de navegação, buscas ou acessos.
- [ ] nenhuma coleta adicional é introduzida para atendê-lo.

## 9. Evitar duplicação e manter rastreabilidade

| Comportamento compartilhado | Implementação principal | HUs que integram/verificam |
|---|---|---|
| Resolver bairro e verificar região | HU07.2-BE | HU01.2 e HU01.4 revalidam com o mesmo serviço |
| Formulário e validação de ocorrência | HU01.3-BE/FE | HU01.4 confirma; HU10.2 reutiliza para edição |
| Aviso de novos registros | HU04.2-BE | HU01.4 aciona; HU04.3 abre o link |
| Inscrição individual | HU03.1-BE | HU04.3 reutiliza, sem inscrição automática |
| Conclusão | HU10.3-BE | HU03.2 envia; HU03.3 encerra; HU10.4 verifica conjunto |
| Consulta de relatórios | HU08.1-BE | HU08.2 gera PDF; HU08.3 verifica restrição de dados |
| Exclusão definitiva | HU09.2-BE | HU09.1 confirma; consultas e análises deixam de retornar registro |

Uma task de integração ou verificação pode exigir pouco código ou nenhum código novo. Seu resultado é a evidência do comportamento esperado. Não criar um segundo serviço apenas porque existe outra história descrevendo parte do mesmo fluxo.

## 10. Modelos de issues

### Issue de história

```markdown
Título: [HUxx.x] Título original

## História
Texto original integral.

## Critérios de aceitação
- [ ] Copiar os critérios funcionais do catálogo.

## Tasks
Vincular as sub-issues reais desta HU.

## Dependências externas
Links para tasks compartilhadas de outras HUs/BASE.

## Evidências
Cenário executado, resultado, PRs e capturas quando úteis.
```

### Issue de task

```markdown
Título: [HUxx.x-BE ou HUxx.x-FE] Título da task

## Objetivo e entrega
Copiar a entrega descrita no catálogo.

## Implementação técnica
Copiar o checklist Angular ou NestJS da task. Reutilizar componentes/services existentes.

## História pai
Link para a issue HU.

## Dependências
- Link e comportamento necessário de cada dependência.

## Checklist
- [ ] Contrato, DTOs/tipos e critérios compreendidos.
- [ ] Contrato/OpenAPI atualizado se request, response ou erro mudou.
- [ ] Testes pertinentes escritos/executados; TDD conforme exigência da disciplina.
- [ ] Implementação ou verificação concluída.
- [ ] Erros e permissões aplicáveis verificados.
- [ ] Integração com outra camada verificada.
- [ ] PR revisado e incorporado, quando houver código.
- [ ] Evidências registradas e verificações automatizadas aprovadas.

## Bloqueio
Nenhum, ou motivo + link + próxima ação necessária.
```

## 11. Definition of Ready e Definition of Done

**Para iniciar:** task possui responsável, objetivo verificável, contrato mínimo e dependências disponíveis ou possibilidade de trabalhar com mock acordado. Resolver decisões de negócio da preparação antes de implementar o comportamento afetado.

**Para concluir task:** comportamento entregue, testes pertinentes aprovados, PR incorporado quando aplicável, API/interface integradas e evidência anexada. Merge isolado não comprova aceite funcional.

**Para concluir HU:** tasks próprias prontas, dependências externas atendidas e todos os critérios funcionais aprovados no sistema integrado. HU01.4 exige e-mail de monitoramento. HU10.4 exige conclusão, e-mail final e encerramento de acompanhamento. HU08.3 exige evidência de ausência de coleta adicional, sem inventar funcionalidade nova.

**Para concluir entrega:** todas as HUs exigidas pela disciplina aceitas, instruções de execução verificadas, dados de demonstração disponíveis e checklist oficial de entrega conferido. Este plano deriva das HUs; critérios adicionais de avaliação precisam ser conferidos no enunciado original.

## 12. Checklist de configuração do GitHub Projects

- [ ] Preencher nomes completos dos dois repositórios.
- [ ] Criar/reutilizar o Project pessoal TP2; não duplicar um Project existente.
- [ ] Conceder acesso ao Project à equipe e conferir acesso separado aos dois repositórios.
- [ ] Solicitar ao responsável pelo repositório o vínculo na aba Projects se faltar permissão; acesso ao Project não concede acesso a repositório privado.
- [ ] Criar campos e opções da seção 3.
- [ ] Criar labels em ambos os repositórios.
- [ ] Criar as 30 HUs no backend, preservando os textos.
- [ ] Criar tasks no repositório indicado e vincular sub-issues às HUs.
- [ ] Criar tasks BASE e ENTREGA independentes.
- [ ] Adicionar todas as HUs e tasks ao mesmo Project.
- [ ] Preencher prioridade, natureza, área, etapa e status; atribuir responsáveis após distribuição.
- [ ] Substituir códigos de dependência por links reais e marcar bloqueios efetivos.
- [ ] Criar as sete visualizações e testar os filtros.
- [ ] Configurar os workflows disponíveis e testar criação, fechamento e reabertura com uma issue de teste.
- [ ] Verificar que o frontend e o backend mostram somente suas tasks e o Product Backlog mostra somente HUs.
- [ ] Testar uma task do frontend vinculada à HU do backend.
- [ ] Validar com a equipe as decisões propostas na seção 1.
- [ ] Revisar o quadro a cada reunião: bloqueios, próxima task, PRs e aceite das HUs.

## 13. Referências de configuração e implementação

Documentação oficial consultada em 12/11/2026. A configuração proposta usa Projects, campos, visualizações e hierarquia de issues; recursos opcionais de automação devem ser conferidos na conta utilizada.

- [Sobre Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Navegação de sub-issues e hierarquia](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/browsing-sub-issues)

Referências oficiais para os detalhes técnicos desta revisão:

- [Angular — Reactive Forms](https://angular.dev/guide/forms/reactive-forms)
- [Angular — interceptors HTTP](https://angular.dev/guide/http/interceptors)
- [NestJS — controllers](https://docs.nestjs.com/controllers)
- [NestJS — validação](https://docs.nestjs.com/application/validation)
- [NestJS — autorização](https://docs.nestjs.com/security/authorization)
- [NestJS — OpenAPI/Swagger](https://docs.nestjs.com/openapi/introduction)

As APIs e ferramentas concretas devem ser compatíveis com as versões instaladas nos repositórios. Os exemplos de rotas e nomes de classes neste plano são propostas de implementação, não descrição de código já existente.

## 14. Totais para conferir o cadastro

| Tipo | Quantidade |
|---|---:|
| Histórias | 30 |
| Tasks de HU — Backend | 28 |
| Tasks de HU — Frontend | 30 |
| Tasks de preparação | 7 |
| Tasks de entrega | 2 |
| Total de tasks | 67 |
| Total de issues no Project | 97 |

Esta revisão mantém os 97 itens planejados: não foram criadas tasks adicionais por componente, controller, service ou DTO.

As HUs HU01.1 e HU09.1 possuem apenas task FE; o servidor relacionado é coberto por outras HUs. HU08.3 permanece uma história separada com tasks de verificação, preservando a organização do arquivo original.
