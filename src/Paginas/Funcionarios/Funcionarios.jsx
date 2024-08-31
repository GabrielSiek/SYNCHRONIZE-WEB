import { useState, useEffect } from 'react';
import './Funcionarios.scss'
import api from '../../Api/Axios';
import Table from '../../Widgets/Tabelas/TabelaFuncionarios';
import Header from '../../Widgets/Header/Header';

const Funcionarios = () => {

    const [funcionarios, setFuncionarios] = useState([]);

    //get funcionarios
    const fetchFuncionarios = async () => {
        try {
            const response = await api.get("/funcionarios");
            setFuncionarios(response.data);
            console.log(response.data)  
        } catch (e) {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        }
    }

    useEffect(() => {
        fetchFuncionarios();
    }, [])

    return (
        <section className='funcionarios'>
            
            <div className='funcionarios-conteudo' id='funcionarios-conteudo'>
                <div className='tabela-header'>
                    <h1 className='tabela-titulo'>Funcionários</h1>
                    <Header/>
                </div>

                <Table funcionarios={funcionarios}/>
            </div>

        </section>
    )

}

export default Funcionarios;