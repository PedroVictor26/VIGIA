// src/components/AlertaMarker.jsx
import React from 'react';
import { Marker, useMap } from 'react-leaflet'; // Importe useMap
import L from 'leaflet';
import './AlertaMarker.css';
// Popup será controlado pelo painel lateral, então o removemos daqui

// Ícone customizado que usa CSS para cor e animação
const createDivIcon = (prioridade) => {
    return L.divIcon({
        className: `custom-marker prioridade-${prioridade}`,
        html: `<div class="marker-pin"></div>`
    });
};

const AlertaMarker = ({ alerta, onSelecionar }) => {
    const map = useMap(); // Hook para pegar a instância do mapa

    const handleClick = () => {
        onSelecionar(alerta);
        map.flyTo([alerta.latitude, alerta.longitude], 15); // Centraliza e dá zoom
    };

    return (
        <Marker
            position={[alerta.latitude, alerta.longitude]}
            icon={createDivIcon(alerta.prioridade)}
            eventHandlers={{ click: handleClick }}
        />
    );
};

export default AlertaMarker;