import './MainPage.scss'
import DashBoard from '../../Paginas/Dashboard/Dashboard'
import Itens from '../../Paginas/Itens/Itens'
import Obras from '../../Paginas/Obras/Obras'
import PaginaPadrao from '../../Paginas/PaginaPadrao/PaginaPadrao'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function MainPage () {
    
    return (
        <div className='mainpage'>
            <BrowserRouter>
                    <Routes>


                        <Route path="/" element={<PaginaPadrao/>}>
                            <Route path="/dashboard" element={<DashBoard/>}/>
                            <Route path="/itens" element={<Itens/>}/>
                            <Route path="/obras" element={<Obras/>}/>
                        </Route>
                        
                        <Route exact path="*"  element={<div>Erro</div>}/>
                    </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainPage;