// src/components/ListaAlertas.jsx
import React from 'react';
import '../styles/ListaAlertas.css';


// Função para formatar o tempo (ex: "há 5 minutos")
const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " anos atrás";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses atrás";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dias atrás";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas atrás";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos atrás";
    return "agora mesmo";
};

const ListaAlertas = ({ alertas, onSelecionar }) => { // Recebe onSelecionar
    return (
        <div className="lista-alertas-container">
            <h3 className="painel-titulo">Alertas Recentes</h3>
            <ul className="lista-alertas">
                {alertas.length === 0 && <li className="item-alerta-vazio">Nenhum alerta encontrado.</li>}
                {alertas.map(alerta => (
                    // Adiciona o evento onClick
                    <li key={alerta.id} className={`item-alerta prioridade-borda-${alerta.prioridade}`} onClick={() => onSelecionar(alerta)}>
                        <div className="item-conteudo">
                            <strong className="item-titulo">{alerta.tipo.replace(/_/g, ' ')}</strong>
                            <p className="item-descricao">{alerta.descricao}</p>
                        </div>
                        <span className="item-tempo">{formatTimeAgo(alerta.timestamp)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaAlertas;