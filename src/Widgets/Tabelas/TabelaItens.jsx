import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import StatusBadge from '../Badges/StatusBadge';
import { Link } from 'react-router-dom';

const columns = [

    {
        field: 'id',
        headerName: 'N°',
        width: 90,
        align: 'left',
        headerAlign: 'left',
        type: 'number'
    },
    {
        field: 'local_de_aplicacao',
        headerName: 'Local de Aplicação',
        width: 210,
        align: 'left',
        headerAlign: 'left'
    },
    {
        field: 'nome',
        headerName: 'Nome',
        width: 120,
        align: 'left',
        headerAlign: 'left'
    },
    {
        field: 'area_total',
        headerName: 'Área Total',
        width: 120,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        renderCell: (params) => (
            <div>{`${params.value}m²`}</div>
        )
    },
    {
        field: 'valor',
        headerName: 'Valor',
        width: 120,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        renderCell: (params) => (
            <div>{`R$${params.value}`}</div>
        )
    },
    {
        field: 'obra_nome',
        headerName: 'Obra',
        width: 170,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
            <Link to={`/obra/${params.row.obra_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {params.value}
            </Link>
        )
    },
    {
        field: 'encarregado_nome',
        headerName: 'Encarregado',
        width: 170,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
            <Link to={`/encarregado/${params.row.encarregado_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {params.value}
            </Link>
        )
    },
    {
        field: 'preparacao_desenvolvimento_area',
        headerName: 'Desenvolvido(m²)',
        width: 140,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        cellClassName: 'obra-preparacao',
        renderCell: (params) => (
            <div>{`${params.value}m²`}</div>
        )
    },
    {
        field: 'preparacao_desenvolvimento_porcentagem',
        headerName: 'Desenvolvido(%)',
        width: 130,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        cellClassName: 'obra-preparacao',
        renderCell: (params) => (
            <div>{`${params.value}%`}</div>
        )
    },
    {
        field: 'protecao_desenvolvimento_area',
        headerName: 'Desenvolvido(m²)',
        width: 140,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        cellClassName: 'obra-protecao',
        renderCell: (params) => (
            <div>{`${params.value}m²`}</div>
        )
    },
    {
        field: 'protecao_desenvolvimento_porcentagem',
        headerName: 'Desenvolvido(%)',
        width: 130,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        cellClassName: 'obra-protecao',
        renderCell: (params) => (
            <div>{`${params.value}%`}</div>
        )
    },
    {
        field: 'desenvolvimento_area',
        headerName: 'Desenvolvido(m²)',
        width: 140,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        renderCell: (params) => (
            <div>{`${params.value}m²`}</div>
        )
    },
    {
        field: 'desenvolvimento_porcentagem',
        headerName: 'Desenvolvido(%)',
        width: 130,
        align: 'left',
        headerAlign: 'left',
        type: 'number',
        renderCell: (params) => (
            <div>{`${params.value}%`}</div>
        )
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 135,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
            <StatusBadge status={params.value} tipo={'item'} />
        )
    }

]

const Table = ({ itens }) => {

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                rows={itens}
                columns={columns}
                disableColumnFilter
                slots={{
                    toolbar: GridToolbar,
                }}

                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                    pagination: {
                        labelRowsPerPage: "Itens por página"
                    }
                }}

                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
            />
        </div>
    )
}

export default Table;