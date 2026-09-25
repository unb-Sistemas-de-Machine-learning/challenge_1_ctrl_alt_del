# Fine-Tuning de LLM para Verificação de Propostas Políticas.

Esta branch contém o pipeline completo para geração de dados sintéticos, preparação do dataset, fine-tuning com LoRA/QLoRA do modelo **Mistral-7B-Instruct-v0.3-bnb-4bits** e exportação do modelo treinado para o formato GGUF para rodar no LM-studio ou unsloth. 

O objetivo do modelo é classificar propostas atribuídas a candidatos das eleições brasileiras como **verdadeiras (`true`)** ou **falsas/distorcidas (`false`)**.

---
## Ferramentas
| Categoria | Tecnologias / Bibliotecas |
| :--- | :--- |
| **Ambiente** | Python 3.10, `uv` |
| **Geração Sintética de Notícias Falsas** | Ollama (`qwen2.5:7b`) |
| **Treinamento** | Unsloth, PyTorch, TRL (`SFTTrainer`), Hugging Face `transformers`, `peft` |
| **Quantização** | BitsAndBytes (4-bit QLoRA), GGUF (`q4_k_m`) |
| **Processamento de Dados** | Pandas, Scikit-Learn, Datasets |

---

## Arquitetura/Sequência
```text
[com_propostas.csv] ──> Chunking (1000 chars) ──> Ollama (Qwen 2.5:7b)
                                                        │
┌───────────────────────────────────────────────────────┘
▼
[propostas_com_fakes.csv] com chunks ──> Prompt Formatting
                                      │
┌─────────────────────────────────────┘
▼
Divisão Train/Val (80/20) ──> Unsloth SFTTrainer na RTX local(Mistral-7B 4-bit)
                                      │
┌─────────────────────────────────────┘
▼
Checkpoints / Loss Monitor ──> Exportação GGUF (Q4_K_M)