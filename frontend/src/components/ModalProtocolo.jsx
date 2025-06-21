// src/components/ModalProtocolo.jsx
import React from 'react';
import '../styles/ModalProtocolo.css';

const ModalProtocolo = ({ alerta, onClose }) => {
    if (!alerta) return null;

    const isAcionado = alerta.status.includes('atendimento');

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {/* O título do modal agora é dinâmico */}
                    <h3>{isAcionado ? 'Status do Protocolo' : 'Protocolo de Resposta Iniciado'}</h3>
                    <button className="modal-close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {/* A descrição também é dinâmica */}
                    <p className="modal-subtitulo">
                        {isAcionado ? 'Acompanhamento do plano de ação para o alerta de' : 'Plano de ação para o alerta de'}
                        <strong> {alerta.tipo.replace(/_/g, ' ')}</strong>:
                    </p>

                    <ul className="protocolo-passos">
                        <li className="passo-item concluido">
                            <i className="material-icons">check_circle</i>
                            <span><strong>Despacho Imediato:</strong> Equipe <strong>{alerta.equipe_sugerida}</strong> foi acionada.</span>
                        </li>
                        {/* Mostra um passo diferente dependendo do status */}
                        {isAcionado ? (
                            <li className="passo-item concluido">
                                <i className="material-icons">check_circle</i>
                                <span><strong>Status Atual:</strong> Protocolo em andamento.</span>
                            </li>
                        ) : (
                            <li className="passo-item pendente">
                                <i className="material-icons">pending</i>
                                <span><strong>Monitoramento:</strong> Aguardando confirmação da equipe.</span>
                            </li>
                        )}
                        <li className="passo-item">
                            <i className="material-icons">task</i>
                            <span>Aguardando relatório final da ocorrência.</span>
                        </li>
                    </ul>
                    <button className="modal-confirm-button" onClick={onClose}>
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProtocolo;