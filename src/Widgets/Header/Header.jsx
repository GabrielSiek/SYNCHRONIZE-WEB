import './Header.scss'
import { FaSearch, FaPlus, FaUser } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { ButtonDefault } from '../Buttons/Buttons.jsx';
import { MdDownload } from "react-icons/md";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Header = ({BotaoAdicionar}) => {

      const HandleDownload = () => {
        const data = [
           { "numero": "",
            "local de aplicacao": "",
            "nome": "",
            "sistemas":"",
            "tipo": "",
            "quantidade": "",
            "área total": "",
            "valor": "",
            "valor etapa": "",
            "preparação: tipo": "",
            "preparação: área total": "",
            "preparação: valor": "",
            "preparação: valor etapa": "",
            "proteção: tipo": "",
            "proteção: área total": "",
            "proteção: valor": "",
            "proteção: valor etapa": ""
        }]

        const worksheet = XLSX.utils.json_to_sheet(data, {skipHeader: false});
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "folha 1");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array"});

        const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});

        saveAs(blob, "template de obra.xlsx")
      }

    return (
        <header className='header' id='header'>

            {/*
            <div className='header-search-bar'>
                <FaSearch  className='header-search-icon'/>
                <input name='search-bar' className='header-search-input' placeholder='Digite o que deseja buscar'></input>
            </div>
            */}
     
            <div className='header-right-buttons'>
            <ButtonDefault isSecondary={true} onClick={HandleDownload}><MdDownload/>Baixar template</ButtonDefault>
                <ButtonDefault onClick={BotaoAdicionar}> <FaPlus/> Adicionar </ButtonDefault>
            
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