# Treinamento do Modelo de Classificação de Propostas

## 1. Objetivo

O treinamento tem como objetivo adaptar o modelo **Mistral 7B Instruct v0.3** para classificar textos relacionados a propostas de candidatos como:

* `true`: proposta verdadeira;
* `false`: proposta falsa ou distorcida.

O modelo é treinado utilizando **Supervised Fine-Tuning (SFT)** com **LoRA**, por meio da biblioteca **Unsloth**.

Ao final do processo, o modelo treinado é exportado para o formato **GGUF**, utilizando a quantização **Q4_K_M**, permitindo sua execução posteriormente em ferramentas como `llama.cpp` e LM Studio.

---

# 2. Visão geral do processo

O treinamento é dividido nas seguintes etapas:

```text
Instalação das dependências
          ↓
Verificação da GPU
          ↓
Leitura do dataset original
          ↓
Divisão das propostas em trechos
          ↓
Geração de propostas falsas
          ↓
Construção do dataset
          ↓
Preparação do modelo Mistral 7B
          ↓
Aplicação de LoRA
          ↓
Formatação dos prompts
          ↓
Divisão em treino e validação
          ↓
Treinamento SFT
          ↓
Exportação para GGUF
          ↓
Modelo quantizado Q4_K_M
```

---

# 3. Ambiente utilizado

O treinamento foi desenvolvido para execução em ambiente com **GPU NVIDIA**, utilizando CUDA.

As principais tecnologias utilizadas são:

| Tecnologia           | Função                                                 |
| -------------------- | ------------------------------------------------------ |
| PyTorch              | Execução do treinamento e operações de GPU             |
| Unsloth              | Otimização do fine-tuning do modelo                    |
| Transformers         | Manipulação do modelo e tokenizer                      |
| TRL                  | Implementação do treinamento SFT                       |
| PEFT                 | Aplicação do LoRA                                      |
| BitsAndBytes         | Otimizações e quantização                              |
| Datasets             | Conversão e gerenciamento dos datasets                 |
| Pandas               | Manipulação dos arquivos CSV                           |
| Scikit-learn         | Divisão entre treino e validação                       |
| Google Generative AI | Geração das propostas falsas                           |
| GGUF                 | Formato utilizado para distribuição do modelo treinado |

---

# 4. Instalação das dependências

## Bloco 1 — Preparação do ambiente

Antes de importar determinadas bibliotecas, é necessário instalar suas dependências.

O ambiente utiliza o `uv` como gerenciador de pacotes:

```python
%pip install uv
```

Em seguida são instaladas versões específicas do PyTorch compatíveis com CUDA 12.1:

```python
!uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 \
    --index-url https://download.pytorch.org/whl/cu121
```

Também é instalado o `xformers`, utilizado para otimizações relacionadas às operações de atenção:

```python
!uv pip install xformers \
    --index-url https://download.pytorch.org/whl/cu121
```

As principais bibliotecas utilizadas no fine-tuning são instaladas posteriormente:

```python
!uv pip install unsloth unsloth-zoo torchao
!uv pip install accelerate transformers trl peft bitsandbytes datasets
```

Por fim, são instaladas bibliotecas auxiliares:

```python
!uv pip install setuptools
!uv pip install pandas scikit-learn google-generativeai matplotlib ipywidgets
```

### Observação

Este bloco deve ser executado antes dos blocos que importam bibliotecas como `torch`, `unsloth`, `transformers` e `trl`.

---

# 5. Verificação do hardware

## Bloco 2 — Inicialização do ambiente

Após a instalação, são importadas as bibliotecas utilizadas no treinamento.

Uma verificação é realizada para identificar se uma GPU CUDA está disponível:

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
```

Caso exista uma GPU, seu nome também é exibido:

```python
gpu_name = torch.cuda.get_device_name(0)
```

O resultado permite confirmar se o treinamento será executado utilizando GPU.

Exemplo:

```text
Iniciando Pipeline em: cuda | Dispositivo: NVIDIA Tesla T4
```

O treinamento com GPU é importante porque modelos como o Mistral 7B possuem grande quantidade de parâmetros e apresentam tempo de treinamento significativamente maior quando executados somente em CPU.

---

# 6. Configuração da API utilizada para geração de dados

O treinamento utiliza uma API generativa para produzir exemplos falsos a partir de propostas reais.

A chave da API é obtida por meio da variável de ambiente:

```python
api_key = os.getenv("GOOGLE_API_KEY")
```

Caso a chave não esteja configurada, o processo é interrompido:

```python
if not api_key:
    raise ValueError("GOOGLE_API_KEY não encontrada no arquivo .env!")
```

Depois disso, a API é configurada e o modelo generativo é inicializado.

> A chave da API não deve ser armazenada diretamente no código-fonte ou no notebook compartilhado. Deve ser disponibilizada por variável de ambiente ou mecanismo equivalente de configuração.

---

# 7. Preparação dos dados

## 7.1 Dataset original

O treinamento parte do arquivo:

```text
com_propostas.csv
```

O arquivo é carregado utilizando:

```python
df_original = pd.read_csv(
    "./com_propostas.csv",
    sep=";",
    encoding="latin1"
)
```

O dataset contém informações dos candidatos e suas respectivas propostas.

Entre os campos utilizados estão:

* `NM_CANDIDATO`;
* `NM_URNA_CANDIDATO`;
* `PROPOSTA`.

As colunas são normalizadas para letras maiúsculas:

```python
df_original.columns = df_original.columns.str.strip().str.upper()
```

---

# 8. Divisão das propostas em trechos

Propostas muito extensas são divididas em trechos menores antes da geração dos dados falsos.

A função:

```python
chunk_texto()
```

recebe uma proposta e utiliza como limite padrão:

```text
1000 caracteres
```

A divisão tenta preservar:

1. quebras de parágrafo;
2. frases;
3. pontuação.

Isso evita enviar propostas excessivamente grandes para a API generativa e permite trabalhar com unidades menores de texto durante a preparação do dataset.

Cada trecho recebe um identificador:

```text
CHUNK_ID
```

que indica sua posição dentro da proposta original.

---

# 9. Geração de propostas falsas

## 9.1 Criação dos exemplos sintéticos

Para cada proposta real, o sistema solicita à API generativa uma versão falsa ou distorcida.

A função responsável é:

```python
gerar_proposta_falsa()
```

O prompt informa:

* o candidato;
* a proposta real;
* a necessidade de produzir uma versão falsa.

A proposta falsa deve manter aparência plausível, mas introduzir alterações como:

* exageros;
* alterações no público-alvo;
* custos inviáveis;
* regras absurdas;
* distorções da proposta original.

O objetivo é criar exemplos negativos para que o modelo aprenda a diferenciar propostas verdadeiras de versões falsas.

---

# 10. Tratamento de limites da API

A geração dos dados falsos possui tratamento para o erro HTTP `429`, que indica que o limite de utilização da API foi atingido.

Quando isso ocorre, o código aguarda progressivamente:

```text
15 segundos
30 segundos
45 segundos
...
```

até atingir o número máximo de tentativas configurado.

Isso evita que uma interrupção temporária da API encerre imediatamente todo o processo de preparação do dataset.

---

# 11. Construção do dataset

Para cada trecho da proposta são criados dois possíveis registros:

### Registro verdadeiro

```text
LABEL_CATEGORY = true
```

Contém o trecho original da proposta.

### Registro falso

```text
LABEL_CATEGORY = false
```

Contém a proposta falsa gerada pela API.

Assim, o dataset final combina exemplos positivos e negativos.

A estrutura conceitual fica:

```text
Proposta real
     │
     ├── Trecho original → true
     │
     └── Proposta falsa  → false
```

O resultado é salvo inicialmente como:

```text
propostas_com_fakes.csv
```

---

# 12. Preparação dos arquivos para treinamento

São gerados diferentes arquivos derivados do dataset.

## `dataset_apenas_falsas.csv`

Contém somente os registros classificados como:

```text
false
```

É utilizado para disponibilizar separadamente os exemplos falsos gerados.

---

## `dataset_completo_agrupado.csv`

Contém os registros completos, organizados por candidato e categoria.

Essa versão facilita a inspeção dos dados.

---

## `dataset_treino_embaralhado.csv`

É criada uma cópia embaralhada do dataset:

```python
df_final.sample(frac=1, random_state=42)
```

O `random_state=42` garante que o embaralhamento possa ser reproduzido.

Essa versão é utilizada como base para a divisão entre treinamento e validação.

---

# 13. Carregamento do modelo

## Bloco 4 — Mistral 7B

O modelo utilizado como base é o:

```text
Mistral 7B Instruct v0.3
```

O carregamento utiliza a biblioteca Unsloth:

```python
FastLanguageModel.from_pretrained()
```

O treinamento utiliza:

```text
max_seq_length = 4096
load_in_4bit = True
```

A utilização de 4 bits reduz o consumo de memória da GPU e permite trabalhar com o modelo em hardware com recursos mais limitados.

---

# 14. Fine-tuning utilizando LoRA

Após o carregamento do modelo, é aplicada uma configuração **LoRA (Low-Rank Adaptation)**.

O rank utilizado é:

```text
r = 32
```

Os módulos adaptados incluem:

```text
q_proj
k_proj
v_proj
o_proj
gate_proj
up_proj
down_proj
```

Esses módulos estão relacionados às camadas de atenção e projeções internas do modelo.

O LoRA permite adaptar o modelo sem atualizar todos os seus parâmetros originais.

Em vez de realizar um fine-tuning completo:

```text
Mistral 7B
    ↓
