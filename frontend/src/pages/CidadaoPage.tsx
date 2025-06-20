// src/pages/CidadaoPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { createAlerta } from '../api/apiService';
import Header from '../components/Header';
import Spinner from '../components/common/Spinner';
import '../styles/CidadaoPage.css';

const BotIcon = () => <i className="material-icons">support_agent</i>;
const UserIcon = () => <i className="material-icons">person</i>;
const CameraIcon = () => <i className="material-icons">photo_camera</i>;

type Message = { from: string; text: string };

const CidadaoPage = ({ onNavigate }) => {
    const [step, setStep] = useState(1);
    const [messages, setMessages] = useState<Message[]>([]);
    const [formData, setFormData] = useState({ tipo: '', descricao: '', media_url: '' });
    type Coordenadas = { latitude: number; longitude: number } | null;
    const [coordenadas, setCoordenadas] = useState<Coordenadas>(null);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        setMessages([{
            from: 'bot',
            text: '🛡️ Bem-vindo ao SIGMA – Assistente de Ocorrências. Para começarmos, selecione o tipo de ocorrência.'
        }]);
    }, []);

    const tiposOcorrencia = [
        'Segurança (Assalto, Vandalismo)',
        'Infraestrutura (Buraco, Esgoto)',
        'Iluminação (Poste Queimado)',
        'Acidente (Batida, Cruzamento)',
        'Risco (Fio Solto, Desabamento)'
    ];

    const handleTipoSelecionado = (tipo) => {
        setFormData({ ...formData, tipo });
        setMessages(prev => [...prev, { from: 'user', text: tipo }]);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                from: 'bot',
                text: '📄 Descreva agora os fatos. Inclua data, local, envolvidos, o que aconteceu e consequências.'
            }]);
            setStep(2);
        }, 500);
    };

    const handleDescricao = async (e) => {
        e.preventDefault();
        if (!formData.descricao) return;

        setMessages(prev => [...prev, { from: 'user', text: formData.descricao }]);
        setStep(3);

        setMessages(prev => [...prev, {
            from: 'bot',
            text: '📍 Vamos captar sua localização. Clique no botão abaixo para autorizar.'
        }]);
    };

    const capturarLocalizacao = () => {
        setMessages(prev => [...prev, { from: 'bot', text: '🛰️ Captando sua localização...' }]);
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setCoordenadas({ latitude: coords.latitude, longitude: coords.longitude });
                setMessages(prev => [...prev, { from: 'bot', text: '✅ Localização capturada. Se desejar, anexe uma imagem e envie sua denúncia.' }]);
                setStep(4);
            },
            () => {
                setMessages(prev => [...prev, { from: 'bot', text: '❌ Não foi possível obter sua localização.' }]);
            }
        );
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFormData({ ...formData, media_url: url });
            setMessages(prev => [...prev, { from: 'user', text: '📷 Imagem anexada com sucesso.' }]);
        }
    };

    const enviarAlerta = async () => {
        if (!formData.tipo || !formData.descricao || !coordenadas) return;
        setLoading(true);
        setMessages(prev => [...prev, { from: 'bot', text: '📡 Enviando sua denúncia para o SIGMA...' }]);

        try {
            await createAlerta({
                ...formData,
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude
            });
            setMessages(prev => [...prev, { from: 'bot', text: '✅ Comunicação registrada. A equipe responsável foi acionada. Obrigado por colaborar com a segurança urbana.' }]);
            setStep(5);
        } catch (err) {
            setMessages(prev => [...prev, { from: 'bot', text: '❌ Erro ao enviar. Tente novamente mais tarde.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cidadao-container">
            <Header onNavigate={onNavigate} />
            <main className="cidadao-main">
                <div className="chatbox">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`msg-row ${msg.from}`}>
                            <div className="msg-bubble">
                                {msg.from === 'bot' ? <BotIcon /> : <UserIcon />}
                                <span>{msg.text}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {step === 1 && (
                    <div className="quick-replies">
                        {tiposOcorrencia.map(tipo => (
                            <button key={tipo} onClick={() => handleTipoSelecionado(tipo)}>{tipo}</button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <form className="chat-input" onSubmit={handleDescricao}>
                        <textarea
                            placeholder="Digite o relato aqui..."
                            value={formData.descricao}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            rows={3}
                        />
                        <div className="input-actions">
                            <button
                                type="button"
                                className="icon-button"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <CameraIcon />
                            </button>
                            <button type="submit" disabled={!formData.descricao}>Enviar</button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </form>
                )}

                {step === 3 && (
                    <button className="chat-button" onClick={capturarLocalizacao}>📍 Capturar Localização</button>
                )}

                {step === 4 && (
                    <div className="chat-final">
                        <button className="chat-button" onClick={enviarAlerta} disabled={loading}>
                            {loading ? <Spinner small /> : '📨 Enviar Denúncia ao SIGMA'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CidadaoPage;
