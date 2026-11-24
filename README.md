# Laboratório de mapas — Brasília

Protótipo acadêmico com Angular 22, TypeScript estrito, componentes standalone, Leaflet 1.9, tiles OpenStreetMap e consulta manual de geocodificação reversa ao Nominatim. CSS simples, sem framework visual ou APIs comerciais.

## Executar localmente

Use **Node.js 24 LTS (24.15 ou superior)** e npm. A versão principal está em `.nvmrc`. Com nvm:

```bash
nvm install
nvm use
npm ci
npm start
```

Sem nvm, instale o Node 24 LTS no ambiente em que executará o projeto (inclusive dentro do WSL, se for o caso), confira `node --version` e execute `npm ci` e `npm start`.

Abra **http://localhost:4200/** e mantenha o terminal aberto. O Angular recompila ao salvar alterações. Encerre com `Ctrl+C`. Para outra porta, use `npm start -- --port 4201`.

### A página não abre / “Failed to Load Page”

Confira o terminal e aguarde `Local: http://localhost:4200/`. Use HTTP, sem HTTPS. Se aparecer `The Angular CLI requires a minimum Node.js version`, o servidor não iniciou: **Node 22.22.1 não atende ao requisito**. Ative o Node 24 no mesmo terminal e execute novamente os comandos.

Se o servidor estiver pronto, tente **http://127.0.0.1:4200/**. Em acesso remoto por VS Code, encaminhe a porta 4200 na aba **Ports/Portas** e abra o endereço encaminhado.

No ambiente desta implementação há também um Node 24 temporário, que pode deixar de existir após reinicializações:

```bash
export PATH="/tmp/node-v24.22.3-linux-x64/bin:$PATH"
node --version
npm start
```

## Avaliar a geocodificação reversa

1. O mapa inicia em Brasília, nas coordenadas -15.7939, -47.8828, com zoom 12.
2. Arraste para navegar, use +/− ou a roda do mouse para ampliar e clique em um local público conhecido. O clique posiciona um marcador e mostra as coordenadas com seis casas decimais.
3. Acione **Consultar endereço**. Apenas esse botão envia uma consulta; clicar, navegar ou alterar o zoom não consulta o Nominatim.
4. Compare o endereço completo e os campos rua, número, bairro, cidade/localidade, estado, CEP e país com o endereço esperado. Campos ausentes aparecem como **Não informado**.
5. Expanda **Todos os campos de endereço** para conferir as chaves efetivamente recebidas e **Resposta JSON original** para inspecionar a resposta completa, sem renomear campos.

O painel mostra a origem (Nominatim ou cache local) e o tempo total da operação em milissegundos. Esse tempo inclui processamento local e eventual carregamento da configuração; não representa apenas a latência do servidor e não mede qualidade do endereço.

O Nominatim encontra o objeto adequado mais próximo no OpenStreetMap. Ele pode retornar uma rua vizinha ou um endereço incompleto; as coordenadas devolvidas identificam o objeto e podem diferir do ponto solicitado. Não trate isso como uma garantia de endereço exato. Os nomes das chaves de endereço variam conforme o mapeamento; a apresentação usa alternativas como `city`, `town`, `village` e `municipality`, mantendo o JSON original para análise.

A consulta usa `format=jsonv2`, `addressdetails=1`, `accept-language=pt-BR`, `zoom=18` e `layer=address`. O zoom da consulta é fixo e independente do zoom visual do mapa. A camada `address` prioriza objetos de endereço em vez de pontos de interesse.

Não há geolocalização, consulta automática, busca textual, planilha de avaliação ou exportação CSV nesta etapa.

## Política do Nominatim e limites do protótipo

