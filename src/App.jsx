import "./global.scss";
import DashBoard from "./Paginas/Dashboard/Dashboard";
import Itens from "./Paginas/Itens/Itens";
import Obras from "./Paginas/Obras/Obras";
import PaginaPadrao from "./Paginas/PaginaPadrao/PaginaPadrao";
import Login from "./Paginas/Login/Login";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Theme from "./Themes/Theme";
import Obra from "./Paginas/Obra/Obra";
import RequireAuth from "./Authentication/RequireAuth";
import Funcionarios from "./Paginas/Funcionarios/Funcionarios";
const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/sem-autorizacao" element={<div>Sem autorizacao</div>} />

        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<PaginaPadrao />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/itens" element={<Itens />} />
            <Route path="/obras" element={<Obras />} />
            <Route path="/obra/:obra_id" element={<Obra />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route
              path="/funcionario/:user_id"
              element={<div>funcionario</div>}
            />
          </Route>
        </Route>

        {/* error */}
        <Route path="*" element={<div>Erro</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
