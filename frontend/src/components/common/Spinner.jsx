// src/components/common/Spinner.jsx
import React from 'react';
import './Spinner.css';

// Adicione a prop 'small'
const Spinner = ({ small }) => {
    // Adiciona a classe 'small' se a prop for verdadeira
    const spinnerClass = `spinner ${small ? 'small' : ''}`;
    return <div className={spinnerClass}></div>;
};

export default Spinner;