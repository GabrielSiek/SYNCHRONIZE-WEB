import './Obra.scss';
import { useEffect, useState, useCallback } from 'react';
import api from "../../Api/Axios.jsx";
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

const Obra = () => {

    const navigate = useNavigate();

    const { obra_id } = useParams();
    const [obra, setObra] = useState();
    const [updatedObra, setUpdatedObra] = useState();
    const [itensTabela, setItensTabela] = useState([]);

    const [tab, setTab] = useState(0);

    const [isDisabled, setIsDisabled] = useState(true);

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

    const handleSaveSubmit = () => {

        api.put(`/obra/${obra_id}/update`, updatedObra)
            .then((response) => {
                console.log(response.data);
                console.log(updatedObra);
            })
            .catch((error) => {
                console.error(error);
            });

    }


    //get obra
    const fetchObra = async () => {
        try {
            const response = await api.get(`/obra/${obra_id}`);

            setObra(response.data);
            setUpdatedObra(response.data);
            setItensTabela(response.data.itens);
        } catch (e) {
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
                        <StatusBadge status={obra.status} tipo={'obra'}/>
                        <ButtonDefault isSecondary={true} onClick={() => navigate(`/obra/${obra_id}/diario-de-obra`)}><PiBookBold/> Diário de obra</ButtonDefault>
                        <a className='tabela-header-link' href={`/encarregado/${obra.encarregado_id}`}><FaHelmetSafety className='icon' />{obra.encarregado_nome}</a>
                    </div>
                    <Header />
                </div>

                <Tabs value={tab} onChange={handleChangeTab}>
                    <Tab label='Todos' disableRipple />
                    <Tab label='Não concluídos' disableRipple />
                    <Tab label='Concluídos' disableRipple />
                </Tabs>

                    <Table itens={itensTabela} obra={obra.nome} status={obra.status} onCellChange={handleCellChange} />

                <div className='obra-bt-salvar'>
                    <ButtonDefault isDisabled={isDisabled} onClick={handleSaveSubmit}>Salvar</ButtonDefault>
                </div>
            </div>
        </section>
    );

}

export default Obra;