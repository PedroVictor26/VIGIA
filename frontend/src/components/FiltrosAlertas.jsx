// src/components/FiltrosAlertas.jsx
import React from 'react';
import '../styles/FiltrosAlertas.css';

// Adicione onToggleHeatmap como uma propriedade (prop) que o componente recebe
const FiltrosAlertas = ({ onFiltroChange, onToggleHeatmap }) => {

    const handleTipoChange = (e) => {
        onFiltroChange(prevFiltro => ({ ...prevFiltro, tipo: e.target.value }));
    };

    const handlePrioridadeChange = (e) => {
        onFiltroChange(prevFiltro => ({ ...prevFiltro, prioridade: e.target.value }));
    };

    // Função separada para o toggle do heatmap
    const handleHeatmapToggle = (e) => {
        // Verifica se a função onToggleHeatmap foi passada antes de chamá-la
        if (onToggleHeatmap) {
            onToggleHeatmap(e.target.checked);
        }
    };

    return (
        <div className="filtros-alertas">
            <h3 className="painel-titulo">Filtros</h3>
            <div className="filtro-grupo">
                <label htmlFor="filtro-tipo">Por Categoria</label>
                <div className="select-wrapper">
                    <select id="filtro-tipo" onChange={handleTipoChange}>
                        <option value="Todos">Todas as Categorias</option>
                        <option value="violencia">Violência</option>
                        <option value="acidente_transito">Acidente de Trânsito</option>
                        <option value="saude">Saúde</option>
                        <option value="desordem_urbana">Desordem Urbana</option>
                    </select>
                </div>
            </div>
            <div className="filtro-grupo">
                <label htmlFor="filtro-prioridade">Por Prioridade</label>
                <div className="select-wrapper">
                    <select id="filtro-prioridade" onChange={handlePrioridadeChange}>
                        <option value="Todas">Todas as Prioridades</option>
                        <option value="crítico">Crítico</option>
                        <option value="alto">Alto</option>
                        <option value="médio">Médio</option>
                        <option value="baixo">Baixo</option>
                    </select>
                </div>
            </div>
            <div className="toggle-heatmap">
                <label htmlFor="heatmap-toggle">Exibir Mapa de Calor</label>
                {/* Agora o onChange chama a função correta */}
                <input type="checkbox" id="heatmap-toggle" className="switch" onChange={handleHeatmapToggle} />
            </div>
        </div>
    );
};

export default FiltrosAlertas;