import React, { useRef, useEffect } from 'react';
import './ButtonSideBar.scss';
import { Link, useLocation } from 'react-router-dom';

function ButtonSideBar({ icone, texto, link }) {
    const location = useLocation();
    const selectedRef = useRef(null);

    useEffect(() => {
        // Função para calcular a distância do elemento selecionado em relação ao topo da página
        const calcularDistancia = () => {
            if (selectedRef.current) {
                const distancia = selectedRef.current.getBoundingClientRect().top;
            }
        };

        // Chama a função ao renderizar o componente e sempre que a localização mudar
        calcularDistancia();
        window.addEventListener('resize', calcularDistancia);
        return () => window.removeEventListener('resize', calcularDistancia);
    }, [location]);

    return (
        <Link
            to={link}
            className={`sidebar-bt ${location.pathname === link ? 'selected' : ''}`}
            ref={location.pathname === link ? selectedRef : null}
        >
            <div className='sidebar-bt-icone'>{icone}</div> <p className='sidebar-bt-text'>{texto}</p>
        </Link>
    );
}

export default ButtonSideBar;
