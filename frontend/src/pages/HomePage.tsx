import React from 'react';
import Button from '../components/common/Button';
import logo from '../assets/logo.png';
import '../styles/HomePage.css';

const HomePage = ({ onNavigate }) => {
    return (
        <div className="home-container">
            <div className="home-logo-block">
                <h1 className="home-title">Bem-vindo ao</h1>
                <img src={logo} alt="Logo VigIA" className="home-logo" />
            </div>
            <p className="home-subtitle">Inteligência colaborativa para cidades mais seguras.</p>
            <div className="button-group">
                <Button onClick={() => onNavigate('cidadao')}>Reportar Ocorrência</Button>
                <Button onClick={() => onNavigate('gestor')} variant="secondary">Painel do Gestor</Button>
            </div>
        </div>

    );
};

export default HomePage;