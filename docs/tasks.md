# Checklist de Implementação: Wiki de Negócios

## Configuração e Definição do Novo Tipo de Wiki

**Definir o tipo "business"**
1. [ ] Identificar o local onde os tipos de wiki (ex: `comprehensive`, `concise`) são definidos (provavelmente em constantes, enums ou arquivos de configuração dentro de `src/`).
2. [ ] Adicionar `business` (ou um identificador similar) a essa definição.
3. [ ] *Arquivos potenciais a investigar (com base nas buscas):* `src/components/WikiTypeSelector.tsx` (pode conter a definição ou importá-la), arquivos em `src/config/` (se existirem), ou arquivos de serviço em `src/services/`.

**Armazenar o Prompt de Negócios**
4. [ ] Decidir a melhor forma de armazenar o novo prompt de negócios detalhado (definido no `development_plan_business_wiki.md`).
5. [ ] Opções a considerar:
6. [ ] Como uma string multi-linha diretamente no código onde é usado (ex: em `src/app/[owner]/[repo]/page.tsx`, similar aos prompts existentes).
7. [ ] Em um arquivo `.ts` ou `.md` separado dentro de um diretório como `src/prompts/` e importá-lo.
8. [ ] Implementar o armazenamento escolhido.

## Modificações na Lógica Central

**Atualizar Lógica de Seleção de Prompt**
9. [ ] Localizar o código que seleciona o prompt do LLM com base no tipo de wiki escolhido (provavelmente em `src/app/[owner]/[repo]/page.tsx` ou um serviço invocado por ele).
10. [ ] Modificar esta lógica para carregar e usar o novo prompt de negócios quando o tipo `business` for selecionado.

**Ajustar Componentes de Seleção de Tipo**
11. [ ] Modificar `src/components/WikiTypeSelector.tsx` para incluir "Business" como uma opção selecionável.
12. [ ] Isso envolverá adicionar o novo tipo à lista de opções que o componente renderiza.
13. [ ] Garantir que o valor associado (ex: `business`) seja corretamente propagado quando selecionado.
14. [ ] Verificar `src/components/ModelSelectionModal.tsx`, pois ele utiliza `WikiTypeSelector` e pode precisar de ajustes para acomodar ou exibir corretamente a nova opção.

**Adaptar Páginas/Controladores Principais**
15. [ ] Revisar `src/app/[owner]/[repo]/page.tsx` (função `RepoWikiPage`) para garantir que ele lide corretamente com o novo tipo `business` em todo o fluxo de geração da wiki.
16. [ ] Revisar `src/app/[owner]/[repo]/workshop/page.tsx` e `src/app/page.tsx` para quaisquer modificações necessárias relacionadas à nova funcionalidade.
17. [ ] Analisar `src/components/Ask.tsx` e `src/components/ConfigurationModal.tsx` para verificar se são impactados pela adição do novo tipo de wiki e ajustar conforme necessário.

## Internacionalização (i18n)

**Adicionar Traduções para "Business"**
18. [ ] Para cada arquivo de idioma em `src/messages/` (`en.json`, `es.json`, `ja.json`, `kr.json`, `pt-BR.json`, `vi.json`, `zh.json`):
19. [ ] Adicionar uma nova chave para o tipo de wiki "Business" (ex: `"wikiType.business": "Business"` em `en.json`, `"wikiType.business": "Negócios"` em `pt-BR.json`, etc.).
20. [ ] Usar a chave `business` (ou o identificador definido no passo 2) para consistência.
21. [ ] Garantir que o `WikiTypeSelector.tsx` (ou onde quer que os nomes dos tipos de wiki sejam exibidos) use essas chaves de tradução.

**Traduzir Outros Textos de UI (se houver)**
22. [ ] Identificar se há outros textos na interface do usuário relacionados à nova funcionalidade que precisam de tradução (ex: tooltips, descrições).
23. [ ] Adicionar as chaves e traduções correspondentes aos arquivos de mensagens.

## Testes

**Testes Unitários**
24. [ ] Escrever testes unitários para a lógica modificada no `WikiTypeSelector.tsx` para garantir que a nova opção seja renderizada e funcione corretamente.
25. [ ] Escrever testes unitários para a lógica de seleção de prompt para verificar se o prompt de negócios correto é carregado.