Leia a [política oficial do serviço público](https://operations.osmfoundation.org/policies/nominatim/) antes de usar:

- No máximo **uma requisição por segundo para a aplicação inteira**, somando todos os usuários. Este protótipo é para avaliação manual local com **um usuário e uma aba**. O serviço Angular bloqueia consultas simultâneas e novas requisições de rede com intervalo inferior a 1,1 segundo nessa instância. Ele não coordena outras abas, navegadores ou máquinas. Antes de compartilhar a aplicação, implemente controle global em um backend ou use uma instância própria.
- Consultas idênticas bem-sucedidas ficam em `localStorage` por 24 horas, inclusive após recarregar a página. A chave considera endpoint, coordenadas e parâmetros. O cache não armazena erros; consultas em cache não acessam o Nominatim. Limpe o armazenamento do site nas ferramentas do navegador se precisar remover os dados. Se o armazenamento estiver indisponível, a consulta continua sem cache persistente.
- Não faça varreduras em grade, buscas sistemáticas, autocomplete ou consultas automáticas em lote. Não há repetição automática em caso de falha.
- Não envie coordenadas pessoais ou confidenciais. O serviço recebe o ponto escolhido e o cache guarda as respostas no navegador.
- A identificação usa o Referer permitido por `strict-origin-when-cross-origin`. Não remova esse cabeçalho. A atribuição e o link para a política aparecem no painel, além da atribuição dos tiles no mapa.

### Trocar o serviço sem recompilar

Edite `public/nominatim-config.json` durante o desenvolvimento, ou `nominatim-config.json` na raiz dos arquivos publicados após o build:

```json
{
  "endpoint": "https://nominatim.openstreetmap.org/reverse"
}
```

Recarregue a página depois da alteração. O destino deve aceitar a API reverse do Nominatim e permitir CORS quando estiver em outra origem. Não coloque credenciais nesse arquivo: ele é público. Para experimentos extensos, prepare uma instância própria; este protótipo não inclui servidor Nominatim ou proxy.

## Build e testes

```bash
npm run build
npm test -- --watch=false
```

Build de produção: `dist/mapa-prototipo/browser/`. Sirva essa pasta por HTTP; não abra `index.html` com `file://`. `npm test` mantém o modo de observação.

Os testes usam Vitest, jsdom e `HttpTestingController`, sem consultar os servidores públicos. Cobrem inicialização, tiles, atribuição, zoom, seleção e marcador, descarte do mapa, parâmetros de geocodificação, cache, troca de endpoint, limitação de consultas, falhas HTTP, resultados ausentes, painel e descarte de respostas de pontos anteriores.

A implementação também foi verificada com uma única consulta real em um ponto público de Brasília. Não havia navegador/controlador de navegador disponível; build e testes não substituem uma inspeção visual nem demonstram a precisão geral da geocodificação.

## Estrutura

```text
public/nominatim-config.json            # Endpoint editável sem recompilação
src/
  main.ts                              # Bootstrap Angular
  index.html                           # Idioma, título e política de Referer
  styles.css                           # CSS global e CSS do Leaflet
  app/
    app.config.ts                      # Configuração Angular e HttpClient
    app.ts / app.html / app.css         # Página, seleção e layout responsivo
    app.spec.ts
    features/map/
      map.component.ts / .css          # Leaflet e seleção com marcador
      map.component.spec.ts
      map.config.ts                    # Centro, zoom, tiles e atribuição
      nominatim.models.ts              # Coordenadas e respostas
      nominatim.service.ts             # HTTP, cache e intervalo entre consultas
      nominatim.service.spec.ts
      reverse-panel.component.ts       # Estado e consulta manual
      reverse-panel.component.html     # Endereço, campos, JSON e mensagens
      reverse-panel.component.css
      reverse-panel.component.spec.ts
```

A geolocalização pode futuramente ser adicionada como serviço independente. O mapa emite coordenadas, a página repassa a seleção ao painel, e o serviço de geocodificação encapsula o acesso ao Nominatim.

## Tiles do OpenStreetMap

Endpoint: `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, com atribuição visível **© OpenStreetMap contributors**. As imagens são carregadas diretamente pelo navegador, com cache HTTP padrão e Referer habilitado, sem download offline ou prefetch em massa. `updateWhenIdle` reduz requisições intermediárias. Os servidores comunitários têm capacidade limitada e disponibilidade sem garantia. Consulte a [política de tiles](https://operations.osmfoundation.org/policies/tiles/) antes de ampliar o uso.

## Comandos de implementação

A base foi gerada nesta pasta com:

```bash
npm exec --yes --package=@angular/cli@22.2.7 -- ng new mapa-prototipo --directory . --standalone --routing=false --style=css --ssr=false --skip-git --skip-install --package-manager=npm --defaults
```

Após configurar as dependências no `package.json`, foram executados `npm install --no-fund`, `npm run build`, `npm test -- --watch=false` e uma verificação HTTP com `npm start` e `curl`. A etapa de Nominatim não adicionou dependências. Nenhum outro repositório foi alterado.

Referências: [Angular](https://angular.dev/installation), [Leaflet](https://leafletjs.com/examples/quick-start/), [API reverse do Nominatim](https://nominatim.org/release-docs/latest/api/Reverse/) e [direitos autorais do OpenStreetMap](https://www.openstreetmap.org/copyright).
