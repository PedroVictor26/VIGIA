// src/hooks/useAlertas.js

import { useState, useEffect, useCallback } from 'react';
import { getAlertas } from '../api/apiService';

export const useAlertas = () => {
    const [alertas, setAlertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAlertas = useCallback(async () => {
        try {
            // Não precisa mais de setLoading(true) aqui, pois já está no estado inicial
            const data = await getAlertas();
            console.log("DADOS RECEBIDOS DO BACKEND:", data); // <-- LOG IMPORTANTE PARA DEBUG
            setAlertas(data);
            setError(null); // Limpa erros anteriores se a requisição for bem-sucedida
        } catch (err) {
            setError("Não foi possível carregar os alertas.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAlertas();
        const intervalId = setInterval(fetchAlertas, 10000); // Atualiza a cada 10 segundos
        return () => clearInterval(intervalId);
    }, [fetchAlertas]);

    return { alertas, loading, error, refetch: fetchAlertas };
};