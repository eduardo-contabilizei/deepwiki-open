**Plano de Desenvolvimento: Adição do Tipo de Wiki "Negócios" ao DeepWiki**

**1. Introdução**
Este documento descreve o plano para introduzir um novo tipo de geração de wiki, denominado "Negócios" (ou "Business" em inglês), ao projeto DeepWiki. Este novo tipo visa produzir documentação derivada do código-fonte, com foco na lógica de negócios, regras, fluxos de trabalho e restrições, apresentada em uma linguagem acessível a stakeholders não técnicos. Evitará explicitamente jargões técnicos, trechos de código, linguagens de programação e detalhes sobre ambientes de desenvolvimento.

**2. Objetivos**
*   Permitir a geração de documentação orientada a negócios a partir do código.
*   Garantir que o resultado seja compreensível por usuários sem formação técnica.
*   Integrar o novo tipo "Negócios" de forma transparente com os tipos existentes `comprehensive` e `concise`.

**3. Características Principais da Wiki "Negócios"**
*   **Foco do Conteúdo:**
    *   Processos de negócios e fluxos de trabalho de alto nível.
    *   Regras de negócios chave e lógica embutida no código, detalhando explicitamente situações como:
        *   Valores críticos (ex: limites máximos e mínimos para transações, quantidades, estoques).
        *   Cálculos e fórmulas de negócios essenciais (ex: métodos de precificação, taxas de juros, comissões, impostos).
        *   Datas e prazos cruciais que disparam eventos ou afetam processos (ex: datas de corte para faturamento, prazos de validade de ofertas, datas de início/fim de promoções).
        *   Condições e gatilhos que governam os fluxos de trabalho, incluindo aquelas que podem interromper, desviar ou permitir a continuação de um processo (ex: aprovações necessárias, validações de elegibilidade, critérios para escalonamento).
    *   Entidades de dados e seus relacionamentos sob uma perspectiva de negócios.
    *   Restrições e lógica de validação relevantes para as operações de negócios.
*   **Linguagem e Estilo:**
    *   Linguagem simples, clara e direta.
    *   Evitar termos técnicos, acrônimos (a menos que comumente entendidos no contexto de negócios) e vocabulário específico de programação.
    *   Foco no "o quê" o sistema faz e "porquê" do ponto de vista de negócios, não em "como" é implementado tecnicamente.
*   **Exclusões:**
    *   Sem trechos de código-fonte.
    *   Sem menção a linguagens de programação específicas, frameworks ou bibliotecas.
    *   Sem discussão sobre esquemas de banco de dados, endpoints de API ou detalhes de infraestrutura.
    *   Sem comentários centrados no desenvolvedor ou detalhes de implementação.

*   **Representação Visual (quando aplicável):**
    *   Utilizar diagramas gerados com a sintaxe Mermaid.js para ilustrar fluxos de processo, interações entre entidades de negócios ou lógicas de decisão complexas, sempre que isso agregar clareza à documentação.
    *   Os diagramas devem ser simples, focados nos aspectos de negócios e consistentes com a linguagem não técnica do restante da documentação.
    *   O prompt para o LLM deverá ser instruído a gerar a sintaxe Mermaid.js apropriada para esses diagramas.

**4. Passos de Implementação Propostos**

    **4.1. Engenharia de Prompt para Wiki "Negócios"**
    *   **Tarefa:** Desenvolver e refinar um novo prompt de sistema para o Modelo de Linguagem (LLM).
    *   **Detalhes:** Este prompt guiará o LLM para analisar o código e gerar texto que adira às características da wiki "Negócios". Precisa ser cuidadosamente elaborado para obter o resultado desejado.
    *   **Exemplo de Trecho para Prompt (Conceitual):**
        ```markdown
        Você é um analista de negócios experiente e um comunicador estratégico.
        Sua tarefa é gerar uma página de wiki de negócios em formato Markdown, clara, concisa e focada nos aspectos de negócio de uma funcionalidade, sistema ou módulo específico dentro de um projeto de software. A documentação deve ser compreensível por um público não técnico (ex: gerentes de produto, stakeholders de negócios, analistas de marketing).

        Você receberá:
        1. O "[WIKI_PAGE_TOPIC]" para a página que você precisa criar (este será o foco de negócios).
        2. Uma lista de "[RELEVANT_SOURCE_FILES]" do projeto. Você DEVE usar estes arquivos como base para inferir a lógica de negócios, os processos e as regras. Embora a análise seja baseada nestes arquivos, a sua saída NÃO DEVE conter nenhum jargão técnico, código ou detalhes de implementação.

        INSTRUÇÃO CRÍTICA DE INÍCIO:
        A primeira coisa na página DEVE ser um bloco \`<details>\` listando TODOS os \`[RELEVANT_SOURCE_FILES]\` que foram analisados para extrair a lógica de negócios.
        Formate-o exatamente assim:
        <details>
        <summary>Arquivos de código-fonte analisados para esta documentação de negócios</summary>

        Os seguintes arquivos de código-fonte foram analisados como base para a geração desta página de wiki de negócios:

        ${filePaths.map(path => `- ${path}`).join('\n')}
        <!-- Se necessário, arquivos adicionais podem ter sido consultados para uma compreensão completa da funcionalidade de negócios. -->
        </details>

        Imediatamente após o bloco \`<details>\`, o título principal da página deve ser um cabeçalho H1 Markdown: \`# ${page.title}\`. Este título deve refletir o tópico de negócios.

        Baseando-se na ANÁLISE e INTERPRETAÇÃO da lógica de negócios contida nos \`[RELEVANT_SOURCE_FILES]\`:

        1.  **Introdução (Visão de Negócios):** (1-2 parágrafos)
            *   Comece com uma introdução concisa explicando o PROPÓSITO DE NEGÓCIOS central e os OBJETIVOS de "${page.title}".
            *   Descreva o VALOR que esta funcionalidade/módulo entrega para o negócio ou para os usuários finais.
            *   Contextualize "${page.title}" dentro dos processos de negócios mais amplos da organização, se inferível.

        2.  **Seções Detalhadas (Foco no Negócio):** Divida "${page.title}" em seções lógicas usando cabeçalhos H2 (\`##\`) e H3 (\`###\`) Markdown. Para cada seção:
            *   **Fluxos de Processo de Negócios:** Descreva os principais fluxos de trabalho e etapas do ponto de vista do usuário de negócios ou do processo em si. Explique como as informações fluem e quais são as principais atividades realizadas.
            *   **Regras de Negócios Chave:** Identifique e explique claramente as regras de negócios fundamentais implementadas. Detalhe explicitamente:
                *   **Valores Críticos:** Limites (ex: valores máximos/mínimos para transações, quantidades, durações).
                *   **Cálculos de Negócios:** Fórmulas ou lógicas de cálculo importantes (ex: precificação, descontos, comissões, pontuações), explicando o "porquê" do cálculo em termos de negócio.
                *   **Datas e Prazos:** Eventos temporais significativos, datas de corte, validades que afetam o processo.
                *   **Condições e Gatilhos:** Critérios que determinam o fluxo de um processo (ex: o que permite continuar, o que causa uma parada, o que leva a um desvio, critérios de aprovação/rejeição).
            *   **Entidades de Negócios e Dados Relevantes:** Descreva os principais conceitos ou "coisas" que o sistema gerencia (ex: "Cliente", "Produto", "Pedido", "Campanha de Marketing"), focando em seu significado e papel no processo de negócios, não em sua estrutura técnica de dados.
            *   **Impactos e Interdependências (se aplicável e inferível):** Descreva brevemente como esta funcionalidade interage com outras áreas/processos de negócio ou quais são seus principais pontos de contato.

        3.  **Linguagem e Estilo:**
            *   Use linguagem CLARA, SIMPLES e DIRETA, acessível a um público não técnico.
            *   FOQUE no "O QUÊ" o sistema faz do ponto de vista de negócios e "PORQUÊ" ele faz (o valor gerado), não em "COMO" ele é implementado tecnicamente.
            *   EVITE ABSOLUTAMENTE:
                *   Qualquer trecho de código-fonte.
                *   Nomes de funções, classes, variáveis, tabelas de banco de dados, endpoints de API.
                *   Jargões de programação, termos de arquitetura de software, nomes de frameworks ou bibliotecas.
                *   Detalhes sobre ambientes de desenvolvimento, servidores, bancos de dados.
            *   Exemplo de transformação:
                *   *Técnico (Evitar):* "A função \`calculateOrderTotal\` itera pelos \`orderItems\`, aplica o \`taxRate\` de \`config.json\` e atualiza o campo \`totalAmount\` na tabela \`Orders\`."
                *   *Negócios (Preferir):* "O sistema calcula o valor total do pedido somando os preços de todos os itens e aplicando as taxas de imposto vigentes. Este total é então registrado para fins de faturamento e acompanhamento."

        4.  **Diagramas de Negócios com Mermaid.js:**
            *   Utilize EXTENSIVAMENTE diagramas Mermaid.js para representar visualmente os fluxos de processo de negócios, lógicas de decisão, e interaçõesrollers entre entidades ou papéis de negócios.
            *   Tipos de diagramas preferenciais:
                *   \`flowchart TD\`: Para fluxos de processo passo a passo e árvores de decisão simples.
                *   \`graph TD\`: Para mostrar relações simples entre conceitos de negócio.
                *   \`sequenceDiagram\`: Pode ser usado com cautela para ilustrar interações de alto nível entre *papéis de negócio* (ex: Cliente, Atendente) ou *sistemas principais* (tratados como caixas pretas), focando na troca de informações de negócio, não em chamadas técnicas.
            *   EVITE diagramas excessivamente técnicos como \`classDiagram\` ou \`erDiagram\` detalhados.
            *   Os diagramas DEVEM usar terminologia de negócios e ser consistentes com o estilo não técnico do restante da documentação.
            *   Incorpore os diagramas diretamente no Markdown usando blocos de código, por exemplo:
                \`\`\`mermaid
                flowchart TD
                    A[Cliente inicia pedido] --> B{Verificar estoque?};
                    B -- Sim --> C[Reservar itens];
                    B -- Não --> D[Informar indisponibilidade];
                    C --> E[Calcular total];
                \`\`\`
            *   Garanta que os diagramas sejam precisos em relação à lógica de negócios inferida dos \`[RELEVANT_SOURCE_FILES]\` e que agreguem valor à compreensão.

        Lembre-se, o objetivo é criar uma documentação que um stakeholder de negócios possa ler e entender completamente sem precisar de um desenvolvedor para traduzir.
        ```
    *   **Localização:** Este prompt provavelmente será armazenado junto com outros prompts, potencialmente em um arquivo de configuração ou em um módulo/diretório dedicado a prompts.

    **4.2. Modificações na Base de Código**
    *   **Identificar Lógica Central:** Localizar o código existente responsável por:
        *   Definir os tipos de wiki disponíveis (ex: enums, constantes, arrays de configuração).
        *   Lidar com a seleção do tipo de wiki pelo usuário.
        *   Selecionar e aplicar o prompt LLM apropriado com base no tipo escolhido.
        *   Processar a entrada de código e invocar o LLM.
    *   **Adicionar Novo Tipo de Wiki:**
        *   Introduzir "negocios" (ou "business") como uma nova opção nas estruturas de dados relevantes.
        *   Atualizar a lógica condicional para reconhecer e lidar com o tipo "negocios".
        *   Garantir que o novo prompt para o tipo "negocios" seja carregado e usado corretamente.
    *   **Arquivos Potenciais para Modificação (Exemplos - arquivos reais precisam de inspeção da base de código):**
        *   `src/services/wikiService.ts` (ou similar para lógica central)
        *   `src/config/wikiTypes.ts` (ou similar para definições de tipo)
        *   `src/prompts/index.ts` ou `src/prompts/businessPrompt.ts`
        *   Manipuladores de endpoint de API relacionados à geração de wiki.

    **4.3. Atualizações de Configuração**
    *   Se os tipos de wiki estiverem listados em arquivos de configuração externos (ex: JSON, YAML), adicione o tipo "negocios" lá.

    **4.4. Localização**
    *   **Tarefa:** Adicionar traduções para o nome do novo tipo de wiki e qualquer texto de interface do usuário associado.
    *   **Detalhes:** O termo "Negócios" (ou seu equivalente em inglês, "Business") precisa ser adicionado a todos os arquivos de idioma suportados.
    *   **Arquivos:** `src/messages/*.json` (ex: `en.json`, `pt.json`, `ja.json`).
        *   Exemplo para `en.json`: `"wikiType.business": "Business"`
        *   Exemplo para `pt.json`: `"wikiType.business": "Negócios"`
        *   Exemplo para `ja.json`: `"wikiType.business": "ビジネス"` (ou uma tradução mais apropriada)

    **4.5. Testes**
    *   **Testes Unitários:** Adicionar testes unitários para a nova lógica que lida com o tipo "negocios".
    *   **Testes de Integração:** Testar o fluxo de ponta a ponta para gerar uma wiki "negocios".
    *   **Testes Qualitativos:**
        *   Gerar wikis "negocios" para diversas amostras de código (funções simples, módulos complexos, diferentes linguagens de programação se a ferramenta as suportar amplamente).
        *   Revisar o resultado em relação às características definidas: clareza, linguagem não técnica, foco em aspectos de negócios, ausência de código/detalhes técnicos.
        *   Envolver usuários-alvo (ex: analistas de negócios, product owners, se possível) para feedback.
    *   **Testes de Regressão:** Garantir que os tipos de wiki `comprehensive` e `concise` continuem funcionando corretamente.

**5. Documentação**
*   Atualizar qualquer documentação interna ou voltada para o usuário para incluir o novo tipo de wiki "Negócios", seu propósito e como usá-lo.

**6. Cronograma Estimado (Alto Nível)**
*   **Fase 1 (Investigação e Engenharia de Prompt):** X dias
*   **Fase 2 (Implementação de Código e Configuração):** Y dias
*   **Fase 3 (Localização e Testes):** Z dias
*   **Fase 4 (Documentação e Preparação para Lançamento):** W dias
    *(Nota: Os dias reais dependem da familiaridade do desenvolvedor com a base de código e da complexidade.)*

**7. Próximos Passos**
1.  **Exploração da Base de Código:** Examinar minuciosamente a base de código `deepwiki-open` para identificar arquivos e módulos específicos para modificação.
2.  **Refinar Prompt "Negócios":** Iterar no design do prompt com testes iniciais.
3.  **Criar uma Feature Branch:** Iniciar o desenvolvimento em uma nova branch (ex: `feature/business-wiki`).
