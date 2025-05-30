# DeepWiki-Open

![DeepWiki Banner](screenshots/Deepwiki.png)

**DeepWiki** é minha própria tentativa de implementação do DeepWiki, que cria automaticamente wikis bonitas e interativas para qualquer repositório GitHub, GitLab ou BitBucket! Basta inserir o nome de um repositório, e o DeepWiki irá:

1. Analisar a estrutura do código
2. Gerar documentação abrangente
3. Criar diagramas visuais para explicar como tudo funciona
4. Organizar tudo em uma wiki fácil de navegar

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/sheing)
[![Tip in Crypto](https://tip.md/badge.svg)](https://tip.md/sng-asyncfunc)
[![Twitter/X](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/sashimikun_void)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/VQMBGR8u5v)

[English](./README.md) | [简体中文](./README.zh.md) | [日本語](./README.ja.md) | [Español](./README.es.md) | [한국어](./README.kr.md) | [Tiếng Việt](./README.vi.md) | [Português do Brasil](./README.pt-BR.md)

## ✨ Funcionalidades

- **Documentação Instantânea**: Transforme qualquer repositório GitHub, GitLab ou BitBucket em uma wiki em segundos
- **Suporte a Repositórios Privados**: Acesse repositórios privados com segurança usando tokens de acesso pessoal
- **Análise Inteligente**: Compreensão da estrutura e relações do código com IA
- **Diagramas Bonitos**: Diagramas Mermaid automáticos para visualizar arquitetura e fluxo de dados
- **Navegação Fácil**: Interface simples e intuitiva para explorar a wiki
- **Recurso de Perguntas**: Converse com seu repositório usando IA com RAG para obter respostas precisas
- **Pesquisa Profunda**: Processo de pesquisa em várias etapas que investiga minuciosamente tópicos complexos
- **Múltiplos Provedores de Modelos**: Suporte para modelos Google Gemini, OpenAI, OpenRouter e Ollama local

## 🚀 Início Rápido (Super Fácil!)

### Opção 1: Usando Docker

```bash
# Clone o repositório
git clone https://github.com/AsyncFuncAI/deepwiki-open.git
cd deepwiki-open

# Crie um arquivo .env com suas chaves de API
echo "GOOGLE_API_KEY=sua_chave_api_google" > .env
echo "OPENAI_API_KEY=sua_chave_api_openai" >> .env
# Opcional: Adicione a chave de API OpenRouter se quiser usar modelos OpenRouter
echo "OPENROUTER_API_KEY=sua_chave_api_openrouter" >> .env
# Opcional: Adicione o host Ollama se não for local. O padrão é http://localhost:11434
echo "OLLAMA_HOST=seu_host_ollama" >> .env

# Execute com Docker Compose
docker-compose up
```

Para instruções detalhadas sobre como usar o DeepWiki com Ollama e Docker, veja [Instruções do Ollama](Ollama-instruction.md).

> 💡 **Onde obter essas chaves:**
> - Obtenha uma chave de API do Google em [Google AI Studio](https://makersuite.google.com/app/apikey)
> - Obtenha uma chave de API da OpenAI em [OpenAI Platform](https://platform.openai.com/api-keys)

### Opção 2: Configuração Manual (Recomendada)

#### Passo 1: Configure Suas Chaves de API

Crie um arquivo `.env` na raiz do projeto com estas chaves:

```
GOOGLE_API_KEY=sua_chave_api_google
OPENAI_API_KEY=sua_chave_api_openai
# Opcional: Adicione isso se quiser usar modelos OpenRouter
OPENROUTER_API_KEY=sua_chave_api_openrouter
# Opcional: Adicione o host Ollama se não for local. Padrão: http://localhost:11434
OLLAMA_HOST=seu_host_ollama
```

#### Passo 2: Inicie o Backend

```bash
# Instale as dependências Python
pip install -r api/requirements.txt

# Inicie o servidor API
python -m api.main
```

#### Passo 3: Inicie o Frontend

```bash
# Instale as dependências JavaScript
npm install
# ou
yarn install

# Inicie o aplicativo web
npm run dev
# ou
yarn dev
```

#### Passo 4: Use o DeepWiki!

1. Abra [http://localhost:3000](http://localhost:3000) no seu navegador
2. Insira um repositório GitHub, GitLab ou Bitbucket (como `https://github.com/openai/codex`, `https://github.com/microsoft/autogen`, `https://gitlab.com/gitlab-org/gitlab`, ou `https://bitbucket.org/redradish/atlassian_app_versions`)
3. Para repositórios privados, clique em "+ Adicionar tokens de acesso" e insira seu token de acesso pessoal do GitHub ou GitLab
4. Clique em "Gerar Wiki" e veja a mágica acontecer!

## 🔍 Como Funciona

O DeepWiki usa IA para:

1. Clonar e analisar o repositório GitHub, GitLab ou Bitbucket (incluindo repositórios privados com autenticação por token)
2. Criar embeddings do código para recuperação inteligente
3. Gerar documentação com IA contextual (usando modelos Google Gemini, OpenAI, OpenRouter ou Ollama local)
4. Criar diagramas visuais para explicar relações de código
5. Organizar tudo em uma wiki estruturada
6. Permitir perguntas e respostas inteligentes com o repositório através do recurso de Perguntas
7. Fornecer capacidades de pesquisa aprofundada com Pesquisa Profunda

```mermaid
graph TD
    A[Usuário insere repo GitHub/GitLab/Bitbucket] --> AA{Repo privado?}
    AA -->|Sim| AB[Adicionar token de acesso]
    AA -->|Não| B[Clonar Repositório]
    AB --> B
    B --> C[Analisar Estrutura do Código]
    C --> D[Criar Embeddings do Código]

    D --> M{Selecionar Provedor de Modelo}
    M -->|Google Gemini| E1[Gerar com Gemini]
    M -->|OpenAI| E2[Gerar com OpenAI]
    M -->|OpenRouter| E3[Gerar com OpenRouter]
    M -->|Ollama Local| E4[Gerar com Ollama]

    E1 --> E[Gerar Documentação]
    E2 --> E
    E3 --> E
    E4 --> E

    D --> F[Criar Diagramas Visuais]
    E --> G[Organizar como Wiki]
    F --> G
    G --> H[DeepWiki Interativo]

    classDef process stroke-width:2px;
    classDef data stroke-width:2px;
    classDef result stroke-width:2px;
    classDef decision stroke-width:2px;

    class A,D data;
    class AA,M decision;
    class B,C,E,F,G,AB,E1,E2,E3,E4 process;
    class H result;
```

## 🛠️ Estrutura do Projeto

```
deepwiki/
├── api/                  # Servidor API backend
│   ├── main.py           # Ponto de entrada da API
│   ├── api.py            # Implementação FastAPI
│   ├── rag.py            # Geração Aumentada por Recuperação
│   ├── data_pipeline.py  # Utilitários de processamento de dados
│   └── requirements.txt  # Dependências Python
│
├── src/                  # Aplicativo Next.js frontend
│   ├── app/              # Diretório do aplicativo Next.js
│   │   └── page.tsx      # Página principal do aplicativo
│   └── components/       # Componentes React
│       └── Mermaid.tsx   # Renderizador de diagramas Mermaid
│
├── public/               # Ativos estáticos
├── package.json          # Dependências JavaScript
└── .env                  # Variáveis de ambiente (crie este arquivo)
```

## 🤖 Sistema de Seleção de Modelos Baseado em Provedores

O DeepWiki agora implementa um sistema flexível de seleção de modelos baseado em provedores, suportando múltiplos provedores de LLM:

### Provedores e Modelos Suportados

- **Google**: Padrão `gemini-2.0-flash`, também suporta `gemini-1.5-flash`, `gemini-1.0-pro`, etc.
- **OpenAI**: Padrão `gpt-4o`, também suporta `o4-mini`, etc.
- **OpenRouter**: Acesso a múltiplos modelos via uma API unificada, incluindo Claude, Llama, Mistral, etc.
- **Ollama**: Suporte para modelos de código aberto executados localmente como `llama3`

### Variáveis de Ambiente

Cada provedor requer suas variáveis de ambiente de chave de API correspondentes:

```
# Chaves de API
GOOGLE_API_KEY=sua_chave_api_google        # Necessária para modelos Google Gemini
OPENAI_API_KEY=sua_chave_api_openai        # Necessária para modelos OpenAI
OPENROUTER_API_KEY=sua_chave_api_openrouter # Necessária para modelos OpenRouter

# Configuração de URL Base da API OpenAI
OPENAI_BASE_URL=https://endpoint-api-personalizado.com/v1  # Opcional, para endpoints de API OpenAI personalizados

# Host Ollama
OLLAMA_HOST=seu_host_ollama # Opcional, se Ollama não for local. padrão: http://localhost:11434

# Diretório de Configuração
DEEPWIKI_CONFIG_DIR=/caminho/para/dir/config/personalizado  # Opcional, para localização de arquivo de configuração personalizado
```

### Arquivos de Configuração

O DeepWiki usa arquivos de configuração JSON para gerenciar vários aspectos do sistema:

1. **`generator.json`**: Configuração para modelos de geração de texto
   - Define provedores de modelos disponíveis (Google, OpenAI, OpenRouter, Ollama)
   - Especifica modelos padrão e disponíveis para cada provedor
   - Contém parâmetros específicos do modelo como temperatura e top_p

2. **`embedder.json`**: Configuração para modelos de embedding e processamento de texto
   - Define modelos de embedding para armazenamento de vetores
   - Contém configuração de recuperador para RAG
   - Especifica configurações de divisor de texto para fragmentação de documentos

3. **`repo.json`**: Configuração para manipulação de repositórios
   - Contém filtros de arquivo para excluir certos arquivos e diretórios
   - Define limites de tamanho de repositório e regras de processamento

Por padrão, esses arquivos estão localizados no diretório `api/config/`. Você pode personalizar sua localização usando a variável de ambiente `DEEPWIKI_CONFIG_DIR`.

### Seleção de Modelo Personalizada para Provedores de Serviço

O recurso de seleção de modelo personalizado é especificamente projetado para provedores de serviço que precisam:

- Oferecer múltiplas escolhas de modelos de IA para usuários dentro de sua organização
- Adaptar-se rapidamente ao cenário de LLM em rápida evolução sem alterações de código
- Suportar modelos especializados ou ajustados que não estão na lista predefinida

Provedores de serviço podem implementar suas ofertas de modelo selecionando entre as opções predefinidas ou inserindo identificadores de modelo personalizados na interface do frontend.

### Configuração de URL Base para Canais Privados Empresariais

A configuração base_url do Cliente OpenAI é projetada principalmente para usuários empresariais com canais de API privados. Este recurso:

- Permite conexão a endpoints de API privados ou específicos da empresa
- Permite que organizações usem seus próprios serviços LLM auto-hospedados ou implantados personalizados
- Suporta integração com serviços de terceiros compatíveis com a API OpenAI

**Em Breve**: Em atualizações futuras, o DeepWiki suportará um modo onde os usuários precisam fornecer suas próprias chaves de API nas solicitações. Isso permitirá que clientes empresariais com canais privados usem seus arranjos de API existentes sem compartilhar credenciais com a implantação do DeepWiki.

## 🛠️ Configuração Avançada

### Variáveis de Ambiente

| Variável             | Descrição                                                    | Obrigatória | Observação                                                                                                  |
|----------------------|--------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------|
| `GOOGLE_API_KEY`     | Chave de API Google Gemini para geração de IA                | Não | Necessária apenas se você quiser usar modelos Google Gemini                                                  |
| `OPENAI_API_KEY`     | Chave de API OpenAI para embeddings                          | Sim | Nota: Isso é necessário mesmo se você não estiver usando modelos OpenAI, pois é usado para embeddings.       |
| `OPENROUTER_API_KEY` | Chave de API OpenRouter para modelos alternativos            | Não | Necessária apenas se você quiser usar modelos OpenRouter                                                     |
| `OLLAMA_HOST`        | Host Ollama (padrão: http://localhost:11434)                 | Não | Necessária apenas se você quiser usar servidor Ollama externo                                                 |
| `PORT`               | Porta para o servidor API (padrão: 8001)                     | Não | Se você hospedar API e frontend na mesma máquina, certifique-se de alterar a porta de `SERVER_BASE_URL` de acordo |
| `SERVER_BASE_URL`    | URL base para o servidor API (padrão: http://localhost:8001) | Não |

Se você não estiver usando o modo ollama, você precisa configurar uma chave de API OpenAI para embeddings. Outras chaves de API são necessárias apenas ao configurar e usar modelos dos provedores correspondentes.

### Configuração Docker

Você pode usar Docker para executar o DeepWiki:

```bash
# Puxe a imagem do GitHub Container Registry
docker pull ghcr.io/asyncfuncai/deepwiki-open:latest

# Execute o contêiner com variáveis de ambiente
docker run -p 8001:8001 -p 3000:3000 \
  -e GOOGLE_API_KEY=sua_chave_api_google \
  -e OPENAI_API_KEY=sua_chave_api_openai \
  -e OPENROUTER_API_KEY=sua_chave_api_openrouter \
  -e OLLAMA_HOST=seu_host_ollama \
  -v ~/.adalflow:/root/.adalflow \
  ghcr.io/asyncfuncai/deepwiki-open:latest
```

Este comando também monta `~/.adalflow` no seu host para `/root/.adalflow` no contêiner. Este caminho é usado para armazenar:
- Repositórios clonados (`~/.adalflow/repos/`)
- Seus embeddings e índices (`~/.adalflow/databases/`)
- Conteúdo wiki gerado em cache (`~/.adalflow/wikicache/`)

Isso garante que seus dados persistam mesmo se o contêiner for parado ou removido.

Ou use o arquivo `docker-compose.yml` fornecido:

```bash
# Edite o arquivo .env com suas chaves de API primeiro
docker-compose up
```

(O arquivo `docker-compose.yml` está pré-configurado para montar `~/.adalflow` para persistência de dados, similar ao comando `docker run` acima.)

#### Usando um arquivo .env com Docker

Você também pode montar um arquivo .env no contêiner:

```bash
# Crie um arquivo .env com suas chaves de API
echo "GOOGLE_API_KEY=sua_chave_api_google" > .env
echo "OPENAI_API_KEY=sua_chave_api_openai" >> .env
echo "OPENROUTER_API_KEY=sua_chave_api_openrouter" >> .env
echo "OLLAMA_HOST=seu_host_ollama" >> .env

# Execute o contêiner com o arquivo .env montado
docker run -p 8001:8001 -p 3000:3000 \
  -v $(pwd)/.env:/app/.env \
  -v ~/.adalflow:/root/.adalflow \
  ghcr.io/asyncfuncai/deepwiki-open:latest
```

Este comando também monta `~/.adalflow` no seu host para `/root/.adalflow` no contêiner. Este caminho é usado para armazenar:
- Repositórios clonados (`~/.adalflow/repos/`)
- Seus embeddings e índices (`~/.adalflow/databases/`)
- Conteúdo wiki gerado em cache (`~/.adalflow/wikicache/`)

Isso garante que seus dados persistam mesmo se o contêiner for parado ou removido.

#### Construindo a imagem Docker localmente

Se você quiser construir a imagem Docker localmente:

```bash
# Clone o repositório
git clone https://github.com/AsyncFuncAI/deepwiki-open.git
cd deepwiki-open

# Construa a imagem Docker
docker build -t deepwiki-open .

# Execute o contêiner
docker run -p 8001:8001 -p 3000:3000 \
  -e GOOGLE_API_KEY=sua_chave_api_google \
  -e OPENAI_API_KEY=sua_chave_api_openai \
  -e OPENROUTER_API_KEY=sua_chave_api_openrouter \
  -e OLLAMA_HOST=seu_host_ollama \
  deepwiki-open
```

### Detalhes do Servidor API

O servidor API fornece:
- Clonagem e indexação de repositórios
- RAG (Geração Aumentada por Recuperação)
- Completions de chat com streaming

Para mais detalhes, veja o [README da API](./api/README.md).

## 🔌 Integração OpenRouter

O DeepWiki agora suporta [OpenRouter](https://openrouter.ai/) como um provedor de modelo, dando acesso a centenas de modelos de IA através de uma única API:

- **Múltiplas Opções de Modelo**: Acesse modelos da OpenAI, Anthropic, Google, Meta, Mistral e mais
- **Configuração Simples**: Basta adicionar sua chave de API OpenRouter e selecionar o modelo que deseja usar
- **Eficiência de Custo**: Escolha modelos que se encaixem no seu orçamento e necessidades de desempenho
- **Troca Fácil**: Alterne entre diferentes modelos sem alterar seu código

### Como Usar o OpenRouter com DeepWiki

1. **Obtenha uma Chave de API**: Inscreva-se em [OpenRouter](https://openrouter.ai/) e obtenha sua chave de API
2. **Adicione ao Ambiente**: Adicione `OPENROUTER_API_KEY=sua_chave` ao seu arquivo `.env`
3. **Habilite na UI**: Marque a opção "Usar API OpenRouter" na página inicial
4. **Selecione o Modelo**: Escolha entre modelos populares como GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 e mais

O OpenRouter é particularmente útil se você quiser:
- Experimentar diferentes modelos sem se inscrever em múltiplos serviços
- Acessar modelos que podem estar restritos na sua região
- Comparar desempenho entre diferentes provedores de modelo
- Otimizar custo vs. desempenho com base nas suas necessidades

## 🤖 Recursos de Perguntas e Pesquisa Profunda

### Recurso de Perguntas

O recurso de Perguntas permite que você converse com seu repositório usando Geração Aumentada por Recuperação (RAG):

- **Respostas Contextuais**: Obtenha respostas precisas baseadas no código real do seu repositório
- **Alimentado por RAG**: O sistema recupera trechos de código relevantes para fornecer respostas fundamentadas
- **Streaming em Tempo Real**: Veja as respostas conforme são geradas para uma experiência mais interativa
- **Histórico de Conversação**: O sistema mantém contexto entre perguntas para interações mais coerentes

### Recurso de Pesquisa Profunda

A Pesquisa Profunda leva a análise de repositórios ao próximo nível com um processo de pesquisa em várias etapas:

- **Investigação Aprofundada**: Explora minuciosamente tópicos complexos através de múltiplas iterações de pesquisa
- **Processo Estruturado**: Segue um plano de pesquisa claro com atualizações e uma conclusão abrangente
- **Continuação Automática**: A IA continua automaticamente a pesquisa até chegar a uma conclusão (até 5 iterações)
- **Estágios de Pesquisa**:
  1. **Plano de Pesquisa**: Delineia a abordagem e descobertas iniciais
  2. **Atualizações de Pesquisa**: Constrói sobre iterações anteriores com novos insights
  3. **Conclusão Final**: Fornece uma resposta abrangente baseada em todas as iterações

Para usar a Pesquisa Profunda, simplesmente alterne o interruptor "Pesquisa Profunda" na interface de Perguntas antes de enviar sua pergunta.

## 📱 Capturas de Tela

![Interface Principal DeepWiki](screenshots/Interface.png)
*A interface principal do DeepWiki*

![Suporte a Repositórios Privados](screenshots/privaterepo.png)
*Acesse repositórios privados com tokens de acesso pessoal*

![Recurso de Pesquisa Profunda](screenshots/DeepResearch.png)
*A Pesquisa Profunda conduz investigações em várias etapas para tópicos complexos*

### Vídeo de Demonstração

[![Vídeo de Demonstração DeepWiki](https://img.youtube.com/vi/zGANs8US8B4/0.jpg)](https://youtu.be/zGANs8US8B4)

*Veja o DeepWiki em ação!*

## ❓ Solução de Problemas

### Problemas com Chave de API
- **"Variáveis de ambiente ausentes"**: Certifique-se de que seu arquivo `.env` está na raiz do projeto e contém as chaves de API necessárias
- **"Chave de API não válida"**: Verifique se você copiou a chave completa corretamente sem espaços extras
- **"Erro de API OpenRouter"**: Verifique se sua chave de API OpenRouter é válida e tem créditos suficientes

### Problemas de Conexão
- **"Não é possível conectar ao servidor API"**: Certifique-se de que o servidor API está em execução na porta 8001
- **"Erro CORS"**: A API está configurada para permitir todas as origens, mas se você estiver tendo problemas, tente executar frontend e backend na mesma máquina

### Problemas de Geração
- **"Erro ao gerar wiki"**: Para repositórios muito grandes, tente um menor primeiro
- **"Formato de repositório inválido"**: Certifique-se de que está usando um formato de URL GitHub, GitLab ou Bitbucket válido
- **"Não foi possível buscar a estrutura do repositório"**: Para repositórios privados, certifique-se de que inseriu um token de acesso pessoal válido com permissões apropriadas
- **"Erro de renderização de diagrama"**: O aplicativo tentará corrigir automaticamente diagramas quebrados

### Soluções Comuns
1. **Reinicie ambos os servidores**: Às vezes um simples reinício resolve a maioria dos problemas
2. **Verifique os logs do console**: Abra as ferramentas de desenvolvedor do navegador para ver quaisquer erros JavaScript
3. **Verifique os logs da API**: Olhe o terminal onde a API está em execução para erros Python

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Abrir issues para bugs ou solicitações de recursos
- Enviar pull requests para melhorar o código
- Compartilhar seu feedback e ideias

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ⭐ Histórico de Estrelas

[![Gráfico de Histórico de Estrelas](https://api.star-history.com/svg?repos=AsyncFuncAI/deepwiki-open&type=Date)](https://star-history.com/#AsyncFuncAI/deepwiki-open&Date)
