A arquitetura que foi aderida para a criação do projeto, consiste no pensamento de **Arquitetura em 3 camadas**, mas no uso desse projeto é utilizado **Arquitetura em 3 camadas adaptada**.

A arquitetura do sistema é baseada no modelo de três camadas, adaptado às necessidades da aplicação. A camada de apresentação é responsável pela interação com o usuário, enquanto a camada de aplicação concentra a lógica de negócio e a orquestração dos serviços de coleta, processamento e análise. Em vez de uma camada de dados convencional, o sistema utiliza uma camada especializada de inferência, responsável pela execução do modelo de Machine Learning e pela classificação das publicações analisadas.


## Adaptação da Arquitetura em 3 Camadas
<div class="centralizar-div">
```
┌──────────────────────────────────────────────┐
│          CAMADA DE APRESENTAÇÃO              
│                                              
│              Next.js / React                 
│                                              
│  • Interface do usuário                      
│  • Entrada da URL                            
│  • Exibição da publicação                    
│  • Exibição do resultado                     
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTP / REST
                       ▼
┌──────────────────────────────────────────────┐
│            CAMADA DE APLICAÇÃO               
│                                              
│                FastAPI                       
│                                              
│  • Endpoints da API                          
│  • Orquestração do fluxo                     
│  • Coleta da publicação                      
│  • Extração de texto (OCR)                   
│  • Preparação dos dados                      
│  • Comunicação com o modelo                  
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTP / API
                       ▼
┌──────────────────────────────────────────────┐
│          CAMADA DE INFERÊNCIA                
│                                              
│        Modelo de Machine Learning            
│                                              
│  • Recebimento do texto processado           
│  • Execução da inferência                    
│  • Classificação da publicação               
│  • Geração da resposta estruturada           
└──────────────────────────────────────────────┘
```
</div>


## Arquitetura de pastas

```
📁 challenge_1_ctrl_alt_del
├── .github
│   └── workflows
│       └── deploy.yml
├── backend
│   ├── app
│   │   ├── api.py
│   │   │   └── endpoits.py
│   │   ├── modelo
│   │   │   └── modelo_service.py
│   │   ├── schemas
│   │   │   └── post_schemas.py
│   │   ├── services
|   |   |   ├── analysis_service.py
|   |   |   ├── bluesky_bot.py
|   |   |   ├── insta_controller.py
|   |   |   ├── ocr_service.py
|   |   |   └── post_preview.py
│   │   └── main.py
│   └──── data
│         └── instagram
├── ta_certo_brasil
│   ├── src
│   │   └── app
│   │       ├── scrapyBaseG1.md
│   │       ├── ScrapyMetropoles.md
│   │       ├── scrapyBaseG1.md
│   │       ├── ScrapyMetropoles.md
│   │       ├── scrapyBaseG1.md
│   │       └── ScrapyMetropoles.md
```