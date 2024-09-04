import './Obra.scss';
import { useEffect, useState, useCallback } from 'react';
import api from '../../Api/Axios.jsx';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CircularProgress } from '@mui/material';
import Header from '../../Widgets/Header/Header.jsx';
import Table from '../../Widgets/Tabelas/TabelaObra.jsx';
import { ButtonDefault, ButtonReturn } from '../../Widgets/Buttons/Buttons.jsx';
import { FaHelmetSafety } from "react-icons/fa6";
import { PiBookBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../Widgets/Badges/StatusBadge.jsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Obra = () => {

    const navigate = useNavigate();

    const { obra_id } = useParams();
    const [obra, setObra] = useState();
    const [updatedObra, setUpdatedObra] = useState();
    const [itensTabela, setItensTabela] = useState([]);
    const [file, setFile] = useState();

    const [tab, setTab] = useState(0);

    const [isDisabled, setIsDisabled] = useState(true);

    const updateRow = (row) => {

        const updateRow = {
            preparacao_desenvolvimento_area: row.preparacao_desenvolvimento_area,
            preparacao_desenvolvimento_porcentagem: row.preparacao_desenvolvimento_porcentagem,
            protecao_desenvolvimento_area: row.protecao_desenvolvimento_area,
            protecao_desenvolvimento_porcentagem: row.protecao_desenvolvimento_porcentagem,
            desenvolvimento_area: row.desenvolvimento_area,
            desenvolvimento_porcentagem: row.desenvolvimento_porcentagem,
            status: row.status
        }

        api.put(`/item/${row.id}/update`, updateRow)
        .then((response) => {
            console.log(response.data);
            console.log(updateRow);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleCellChange = useCallback((newRow, oldRow) => {
        const updatedItens = itensTabela.map(item => item.id === newRow.id ? newRow : item);
        setItensTabela(updatedItens);

        const isDifferent = updatedItens.some((item, index) => {
            const obraItem = obra.itens[index];
            return (
                item.preparacao_desenvolvimento_area !== obraItem.preparacao_desenvolvimento_area ||
                item.preparacao_desenvolvimento_porcentagem !== obraItem.preparacao_desenvolvimento_porcentagem ||
                item.protecao_desenvolvimento_area !== obraItem.protecao_desenvolvimento_area ||
                item.protecao_desenvolvimento_porcentagem !== obraItem.protecao_desenvolvimento_porcentagem ||
                item.desenvolvimento_area !== obraItem.desenvolvimento_area ||
                item.desenvolvimento_porcentagem !== obraItem.desenvolvimento_porcentagem
            );
        });

        setIsDisabled(!isDifferent)
        setUpdatedObra(prevObra => ({
            ...prevObra,
            itens: updatedItens
        }));

        if (updatedItens.every(item => item.status === 'CONCLUIDO')) {
            setObra(prevObra => ({
                ...prevObra,
                status: 'CONCLUIDO'
            }));
            setUpdatedObra(prevObra => ({
                ...prevObra,
                status: 'CONCLUIDO'
            }));
        }

        updateRow(newRow);

        return newRow;
    }, [itensTabela]);


    const handleChangeTab = (event, newTab) => {
        setTab(newTab);

        if (newTab === 0)
            setItensTabela(obra.itens);

        else if (newTab === 1)
            setItensTabela(obra.itens.filter(item => item.status === 'NAO_CONCLUIDO'));

        else if (newTab === 2)
            setItensTabela(obra.itens.filter(item => item.status === 'CONCLUIDO'));

    };

    //get obra
    const fetchObra = async () => {
        try {
            const response = await api.get(`/obra/${obra_id}`);

            setObra(response.data);
            setUpdatedObra(response.data);
            setItensTabela(response.data.itens);
            console.log(response.data.itens)
 vb          } catch (e) {
            if (e.response) {
                console.log(e.response.data);
                console.log(e.response.status);
                console.log(e.response.headers);
            }
        }


    }

    useEffect(() => {
        fetchObra();
    }, [])


    if (!obra) {
        return (
            <div className='loading'>
                <CircularProgress />
            </div>
        );
    }

    return (
        <section className='obra'>

            <div className='obra-conteudo' id='obra-conteudo'>
                <div className='tabela-header'>
                    <div className='tabela-informacoes'>
                        <ButtonReturn navigate={() => navigate(-1)}/>
                        <h1 className='tabela-titulo'>{obra.nome}</h1>
                        <StatusBadge status={obra.status} tipo={'obra'} size={'small'}/>
                        <a className='tabela-header-link' href={`/encarregado/${obra.encarregado_id}`}><FaHelmetSafety className='icon' />{obra.encarregado_nome}</a>
                        <a className='tabela-header-link' href={`/obra/${obra_id}/diario-de-obra`}><PiBookBold/> Diário de obra</a>
                    </div>
                    <Header />
                </div>

                <Tabs value={tab} onChange={handleChangeTab}>
                    <Tab label='Todos' disableRipple />
                    <Tab label='Não concluídos' disableRipple />
                    <Tab label='Concluídos' disableRipple />
                </Tabs>

                    <Table itens={itensTabela} obra={obra.nome} status={obra.status} onCellChange={handleCellChange} />
            </div>
        </section>
    );

}

export default Obra;