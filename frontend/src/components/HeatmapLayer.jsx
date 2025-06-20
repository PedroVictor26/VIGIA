// src/components/HeatmapLayer.jsx

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat';
import L from 'leaflet';

// --- AJUSTE 1: Aumentar a Intensidade de cada ponto ---
// Multiplicamos os valores para dar mais "peso" a cada alerta.
const prioridadeParaIntensidade = {
    'crítico': 5.0,  // Era 1.0
    'alto': 3.0,     // Era 0.7
    'médio': 1.5,    // Era 0.4
    'baixo': 0.5,    // Era 0.2
};

const HeatmapLayer = ({ alertas }) => {
    const map = useMap();

    useEffect(() => {
        if (!alertas || alertas.length === 0) {
            return;
        }

        const points = alertas.map(alerta => {
            if (alerta.latitude && alerta.longitude) {
                return [
                    alerta.latitude,
                    alerta.longitude,
                    prioridadeParaIntensidade[alerta.prioridade] || 0.1
                ];
            }
            return null;
        }).filter(Boolean);

        if (points.length === 0) return;

        // --- AJUSTE 2: Melhorar as Configurações de Visualização ---
        const heatLayer = L.heatLayer(points, {
            radius: 35,       // Aumenta o raio de influência de cada ponto
            blur: 25,         // Aumenta o desfoque para mesclar melhor os pontos
            maxZoom: 18,
            minOpacity: 0.5,  // Garante que mesmo os pontos mais fracos sejam visíveis
            max: 5.0,         // Define o valor máximo esperado (corresponde ao 'crítico')
            gradient: {       // Gradiente mais vibrante
                0.4: '#0052cc', // Azul para pontos de baixa intensidade
                0.6: '#1f9737', // Verde
                0.8: '#ffc400', // Amarelo
                1.0: '#de350b'  // Vermelho para a intensidade máxima
            }
        });

        heatLayer.addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };

    }, [alertas, map]);

    return null;
};

export default HeatmapLayer;