**Testes de Integração**
26. [ ] Criar testes de integração que cubram o fluxo de ponta a ponta: selecionar o tipo "Business", fornecer arquivos de código e verificar se uma wiki é gerada usando o prompt de negócios.
27. [ ] Testar a geração de diagramas Mermaid.js.

**Testes Qualitativos**
28. [ ] Gerar wikis de negócios para diversos exemplos de código (simples e complexos).
29. [ ] Revisar manualmente o resultado em relação aos critérios definidos no `development_plan_business_wiki.md` (clareza, linguagem não técnica, foco em negócios, ausência de detalhes técnicos, qualidade dos diagramas).
30. [ ] Idealmente, obter feedback de um público-alvo (ex: analista de negócios).

**Testes de Regressão**
31. [ ] Garantir que os tipos de wiki existentes (`comprehensive`, `concise`) continuem funcionando como esperado.

## Documentação do Projeto

**Atualizar README ou Documentação do Contribuidor (se aplicável)**
32. [ ] Se o projeto tiver documentação para desenvolvedores ou contribuidores, atualizar para incluir informações sobre o novo tipo de wiki de negócios e como ele é implementado/configurado.

**Atualizar Documentação do Usuário (se aplicável)**
33. [ ] Se houver documentação para usuários finais da ferramenta DeepWiki, adicionar uma seção explicando o novo tipo de wiki "Business", seu propósito e como usá-lo.

## Revisão e Refinamento

**Revisão de Código**
34. [ ] Realizar uma revisão de código completa de todas as alterações.

**Iteração no Prompt**
35. [ ] Com base nos resultados dos testes qualitativos, refinar o prompt de negócios conforme necessário para melhorar a qualidade da documentação gerada.

## Correções e Melhorias da Cache

36. [X] Investigar e modificar o endpoint `/api/wiki_cache` para garantir que ele respeite estritamente o parâmetro `wikiType`. Ele só deve retornar uma wiki em cache se o `wikiType` no cache corresponder ao `wikiType` na solicitação.
37. [X] (Opcional) Considerar adicionar um campo `wikiType` à interface `WikiStructure` (e aos tipos de backend correspondentes) para permitir a validação do lado do cliente dos dados da wiki em cache.

## Correções de URL do GitLab

38. [ ] Corrigir a extração do caminho do projeto para URLs do GitLab que incluem subgrupos (ex: `https://gitlab.com/group/subgroup/project`).
39. [ ] Garantir que o caminho completo do projeto GitLab seja codificado corretamente para uso em chamadas de API.
40. [ ] Remover a adição do sufixo de idioma (ex: `_pt-BR`) ao caminho do projeto nas URLs da API do GitLab.
41. [ ] Atualizar a construção da URL da API do GitLab em `src/app/[owner]/[repo]/page.tsx` para usar a estrutura de caminho correta e evitar o erro 404.

## Correções na Geração da Wiki por Tipo

42. [ ] Investigar por que a seleção do tipo de wiki "business" resulta na geração de uma wiki do tipo "comprehensive".
43. [~] Verificar se o parâmetro `wikiType` está sendo corretamente passado do frontend para o backend. (Frontend: `page.tsx` atualizado para enviar `wiki_type` nos payloads de `/api/wiki-structure` e na API de geração de conteúdo de página).
44. [ ] Backend: Modificar o endpoint `/api/wiki-structure` para utilizar o parâmetro `wiki_type` (enviado no corpo da requisição) para:
    - Selecionar o prompt apropriado para a IA (business, concise, comprehensive) ao determinar a estrutura da wiki.
    - Influenciar a profundidade e o tipo de seções/páginas sugeridas na estrutura da wiki.
45. [ ] Backend: Modificar o endpoint da API responsável pela geração de conteúdo de página (ex: `/api/generate-page-content` ou similar) para utilizar o parâmetro `wiki_type` (enviado no corpo da requisição) para:
    - Selecionar o prompt apropriado para a IA (business, concise, comprehensive) ao gerar o conteúdo Markdown de cada página.
46. [ ] Garantir que, ao gerar uma nova wiki, o tipo especificado pelo usuário seja o tipo da wiki resultante, independentemente de caches existentes para outros tipos.