Atualização de todos os parâmetros
```

é utilizada uma adaptação de menor custo:

```text
Mistral 7B
    +
Camadas LoRA
    ↓
Modelo adaptado
```

Isso reduz o consumo de memória e o custo computacional do treinamento.

---

# 15. Fonte utilizada no prompt

O treinamento associa as propostas ao candidato e à fonte dos dados.

A fonte utilizada no dataset é:

```text
https://dadosabertos.tse.jus.br/dataset/candidatos-2026
```

### Atenção

O bloco que adiciona essa informação ao dataset está marcado no notebook como:

```text
NÃO RODE ISSO, IGNORE
```

Portanto, essa etapa **não deve ser considerada parte obrigatória do fluxo atual de treinamento** sem que o dataset seja preparado adequadamente.

---

# 16. Formatação dos prompts

## Bloco 5

Os registros são transformados em um formato textual que será utilizado pelo SFT.

O modelo recebe uma instrução estruturada contendo:

```text
Instrução
Candidato
Fonte
Conteúdo / Proposta
Resposta
```

Conceitualmente:

```text
### Instrução:
Classifique o texto ...

### Candidato:
...

### Fonte:
...

### Conteúdo / Proposta:
...

### Resposta:
true/false
```

O valor de `LABEL_CATEGORY` é utilizado como resposta esperada.

O `tokenizer.eos_token` é adicionado ao final de cada exemplo para indicar o término da sequência.

---

# 17. Divisão entre treinamento e validação

O dataset é dividido em:

```text
80% → treinamento
20% → validação
```

A divisão utiliza:

```python
train_test_split()
```

com estratificação pela coluna:

```text
LABEL_CATEGORY
```

A estratificação é importante para preservar a proporção entre exemplos `true` e `false` nos dois conjuntos.

O resultado é:

```text
dataset_treino
dataset_validacao
```

---

# 18. Treinamento SFT

## Bloco 6

O treinamento utiliza o `SFTTrainer`, da biblioteca TRL.

SFT significa **Supervised Fine-Tuning**, ou ajuste fino supervisionado.

O modelo recebe exemplos no formato:

```text
entrada → resposta esperada
```

e aprende a reproduzir a classificação correta.

### Principais configurações

| Parâmetro                   |       Valor |
| --------------------------- | ----------: |
| Batch por dispositivo       |           4 |
| Gradient accumulation       |           4 |
| Épocas                      |           4 |
| Learning rate               |    2 × 10⁻⁴ |
| Warmup ratio                |        0,05 |
| Weight decay                |        0,01 |
| Otimizador                  | AdamW 8-bit |
| Scheduler                   |      Linear |
| Seed                        |        3407 |
| Tamanho máximo da sequência |        4096 |

### Gradient Accumulation

A configuração:

```text
per_device_train_batch_size = 4
gradient_accumulation_steps = 4
```

permite acumular gradientes de vários lotes antes de atualizar os pesos do modelo.

Isso possibilita utilizar um batch efetivo maior sem exigir que todos os exemplos sejam carregados simultaneamente na memória da GPU.

---

# 19. Precisão numérica utilizada no treinamento

O treinamento verifica automaticamente se a GPU oferece suporte a BF16:

```python
torch.cuda.is_bf16_supported()
```

Quando suportado, utiliza:

```text
BF16
```

Caso contrário, utiliza:

```text
FP16
```

Essa estratégia permite adaptar o treinamento às capacidades do hardware disponível.

---

# 20. Execução do treinamento

O treinamento é iniciado com:

```python
trainer.train()
```

Durante o processo são registrados logs periódicos:

```text
logging_steps = 5
```

Ao final, o treinamento gera os artefatos dentro do diretório:

```text
outputs_propostas/
```

---

# 21. Exportação para GGUF

## Bloco 7

Depois do treinamento, o modelo é exportado para o formato **GGUF**.

O diretório de saída é:

```text
modelo_propostas_gguf_v3
```

A quantização utilizada é:

```text
Q4_K_M
```

A exportação é realizada por:

```python
model.save_pretrained_gguf()
```

O resultado é um modelo que pode ser utilizado posteriormente por ferramentas compatíveis com GGUF, como:

* `llama.cpp`;
* LM Studio;
* outros servidores de inferência compatíveis.

---

# 22. Resultado final

Ao finalizar todas as etapas, o fluxo produz um modelo baseado no Mistral 7B adaptado para o problema de classificação de propostas.

A estrutura geral pode ser representada como:

```text
Dataset TSE
    │
    ▼
