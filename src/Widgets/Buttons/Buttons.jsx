import './Buttons.scss'
import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";

const ButtonDefault = ({children, modo, onClick, type, isDisabled = false, isSecondary = false})  => {
    return (
        <button onClick={onClick} className={`button-default ${modo} ${isDisabled ? 'disabled' : ''} ${isSecondary ? 'secondary' : ''}`} type={type} disabled={isDisabled}>
            {children}
        </button>
    )
}

const ButtonReturn = ({navigate}) => {
    return (
        <button onClick={navigate}  className='button-return'><IoChevronBack/></button>
    )
}

const ButtonForm = ({children, modo, onClick, type, isDisabled = false})  => {
    return (
        <button onClick={onClick} className={`button-form ${modo} ${isDisabled ? 'disabled' : ''}`} type={type} disabled={isDisabled}>
            {children}
        </button>
    )
}

const ButtonSideBar = ({ icone, texto, link }) => {
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

export {ButtonDefault, ButtonForm, ButtonSideBar, ButtonReturn};