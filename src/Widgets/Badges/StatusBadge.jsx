import React from 'react';
import './StatusBadge.scss';

const StatusBadge = ({ status, tipo, size }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'NAO_CONCLUIDO':
        return 'status-nao-concluido';
      case 'CONCLUIDO':
        return 'status-concluido';
      default:
        return '';
    }
  };

  if(tipo === 'obra') {
    return (
      <span className={`status-badge ${getStatusClass()} ${size}`}>
        {status === 'NAO_CONCLUIDO' ? 'Não concluída' : 'Concluída'}
      </span>
    );
  }

  if(tipo === 'item') {
    return (
      <span className={`status-badge ${getStatusClass()} ${size}`}>
        {status === 'NAO_CONCLUIDO' ? 'Não conluído' : 'Concluído'}
      </span>
    );
  }

 
};

export default StatusBadge;