Propostas reais
    │
    ▼
Divisão em trechos
    │
    ├───────────────┐
    ▼               ▼
Trecho real      Geração de
   true          proposta falsa
                     │
                     ▼
                   false
    │               │
    └───────┬───────┘
            ▼
     Dataset balanceado
            │
            ▼
    Treino / Validação
        80% / 20%
            │
            ▼
       Mistral 7B
            +
           LoRA
            │
            ▼
        SFTTrainer
            │
            ▼
     Modelo treinado
            │
            ▼
       Quantização
          Q4_K_M
            │
            ▼
          GGUF
```

---

# 23. Arquivo final do modelo

O principal artefato produzido pelo treinamento é o modelo GGUF localizado no diretório:

```text
modelo_propostas_gguf_v3/
```

Esse modelo pode posteriormente ser utilizado pelo serviço de inferência do projeto.

No ambiente de produção, o modelo pode ser carregado por um servidor compatível com GGUF, como `llama.cpp`, permitindo que a API do projeto envie o texto da publicação para classificação.

---

# 24. Relação com o sistema Ta Certo Brasil

O treinamento é responsável pela etapa de **adaptação do modelo**.

A aplicação em produção ocorre posteriormente:

```text
Instagram
    ↓
Extração da publicação
    ↓
OCR
    ↓
Texto extraído
    ↓
Modelo treinado
    ↓
Classificação
    ↓
Resposta da aplicação
```

Portanto, o notebook de treinamento **não faz parte diretamente da execução da API**. Ele é utilizado para gerar o modelo que posteriormente será disponibilizado pelo serviço de inferência.

---

# 25. Dependências entre os blocos

A ordem recomendada de execução é:

```text
Bloco 1
  ↓
Bloco 2
  ↓
Preparação dos dados
  ↓
Bloco 4
  ↓
Bloco 5
  ↓
Bloco 6
  ↓
Bloco 7
```

O bloco de geração de propostas falsas deve ser executado antes da preparação dos datasets utilizados no treinamento.

O bloco marcado como **"NÃO RODE ISSO, IGNORE" não faz parte da sequência obrigatória**.

---

# 26. Cuidados para reprodução do treinamento

Para reproduzir o treinamento, é necessário:

1. utilizar um ambiente com GPU compatível;
2. instalar as dependências antes dos imports;
3. disponibilizar o arquivo `com_propostas.csv`;
4. configurar a variável `GOOGLE_API_KEY`;
5. executar a geração das propostas falsas;
6. gerar o dataset de treinamento;
7. carregar o modelo base Mistral 7B;
8. executar o fine-tuning com LoRA;
9. exportar o modelo para GGUF.

Além disso, a geração das propostas falsas depende de uma API externa e pode estar sujeita a limites de utilização e disponibilidade.

---

# 27. Resumo técnico

O treinamento utiliza **Supervised Fine-Tuning (SFT)** sobre o **Mistral 7B Instruct v0.3**, com **LoRA** para reduzir o custo computacional da adaptação.

O dataset é construído a partir de propostas reais, obtidas dos dados eleitorais, e complementado por propostas falsas sinteticamente geradas. As amostras são divididas em conjuntos de treinamento e validação na proporção de 80/20.

Após quatro épocas de treinamento, o modelo é exportado em **GGUF com quantização Q4_K_M**, permitindo sua utilização em ambientes de inferência locais ou remotos compatíveis com esse formato.

O resultado final é um modelo especializado na tarefa de classificação de propostas verdadeiras e falsas, utilizado posteriormente pelo sistema **Ta Certo Brasil**.
