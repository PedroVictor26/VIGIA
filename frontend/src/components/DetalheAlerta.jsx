// src/components/DetalheAlerta.jsx
import React from 'react';
import '../styles/DetalheAlerta.css';

const DetalheAlerta = ({ alerta, onDeselecionar }) => {
    if (!alerta) return null;

    return (
        <div className="detalhe-alerta-container">
            <div className="detalhe-header">
                <h3 className="painel-titulo">Detalhes do Alerta</h3>
                <button className="botao-fechar" onClick={onDeselecionar}>×</button>
            </div>
            <div className="detalhe-body">
                <div className={`detalhe-tag prioridade-tag-${alerta.prioridade}`}>
                    {alerta.prioridade.toUpperCase()}
                </div>
                <h4>{alerta.tipo.replace(/_/g, ' ')}</h4>
                <p className="detalhe-descricao">{alerta.descricao}</p>

                <div className="detalhe-info">
                    <strong>Status:</strong>
                    <span>{alerta.status}</span>
                </div>
                <div className="detalhe-info">
                    <strong>Ação Sugerida:</strong>
                    <span>{alerta.equipe_sugerida}</span>
                </div>
                <div className="detalhe-info">
                    <strong>Localização:</strong>
                    <span>{`Lat: ${alerta.latitude.toFixed(4)}, Lon: ${alerta.longitude.toFixed(4)}`}</span>
                </div>

                <button className="botao-protocolo">Iniciar Protocolo de Resposta</button>
            </div>
        </div>
    );
};

export default DetalheAlerta;