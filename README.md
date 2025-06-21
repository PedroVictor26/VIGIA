# 🛡️ VigIA - Plataforma Preditiva para Segurança Urbana

**Transformando dados em ação para cidades mais seguras e inteligentes.**

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellowgreen)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)
![Frontend](https://img.shields.io/badge/frontend-React-blue?logo=react)
![Backend](https://img.shields.io/badge/backend-FastAPI-green?logo=fastapi)

---

## 🎯 Sobre o Projeto

**VigIA** é uma plataforma de inteligência artificial preditiva projetada para modernizar a segurança pública e a gestão urbana. O projeto nasceu para solucionar um problema crônico nas cidades brasileiras: a fragmentação da comunicação entre as instituições (Polícia, SAMU, Defesa Civil, Prefeituras) e a reação lenta a desordens urbanas.

Nossa solução centraliza a comunicação, automatiza a triagem de ocorrências com IA e fornece aos gestores uma visão unificada e em tempo real do cenário urbano, permitindo uma alocação de recursos mais inteligente e ações preventivas baseadas em dados.

---

## 🧩 Alinhamento com a Segurança Pública e Gestão Urbana

O VigIA foi criado especificamente para enfrentar os desafios críticos da segurança nas cidades brasileiras:

- **Falta de comunicação integrada** entre instituições como Polícia, SAMU, Defesa Civil e Prefeituras.
- **Atuação reativa** das autoridades, apenas após o agravamento dos problemas.
- **Dificuldade de priorizar ações** em meio a denúncias diversas e falta de dados unificados.

Ao centralizar denúncias, aplicar inteligência preditiva e fornecer **dados em tempo real**, o VigIA atua como uma **central digital de segurança urbana**, antecipando crises e aumentando a eficiência da resposta pública.

---

## ✨ Funcionalidades Principais

* **📱 Portal do Cidadão Intuitivo:** Uma interface de chat, inspirada no WhatsApp, que guia o cidadão a reportar ocorrências de forma rápida e anônima, incluindo a possibilidade de anexar fotos e compartilhar a geolocalização.
* **🧠 Triagem com Inteligência Artificial (Simulada):** O backend recebe a denúncia e uma IA (atualmente simulada com regras de negócio) classifica a ocorrência, define um nível de risco (`crítico`, `alto`, `médio`, `baixo`) e sugere a equipe de resposta mais adequada.
* **🗺️ Painel de Comando Integrado:** Um dashboard completo para gestores, com:
  * Mapa em Tempo Real
  * Resumo Analítico
  * Lista Dinâmica de Alertas
  * Filtros Inteligentes por categoria e prioridade
* **♨️ Análise com Mapa de Calor (Heatmap):** Revela "hotspots" e padrões urbanos para planejamento preventivo.
* **🔗 Protocolo de Resposta Simulado:** Despacho automatizado e registro em blockchain (simulado) para garantir rastreabilidade e auditoria.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React (com Vite)**
- **React Leaflet** (mapas)
- **Recharts** (gráficos)
- **CSS Puro com Variáveis**

### **Backend**
- **Python 3**
- **FastAPI**
- **Pydantic**
- **Uvicorn**

---

## 📬 Endpoints da API

| Método | Rota                     | Descrição                                      |
|--------|--------------------------|-----------------------------------------------|
| POST   | `/cidadao/denuncia`      | Cria um novo alerta enviado por um cidadão    |
| GET    | `/painel/alertas`        | Retorna todos os alertas registrados          |
| GET    | `/painel/alertas/{id}`   | Retorna um alerta específico                  |
| GET    | `/`                      | Status da API                                 |

---

## 👥 Usuários-Alvo da Plataforma

- **Cidadãos** que desejam contribuir com segurança e ordem urbana de forma rápida e anônima.
- **Gestores públicos e agentes municipais** responsáveis por obras, fiscalização, segurança e mobilidade.
- **Forças de segurança e emergência** (Polícia, SAMU, Defesa Civil) que recebem alertas com prioridade e localização.
- **Prefeituras e governos estaduais** interessados em dados geográficos e temporais para planejamento de políticas públicas.

---

## 🧪 Exemplos de Casos de Uso

- Um morador do DF detecta fios soltos caídos após a chuva. Ele envia uma denúncia anônima via VigIA. O sistema classifica como **risco crítico**, sugere o acionamento da Defesa Civil e registra o evento com localização exata.
- Durante a madrugada, uma pessoa ouve um barulho de vidro quebrado. Ela relata pelo VigIA como "possível tentativa de invasão". A IA preditiva classifica como **urgência alta**, e a PM é notificada em tempo real.
- Uma zeladora nota um poste de luz apagado em frente a uma escola. A denúncia é enviada e classificada como **baixo risco**, mas o sistema registra e prioriza conforme o número de alertas semelhantes no local.

---

## 🎥 Demonstração

➡️ [Protótipo Navegável](http://localhost:5173)  
➡️ [Documentação da API](http://localhost:8000/docs)

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**

- Node.js (16+)
- Python (3.8+)
- `pip`

### **Instalação e Execução**

```bash
# Clone o repositório
$ git clone https://[URL_DO_SEU_REPOSITORIO]/VigIA.git
$ cd VigIA

# Backend
$ cd backend
$ python -m venv venv
$ source venv/bin/activate  # Windows: venv\Scripts\activate
$ pip install -r requirements.txt
$ uvicorn main:app --reload --port 8000

# Frontend (em outro terminal)
$ cd frontend
$ npm install
$ npm run dev
```

Acesse o frontend em `http://localhost:5173` e a API em `http://localhost:8000/docs`.

---

## 🔮 Futuras Implementações

1. **Integração com WhatsApp Oficial**
2. **IA baseada em dados reais e Machine Learning**
3. **Dashboard com relatórios exportáveis e análises temporais**
4. **Visão computacional com câmeras públicas (UrbVisio AI)**

---

## 🤝 Contribuições

1. Faça um Fork
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m 'Minha contribuição'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

---

## 📄 Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.
