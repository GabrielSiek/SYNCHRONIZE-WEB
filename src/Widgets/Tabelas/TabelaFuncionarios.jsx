import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Tabela.scss'

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
        field: 'nome',
        headerName: 'Nome',
        width: 250,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
            <Link to={`/funcionario/${params.row.user_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              {params.value}
            </Link>
          ),
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        align: 'left',
        headerAlign: 'left'
    },
    {
        field: 'role',
        headerName: 'Função',
        width: 150,
        align: 'left',
        headerAlign: 'left'
    }
]

const Table = ({funcionarios}) => {

    const navigate = useNavigate();

    return (
        <div className='data-grid'>
            <DataGrid
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                rows={funcionarios}
                columns={columns}
                disableColumnFilter
                disableDensitySelector
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
                checkboxSelection/>
        </div>
    )
}

export default Table;