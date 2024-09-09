import "./PaginaPadrao.scss";
import SideBar from "../../Widgets/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const PaginaPadrao = () => {
  return (
    <div className="mainpage">
      <SideBar />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default PaginaPadrao;
