// src/api/apiService.js

const API_BASE_URL = 'http://localhost:8000'; // Porta padrão do FastAPI

/**
 * Busca todos os alertas do backend.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de alertas.
 */
export async function getAlertas() {
    try {
        const response = await fetch(`${API_BASE_URL}/painel/alertas`);
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Falha ao buscar alertas:", error);
        // Lança o erro para que o componente que chamou possa tratá-lo.
        throw error;
    }
}

/**
 * Cria um novo alerta.
 * @param {object} reportData - Os dados do relatório do cidadão.
 * @returns {Promise<object>} Uma promessa que resolve para o novo alerta criado.
 */
export async function createAlerta(reportData) {
    try {
        const response = await fetch(`${API_BASE_URL}/cidadao/denuncia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData),
        });
        if (!response.ok) {
            throw new Error(`Erro ao criar alerta: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Falha ao criar alerta:", error);
        throw error;
    }
}