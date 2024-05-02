import './Header.scss'
import { FaSearch, FaPlus, FaUser } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { ButtonDefault } from '../Buttons/Buttons.jsx';

const Header = () => {

    return (
        <header className='header'>

            <div className='header-search-bar'>
                <FaSearch  className='header-search-icon'/>
                <input name='search-bar' className='header-search-input' placeholder='Digite o que deseja buscar'></input>
            </div>

            <div className='header-right-buttons'>
                <ButtonDefault><FaPlus/>Adicionar</ButtonDefault>

                <div className='header-container-notification'>
                    <MdNotificationsNone/>
                </div>

                <div className='header-container-user'>
                    <FaUser />
                </div>
            </div>
        </header>
    )
}

export default Header;