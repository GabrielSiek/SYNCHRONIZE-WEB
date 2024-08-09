import './Obras.scss'
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import api from "../../api/axios.jsx";
import { ButtonDefault } from '../../Widgets/Buttons/Buttons.jsx'
import { FaPlus } from "react-icons/fa";
import {FormTitulo, FormInputText, FormInputFile, FormCloseButton} from "../../Widgets/Form/Form.jsx"
import { useNavigate } from "react-router-dom";

const Obras = () => {

    const [nomeObra, setNomeObra] = useState("");
    const [encarregado, setEncarregado] = useState("");

    const [nomeArquivo, setNomeArquivo] = useState("Selecionar arquivo de obra");
    const [obras, setObras] = useState([]);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

   //get obras
    useEffect(() => {
        const fecthObras = async () => {
            try {
                const response = await api.get(`${localStorage.getItem('empresa_id')}/jobs-info`)
                setObras(response.data);
            } catch (e) {
                if(e.response) {
                        console.log(e.response.data)
                        console.log(e.response.status)
                        console.log(e.response.headers)
                }
            }
        }

        fecthObras();
    }, [])

    //post obra
    useEffect(() => {

    }, [])
    
    const handleSubmit = () => {
        const obra = { nome: nomeObra, encarregado_id: encarregado, items }

        setNomeObra("")
        setEncarregado("")
        setNomeArquivo("")
        setItems([])

        console.log("obra adicionada")
        console.log(obra)
        closeFormRegisterObra()

    }

    const handleFileUpload = (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });

            setNomeArquivo(file.name);
 
            //array de items a partir dos dados parseados
            for (let i = 0; i < parsedData.length; i++) {
                const row = parsedData[i];
                const item = {
                    numero: row[0],
                    local_de_aplicacao: row[1],
                    nome: row[2],
                    sistemas: row[3],
                    tipo: row[4],
                    quantidade: row[5],
                    area_total: row[6],
                    valor: row[7],
                    valor_etapa: row[8],
                    preparacao_tipo: row[9],
                    preparacao_area_total: row[10],
                    preparacao_valor: row[11],
                    preparacao_valor_etapa: row[12],
                    protecao_tipo: row[13],
                    protecao_area_total: row[14],
                    protecao_valor: row[15],
                    protecao_valor_etapa: row[16]
                };
                items.push(item);
            }        
        };
    };

    const showFormRegisterObra = () => {
        const form = document.getElementById('form-register-obra');
        const conteudo_obras = document.getElementById('conteudo-obras')
        form.style.display = 'block';
        conteudo_obras.classList.add('blurred');
    }

    const closeFormRegisterObra = () => {
        const form = document.getElementById('form-register-obra');
        const conteudo_obras = document.getElementById('conteudo-obras')
        form.style.display = 'none';
        conteudo_obras.classList.remove('blurred');
    }
    
    return (
    <section className='obras'>
        <div className='conteudo-obras' id='conteudo-obras'>
            <h1 className='titulo-obras'>Obras</h1>
            {obras.length === 0 ? (
                <p>Nenhuma obra registrada</p>
            ) : (
                <div className='container-obras'>
                    <table className='tabela-obras'>
                        <thead className='tabela-obras-head'>
                            <tr>
                                <th>N°</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Encarregado</th>
                                <th>Itens</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {obras.map((obra, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{obra.nome}</td>
                                    <td>{obra.valor}</td>
                                    <td>{obra.encarregado.nome}</td>
                                    <td>{obra.itens}</td>
                                    <td>{obra.status}</td>
                                    <td>
                                        <button>deletar</button>
                                    </td>
                                    <td>
                                        <button>editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className='container-bt-add-obra'>
                <ButtonDefault onClick={showFormRegisterObra} modo={"redondo"}>
                    <FaPlus />
                </ButtonDefault>
            </div>
        </div>

        <form className='form-register-obra' id='form-register-obra' onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <FormTitulo>Registrar nova obra</FormTitulo>
            <FormCloseButton onClick={closeFormRegisterObra} />
            <div className='form-input-area'>
                <FormInputText
                    labelText='Nome da obra'
                    placeholder='Digite o nome da obra'
                    value={nomeObra}
                    onChange={(e) => setNomeObra(e.target.value)}
                />
                <FormInputText
                    labelText='Encarregado'
                    placeholder='Digite o nome do encarregado'
                    value={encarregado}
                    onChange={(e) => setEncarregado(e.target.value)}
                />
                <FormInputFile
                    labelText='Arquivo da obra'
                    accept='.xlsx, .xls'
                    onChange={handleFileUpload}
                    placeholder={nomeArquivo}
                    textoBotao='Procurar'
                />
            </div>
            <ButtonDefault>Registrar obra</ButtonDefault>
        </form>
    </section>
)

}

export default Obras;

{
    /* <div className='container-table'>
                {items.length > 0 && (
                    <table className="table">
                        <tbody>
                            {items.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div> */
}