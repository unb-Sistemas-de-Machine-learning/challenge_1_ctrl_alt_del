O Modelo utilizado para a realização do Fine-Tunning é **mistral-7b-instruct-v0.3.Q4_K_**

Disponível já com o Fine-Tunning: [Ta-certo-milistral](https://huggingface.co/dnfs26/ta-certo-milistral-gguf)

# Escolha do modelo de Machine Learning

Para a etapa de inferência do projeto, foi utilizado o modelo Mistral 7B Instruct v0.3, na versão quantizada Q4_K_M.

A escolha desse modelo foi realizada considerando as características e as restrições do projeto, principalmente a necessidade de executar a inferência sem depender de APIs comerciais de modelos de linguagem.

## Capacidade de compreensão de texto

O sistema precisa analisar textos provenientes de publicações de redes sociais e identificar se o conteúdo apresenta uma proposta de governo. Para isso, o modelo precisa ser capaz de compreender instruções em linguagem natural e analisar o contexto fornecido.

O Mistral 7B Instruct é uma versão voltada para tarefas orientadas por instruções, sendo adequada para receber um prompt contendo as regras de classificação e retornar uma resposta estruturada.

No projeto, o modelo recebe o conteúdo obtido da publicação, incluindo o texto extraído da imagem e informações textuais do post, e realiza a classificação em três categorias:

- real;
- fake;
- Não trata-se de uma proposta de governo.

## Modelo de código aberto e execução local

Outro fator importante foi a possibilidade de executar o modelo utilizando os próprios recursos computacionais disponíveis, sem a necessidade de contratar uma API de terceiros para cada inferência.

Isso é importante para o projeto porque permite:

reduzir custos de utilização;
evitar dependência de serviços comerciais de IA;
manter o controle sobre o modelo utilizado;
executar o modelo em ambientes próprios ou de desenvolvimento.

O formato GGUF também facilita a utilização do modelo com ferramentas baseadas em llama.cpp e servidores compatíveis com sua API.

## Quantização Q4_K_M

Foi utilizada a versão Q4_K_M, que corresponde a uma versão quantizada do modelo.

A quantização reduz a quantidade de memória necessária para armazenar e executar o modelo, tornando possível utilizar um modelo de aproximadamente 7 bilhões de parâmetros em hardware com recursos mais limitados do que seriam necessários para uma versão em maior precisão.

Essa característica foi importante para o projeto porque permite utilizar o modelo tanto em ambientes locais quanto em uma máquina com GPU disponibilizada para a execução da inferência.

## Relação entre tamanho e desempenho

Foi escolhido um modelo de aproximadamente 7 bilhões de parâmetros como um equilíbrio entre capacidade de compreensão e custo computacional.

Modelos significativamente maiores poderiam apresentar maior custo de execução e exigir mais memória e capacidade computacional, dificultando sua utilização no ambiente disponível para o projeto.

Por outro lado, um modelo muito menor poderia apresentar limitações na compreensão do contexto e no seguimento das regras definidas para a classificação.

Assim, o Mistral 7B foi utilizado como uma alternativa intermediária entre capacidade de processamento de linguagem natural e viabilidade computacional.

# Utilização no Ta Certo Brasil

O modelo não é responsável pela coleta das publicações nem pela extração do texto das imagens. Essas tarefas são realizadas pelas demais camadas da aplicação.

O fluxo de utilização do modelo é:

Publicação
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
verdict + responseText

A entrada fornecida ao modelo reúne as informações textuais disponíveis da publicação. A partir dessas informações e das regras definidas no prompt, o modelo produz uma resposta estruturada em JSON.

O formato esperado é:

{
  "verdict": "real",
  "responseText": "Explicação breve da classificação."
}

Dessa forma, o modelo funciona como a camada de inferência, enquanto a coleta, o OCR, a API e a interface são responsabilidades das demais partes da arquitetura.

# Execução do modelo

Durante o desenvolvimento e a implantação, o modelo pode ser executado por meio de um servidor compatível com o formato GGUF. No ambiente utilizado para a implantação, o llama-server disponibiliza uma API HTTP compatível com o padrão de chat, permitindo que o backend FastAPI envie o conteúdo para análise e receba a classificação.

Essa separação também permite manter o modelo como um serviço independente do backend:

Frontend
   ↓
FastAPI
   ↓
Serviço de inferência
   ↓
Mistral 7B

Essa arquitetura facilita a substituição ou atualização do modelo sem exigir alterações significativas na interface ou nas demais funcionalidades da aplicação.

## Treinamento Supervisionado

Foi feito Fine-Tunning utilizando **dados de 2026 disponibilizados pelo Tribunal Superior Eleitoral (TSE)**.

Esses dados foram utilizados como base para o processo de **treinamento supervisionado**, permitindo que o modelo identifique padrões e relações presentes nas informações eleitorais.

> Os dados utilizados foram previamente analisados e preparados para garantir sua adequação ao Fine-Tunning do modelo.