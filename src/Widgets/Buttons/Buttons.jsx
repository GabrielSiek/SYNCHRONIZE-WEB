import './Buttons.scss'
import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ButtonDefault = ({children, modo, onClick, type})  => {
    return (
        <button onClick={onClick} className={`button-default ${modo}`} type={type}>
            {children}
        </button>
    )
}

const ButtonForm = ({children, modo, onClick, type})  => {
    return (
        <button onClick={onClick} className={`button-form ${modo}`} type={type}>
            {children}
        </button>
    )
}

function ButtonSideBar({ icone, texto, link }) {
    const location = useLocation();
    const selectedRef = useRef(null);

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

export {ButtonDefault, ButtonForm, ButtonSideBar};