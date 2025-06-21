// src/components/DetalheAlerta.jsx
import React, { useState } from 'react';
import ModalProtocolo from './ModalProtocolo'; // Importe o componente do modal
import '../styles/DetalheAlerta.css';

const DetalheAlerta = ({ alerta, onDeselecionar }) => {
    // Estado para controlar a visibilidade do modal
    const [modalVisivel, setModalVisivel] = useState(false);

    if (!alerta) return null;

    const handleAbrirModalProtocolo = () => {
        setModalVisivel(true); // Sempre abre o modal ao ser clicado
    };

    const handleFecharModal = () => {
        setModalVisivel(false);
    };
    
    // Verificamos o status apenas para fins de exibição, não para desabilitar o botão
    const isAcionado = alerta.status.includes('atendimento');

    return (
        <>
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
                        <span className={`status-tag status-${alerta.status}`}>
                            {alerta.status.replace(/_/g, ' ')}
                        </span>
                    </div>
                    <div className="detalhe-info">
                        <strong>Ação Sugerida:</strong>
                        <span>{alerta.equipe_sugerida}</span>
                    </div>
                    <div className="detalhe-info">
                        <strong>Localização:</strong>
                        <span>{`Lat: ${alerta.latitude.toFixed(4)}, Lon: ${alerta.longitude.toFixed(4)}`}</span>
                    </div>

                    {/* --- ALTERAÇÃO PRINCIPAL AQUI --- */}
                    {/* O botão agora se chama "Ver Protocolo" e NUNCA é desabilitado */}
                    <button 
                        className="botao-protocolo" 
                        onClick={handleAbrirModalProtocolo}
                    >
                       {isAcionado ? 'Ver Protocolo em Andamento' : 'Iniciar Protocolo de Resposta'}
                    </button>
                </div>
            </div>

            {/* O Modal continua o mesmo, mas agora sempre pode ser aberto */}
            {modalVisivel && (
                <ModalProtocolo 
                    alerta={alerta} 
                    onClose={handleFecharModal} 
                />
            )}
        </>
    );
};

export default DetalheAlerta;