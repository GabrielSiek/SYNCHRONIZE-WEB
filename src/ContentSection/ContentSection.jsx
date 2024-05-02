import './ContentSection.scss'
import Header from '../Widgets/Header/Header'
import DashBoard from '../Paginas/Dashboard/Dashboard'
import Itens from '../Paginas/Itens/Itens'
import SideBar from '../Widgets/SideBar/SideBar'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

 const ContentSection = () => {
    
    return (
        <section className='content-section'>
            <section>
                <SideBar></SideBar>
            </section>
            <Header></Header>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashBoard/>}/>
                    <Route path="/itens" element={<Itens/>}/>
                    <Route exact path="*"  element={<div>Erro</div>}/>
                </Routes>
            </BrowserRouter>
        </section>
    )
}

export default ContentSection