import './SideBar.scss'

import { FaHome, FaTools, FaRegCalendarAlt, FaAngleRight, FaBell, FaUser } from "react-icons/fa";
import { LuConstruction } from "react-icons/lu";
import { FaHelmetSafety } from "react-icons/fa6";
import { useRef, useState } from 'react';
import { ButtonSideBar } from '../Buttons/Buttons.jsx'
import { useLocation } from 'react-router-dom';

const SideBar = () => {

    const [isActive, setIsActive] = useState(false);
    const lineButtonSelected = document.getElementById('sidebar-selected-button-line')

    function changePosYLine() {

        const buttonSelectedPosY = document.getElementById(useLocation).offsetTop;
        //lineButtonSelected.style.top = buttonSelectedPosY;
    }

    const changeIsActive = () => {
        setIsActive(!isActive);
    }

    function logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('empresa_id', '')
    }

    return(
        <section className={`sidebar ${isActive ? 'active' : ''}`}>
            <div className='sidebar-top'>
                <div className='sidebar-futura-logo'></div>
                <button className={`sidebar-changesize-bt ${isActive ? 'active' : ''}`} onClick={changeIsActive}><FaAngleRight className='sidebar-arrow-icon' /></button>
            </div>
            <div className='sidebar-linha'/>

            <ul className='sidebar-navlist'>
                <li className='sidebar-item'>
                    <ButtonSideBar className='/dashboard'
                        link="/dashboard"
                        texto = "Dashboard"
                        icone = {<FaHome/>}
                    />
                </li>
                <li className='sidebar-item'>
                    <ButtonSideBar className='/itens'
                    
                        link="/itens"
                        texto = "Itens"
                        icone = {<FaTools />}
                    />
                </li>
                <li className='sidebar-item'>
                    <ButtonSideBar className='obras'
                        link="/obras"
                        texto = "Obras"
                        icone = {<LuConstruction />}
                    />
                </li>
                <li className='sidebar-item'>
                    <ButtonSideBar
                        link="/funcionarios"
                        texto = "Funcionarios"
                        icone = {<FaHelmetSafety />}
                    />
                </li>
                <li className='sidebar-item'>
                    <ButtonSideBar
                        link="/calendario"
                        texto = "Calendario"
                        icone = {<FaRegCalendarAlt />}
                    />
                </li>
                <li className='sidebar-item'>
                    <ButtonSideBar
                        link="/notificacoes"
                        texto = "Notificações"
                        icone = {<FaBell />}
                    />
                </li>
                <li className='sidebar-item'>
                    <ButtonSideBar
                        link="/usuario"
                        texto = "Usuário"
                        icone = {<FaUser />}
                    />
                </li>
            </ul>

            <button onClick={logout}>Logout</button>
        </section>
    )
}

export default SideBar;