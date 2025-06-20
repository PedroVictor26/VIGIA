// src/components/DashboardResumo.jsx
import React from 'react';
import '../styles/DashboardResumo.css';

const DashboardResumo = ({ alertas }) => {
    const total = alertas.length;

    const contagemPorPrioridade = alertas.reduce((acc, a) => {
        const prioridade = a.prioridade || 'indefinida';
        acc[prioridade] = (acc[prioridade] || 0) + 1;
        return acc;
    }, { crítico: 0, alto: 0, médio: 0, baixo: 0 });

    const prioridades = [
        { nome: 'crítico', cor: 'var(--cor-critico)', valor: contagemPorPrioridade.crítico },
        { nome: 'alto', cor: 'var(--cor-alto)', valor: contagemPorPrioridade.alto },
        { nome: 'médio', cor: 'var(--cor-medio)', valor: contagemPorPrioridade.médio },
        { nome: 'baixo', cor: 'var(--cor-baixo)', valor: contagemPorPrioridade.baixo },
    ];

    return (
        <div className="dashboard-resumo">
            <h3 className="painel-titulo">Resumo de Alertas</h3>

            <div className="stat-card">
                <span>Total de Alertas Ativos</span>
                <div className="stat-valor">{total}</div>
            </div>

            <div className="lista-prioridades">
                {prioridades.map(p => (
                    <div key={p.nome} className="item-prioridade">
                        <div className="legenda">
                            <span className="cor-indicador" style={{ backgroundColor: p.cor }}></span>
                            <span className="nome-prioridade">{p.nome.charAt(0).toUpperCase() + p.nome.slice(1)}</span>
                        </div>
                        <strong className="valor-prioridade">{p.valor}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardResumo;