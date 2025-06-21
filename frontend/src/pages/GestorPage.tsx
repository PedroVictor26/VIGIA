// src/pages/GestorPage.jsx

import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAlertas } from '../hooks/useAlertas';

// Importação dos componentes da UI
import Header from '../components/Header';
import Spinner from '../components/common/Spinner';
import DashboardResumo from '../components/DashboardResumo';
import FiltrosAlertas from '../components/FiltrosAlertas';
import ListaAlertas from '../components/ListaAlertas';
import DetalheAlerta from '../components/DetalheAlerta';
import AlertaMarker from '../components/AlertaMarker';
import HeatmapLayer from '../components/HeatmapLayer';

import '../styles/GestorPage.css';

const GestorPage = ({ onNavigate }) => {
    // Hooks de estado principais
    const { alertas, loading, error } = useAlertas();
    const [filtro, setFiltro] = useState({ tipo: 'Todos', prioridade: 'Todas' });
    const [alertaSelecionado, setAlertaSelecionado] = useState(null);
    const [mostrarHeatmap, setMostrarHeatmap] = useState(false);

    // Referência para a instância do mapa para controle programático (flyTo)
    const mapRef = useRef(null);

    // Posição inicial do mapa agora é Brasília
    const position = [-15.7942, -47.8825];

    // Efeito para centralizar o mapa quando um alerta é selecionado
    useEffect(() => {
        if (alertaSelecionado && mapRef.current) {
            const map = mapRef.current;
            map.flyTo([alertaSelecionado.latitude, alertaSelecionado.longitude], 16, {
                animate: true,
                duration: 1,
            });
        }
    }, [alertaSelecionado]);


    // Processa os dados brutos do backend para o formato que o frontend espera
    const processedAlertas = (alertas || []).map(backendAlert => {
        if (!backendAlert.report || !backendAlert.prediction) {
            console.warn('Alerta com estrutura inválida foi ignorado:', backendAlert);
            return null;
        }
        return {
            id: backendAlert.id,
            latitude: backendAlert.report.latitude,
            longitude: backendAlert.report.longitude,
            descricao: backendAlert.report.description,
            prioridade: backendAlert.prediction.risk_level,
            tipo: backendAlert.prediction.category,
            equipe_sugerida: backendAlert.prediction.suggested_action,
            timestamp: backendAlert.timestamp,
            status: backendAlert.status,
        };
    }).filter(Boolean);

    // Aplica os filtros selecionados pelo usuário
    const alertasFiltrados = processedAlertas.filter(alerta => {
        const filtroTipoOk = filtro.tipo === 'Todos' || alerta.tipo === filtro.tipo;
        const filtroPrioridadeOk = filtro.prioridade === 'Todas' || alerta.prioridade === filtro.prioridade;
        return filtroTipoOk && filtroPrioridadeOk;
    });

    // Função para deselecionar o alerta e mostrar os filtros novamente
    const handleDeselecionar = () => {
        setAlertaSelecionado(null);
    };

    return (
        <div className="page-container gestor-page">
            <Header onNavigate={onNavigate} />
            <div className="gestor-layout">
                <aside className="painel-lateral">
                    <DashboardResumo alertas={processedAlertas} />

                    {alertaSelecionado ? (
                        <DetalheAlerta alerta={alertaSelecionado} onDeselecionar={handleDeselecionar} />
                    ) : (
                        <>
                            <FiltrosAlertas
                                onFiltroChange={setFiltro}
                                onToggleHeatmap={setMostrarHeatmap}
                            />
                            <ListaAlertas
                                alertas={alertasFiltrados}
                                onSelecionar={setAlertaSelecionado}
                            />
                        </>
                    )}
                </aside>

                <main className="mapa-container">
                    {loading && alertas.length === 0 && <div className="loading-overlay"><Spinner /></div>}
                    {error && !loading && <div className="error-overlay">{error}</div>}

                    <MapContainer
                        center={position}
                        zoom={12}
                        scrollWheelZoom={true}
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {mostrarHeatmap ? (
                            <HeatmapLayer alertas={alertasFiltrados} />
                        ) : (
                            alertasFiltrados.map(alerta => (
                                <AlertaMarker
                                    key={alerta.id}
                                    alerta={alerta}
                                    onSelecionar={setAlertaSelecionado}
                                />
                            ))
                        )}
                    </MapContainer>
                </main>
            </div>
        </div>
    );
};

export default GestorPage;