# CANVAS — DA PERGUNTA CERTA AO OBJETIVO CERTO

## 1. Guiding Questions

Este tópico trata das questões elaboradas para guiar o processo de desenvolvimento do projeto, as guiding questions foram divididas nos temas dados, usuário, modelo, ética e produção. Suas devidas respostas técnicas são respondidas em [Resoluções Das Guiding Questions](resolucoesguidingquestions.md).

### Dados

* Qual será o formato de dado recebido do usuário?
* De qual modo as notícias das nossas fontes divergem das encontradas no instagram?
* De quais fontes vamos obter nossos dados base, como fazer a validação se a fonte é confiavel?

### Usuário

* Como será o fluxo de uso da nossa aplicação?
* Como vamos receber feedbacks do usuário?

### Modelo

* Quais métricas vamos apresentar para explicar o pensamento da IA?
* Como vamos evitar que o modelo seja enviesado?
* Como vamos hospedar o modelo?

### Ética

* Como vamos diferenciar nóticias políticas de informações da vida pessoal do político?

### Produção

* Qual modelo vamos utilizar como base?

## 2. Objetivos do Negócio

Este tópico contextualiza o problema central da desinformação eleitoral nas redes sociais e define os objetivos estratégicos do projeto, estabelecendo metas claras para reduzir o impacto de propostas distorcidas e mensurar a conscientização do eleitor no mundo real.
### Problema:

Pessoas leem publicações e prints no Instagram sobre propostas de governo de candidatos e não verificam se elas não são informações exageradas, distorcidas ou falsas, podendo formar opiniões equivocadas sem checar ou saber sobre fontes oficiais como o TSE (Tribunal Superior Eleitoral).

### Objetivo de Negócio:

Reduzir votos a partir de informações falsas ou equivocas e o compartilhamento de tais informações sobre proprostas de governo - medível no MUNDO (ex.: % de usuários que, após consultar o sistema, relatam o compreender melhor as propostas de governo dos candidatos).

## 3. Objetivos de ML

Classificar imagens e textos do Instagram ("Candidato X proprõe/defenderá a medida Y") em verdadeiro ou falso. EX: Com as informaçẽos disponibilizadas pelo TSE / Informação distorcida ou fora de contexto / Falsa.

## 4. Arquitetura
A arquitetura do sistema será organizada em 3 camadas, seguindo o modelo clássico (Apresentação, Lógica de Negócio e Dados), porém com uma adaptação: a terceira camada (antes responsável apenas pela persistência de dados) será reformulada para incorporar o ciclo de vida de Machine Learning, atuando como uma Camada de inferência no modelo de  Machine Learning.


## 5. Ferramentas

Algumas ferramentas que foram pensadas para a produção do projeto: React (Frontend), Docker (Deixar código em contâiners), Scrapy (Coleta das informações do instagram) e FastAPI (Backend)
