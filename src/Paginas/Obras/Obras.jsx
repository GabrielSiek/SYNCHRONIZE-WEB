import './Obras.scss'
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from "axios";

function Obras() {

    const [items, setItems] = useState([]);

    const handleFileUpload = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });
    
            // Criar array de items a partir dos dados parseados
            for (let i = 2; i < parsedData.length; i++) {
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
    
            // Enviar o array items como POST para o backend
            const handleSubmit = (e) => {
    
                fetch('URL_DO_BACKEND', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(items)
                }).then(response => {
                    if (response.ok) {
                        console.log('Itens adicionados com sucesso!');
                    } else {
                        console.error('Erro ao adicionar itens:', response.statusText);
                    }
                }).catch(error => {
                    console.error('Erro ao enviar requisição POST:', error);
                });
            }
    
            // Chamar a função handleSubmit para enviar os dados ao backend
            handleSubmit();
            
            console.log(items)
        };
    };
    

    

    return (
        <section className='obras'>
            obras

            <input
                type='file'
                accept='.xlsx, xls'
                onChange={handleFileUpload}
            />

            <div className='container-table'>
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
            </div>
        </section>
    )
}

export default Obras;