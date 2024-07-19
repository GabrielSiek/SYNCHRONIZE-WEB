import './Obras.scss'
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from "axios";
import { ButtonDefault } from '../../Widgets/Buttons/Buttons.jsx'
import { FaPlus } from "react-icons/fa";
import {FormTitulo, FormInputText, FormInputFile} from "../../Widgets/Form/Form.jsx"

const Obras = () => {

    const [nomeObra, setNomeObra] = useState("");
    const [encarregado, setEncarregado] = useState("");

    const [nomeArquivo, setNomeArquivo] = useState("Selecionar arquivo de obra");
    const [obras, setObras] = useState([]);
    const [items, setItems] = useState([]);

    const handleSubmit = () => {
        const obra = { nome: nomeObra, encarregado_id: encarregado, items }

        //fetch('URL_DO_BACKEND', {
        //    method: 'POST',
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify(obra)
        //}).then(response => {
        //    if (response.ok) {
        //        console.log('Itens adicionados com sucesso!');
        //    } else {
        //        console.error('Erro ao adicionar itens:', response.statusText);
        //    }
        //}).catch(error => {
        //    console.error('Erro ao enviar requisição POST:', error);
        //});

        setNomeObra("")
        setEncarregado("")
        setNomeArquivo("")
        setItems([])

        console.log("obra adicionada")
        console.log(obra)

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

    function showFormRegisterObra () {
        const form = document.getElementById('form-register-obra');
        form.style.display = 'block'
    }

    return (
        <section className='obras'>
            <ButtonDefault onClick={() => showFormRegisterObra } modo={"redondo"}><FaPlus /></ButtonDefault>


            <form className='form-register-obra' onSubmit={(e) => {
                e.preventDefault();
                handleSubmit()}}>

                <FormTitulo>Registrar nova obra</FormTitulo>

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
                    labelText={'Arquivo da obra'}
                        accept= '.xlsx, .xls'
                        onChange={handleFileUpload}
                        placeholder={nomeArquivo}
                        textoBotao = 'Procurar'
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