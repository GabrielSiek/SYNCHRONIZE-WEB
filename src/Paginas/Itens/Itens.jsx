import { useEffect, useState } from 'react';
import './Itens.scss'
import Header from '../../Widgets/Header/Header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '../../Widgets/Tabelas/TabelaItens';
import api from '../../Api/axios.jsx';


const Itens =  () => {

    const [itens, setItens] = useState([]);
    const [itensTabela, setItensTabela] = useState([]);
    
    const [tab, setTab] = useState(0);

    const handleChangeTab = (event, newTab) => {
        setTab(newTab);

        if(newTab === 0)
            setItensTabela(itens);
    
        else if(newTab === 1)
            setItensTabela(itens.filter(item => item.status === 'NAO_CONCLUIDO'));

        else if(newTab === 2)
            setItensTabela(itens.filter(item => item.status === 'CONCLUIDO'));
    };

    //get itens
    const fetchItens = async () => {
        try {
            const response = await api.get("/itens");
            
            setItens(response.data);
            setItensTabela(response.data);
        } catch(e) {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        }
    }

    useEffect(() => {
        fetchItens();
    }, [])
    
    return (
        <section className='itens'>

            <div className='itens-conteudo' id='itens-conteudo'>
                <div className='tabela-header'>
                    <h1 className='tabela-titulo'>Itens</h1>
                    <Header/>
                </div>

                <Tabs value={tab} onChange={handleChangeTab}>
                    <Tab label='Todos' disableRipple />
                    <Tab label='Não concluídos' disableRipple />
                    <Tab label='Concluídos' disableRipple />
                </Tabs>

                <Table itens={itensTabela}/>
            </div>

        </section>
    )
}

export default Itens;