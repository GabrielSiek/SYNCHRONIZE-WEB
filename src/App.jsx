import './global.scss'
import DashBoard from './Paginas/Dashboard/Dashboard'
import Itens from './Paginas/Itens/Itens'
import Obras from './Paginas/Obras/Obras'
import PaginaPadrao from './Paginas/PaginaPadrao/PaginaPadrao'
import Login from './Paginas/Login/Login'
import { Routes , Route } from 'react-router-dom'
import RequireAuth from './Authentication/RequireAuth'
const App = () => {

  return (
    <Routes>

      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route exact path="/sem-autorizacao" element={<div>Sem autorizacao</div>} />

      {/* protected */}
      <Route element={< RequireAuth />}>
        <Route path="/" element={<PaginaPadrao />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/itens" element={<Itens />} />
          <Route path="/obras" element={<Obras />} />
        </Route>
      </Route>

      {/* error */}
      <Route exact path="*" element={<div>Erro</div>} /> 
    </Routes>
  )
}

export default App;