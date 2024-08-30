import './PaginaPadrao.scss'
import Header from '../../Widgets/Header/Header'
import SideBar from '../../Widgets/SideBar/SideBar'
import { Outlet } from 'react-router-dom'


const PaginaPadrao = () => {
    return (
        <div className='mainpage'>
            <SideBar/>

                <div className='content'>
                    <Outlet/>
                </div>
        </div>
    )
}

export default PaginaPadrao;