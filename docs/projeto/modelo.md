# Modelo de Machine Learning

## Modelo utilizado

O modelo utilizado no projeto é o **Mistral 7B Instruct v0.3**, na versão quantizada **Q4_K_M**.

O modelo já possui o Fine-Tuning realizado para o projeto e está disponível no Hugging Face:

**[Ta-Certo Mistral GGUF](https://huggingface.co/dnfs26/ta-certo-milistral-gguf)**

## Escolha do modelo

A escolha do Mistral 7B foi feita considerando as necessidades do projeto e os recursos computacionais disponíveis.

O modelo possui capacidade de compreender textos e seguir instruções, sendo adequado para analisar o conteúdo de publicações e classificá-las de acordo com as regras definidas para o projeto.

A classificação utilizada possui três categorias:

* **Real**
* **Fake**
* **Não trata-se de uma proposta de governo**

Além disso, o modelo consegue gerar uma explicação para a classificação realizada.

## Execução local

Um dos requisitos do projeto era evitar a dependência de APIs comerciais de inteligência artificial.

Por isso, foi utilizado um modelo que pode ser executado localmente. Essa escolha permite:

* reduzir custos;
* não depender de serviços externos para realizar as análises;
* ter maior controle sobre o modelo;
* executar o modelo em diferentes ambientes.

O modelo está no formato **GGUF**, que permite sua execução utilizando ferramentas compatíveis, como o `llama.cpp`.

## Quantização

Foi utilizada a versão **Q4_K_M** do modelo.

A quantização reduz o consumo de memória necessário para executar o modelo, tornando sua utilização mais viável em computadores com recursos limitados.

Essa característica foi importante para permitir a execução do modelo tanto durante o desenvolvimento quanto no ambiente de implantação.

## Fine-Tuning

O modelo base Mistral 7B Instruct v0.3 passou por um processo de **Fine-Tuning** utilizando dados eleitorais de **2026 disponibilizados pelo Tribunal Superior Eleitoral (TSE)**.

Esses dados foram preparados e utilizados no **treinamento supervisionado**, permitindo adaptar o modelo ao contexto do projeto.

O objetivo do treinamento foi fazer com que o modelo tivesse maior capacidade de identificar e classificar conteúdos relacionados a propostas de governo.

> Os dados utilizados foram previamente analisados e preparados para serem utilizados no processo de Fine-Tuning.

## Utilização no Ta Certo Brasil

O modelo é responsável apenas pela etapa de **inferência e classificação**. A coleta da publicação e a extração do texto são realizadas por outras partes da aplicação.

O fluxo de análise é:

```text
Publicação do Instagram
        ↓
Coleta do conteúdo
        ↓
OCR
        ↓
Texto extraído
        ↓
Modelo Mistral 7B
        ↓
Classificação
        ↓
Resultado
```

O modelo recebe as informações textuais obtidas da publicação e, seguindo as regras definidas no prompt, retorna a classificação e uma explicação.

O resultado esperado possui o seguinte formato:

```json
{
  "verdict": "real",
  "responseText": "Explicação breve da classificação."
}
```

## Execução do modelo

Durante a implantação, o modelo é executado como um **serviço independente** utilizando o `llama-server`.

O servidor disponibiliza uma API HTTP que permite ao backend FastAPI enviar os dados da publicação para o modelo e receber o resultado da análise.

A arquitetura utilizada é:

```text
Frontend
   ↓
FastAPI
   ↓
Serviço de Inferência
   ↓
Mistral 7B
```

Essa separação permite que o modelo seja atualizado ou substituído sem precisar alterar significativamente o frontend ou as demais funcionalidades do sistema.
