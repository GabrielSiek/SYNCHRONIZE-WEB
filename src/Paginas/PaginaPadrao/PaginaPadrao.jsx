import './PaginaPadrao.scss'
import Header from '../../Widgets/Header/Header'
import SideBar from '../../Widgets/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

const PaginaPadrao = () => {
    
    return (
        <main className='mainpage'>
            <section className='mainpage-sidebar'>
                    <SideBar></SideBar>
                </section>

                <section className='mainpage-content-section'>
                    <Header></Header>

                    <Outlet/>
                </section>
        </main>
    )
}

export default PaginaPadrao;