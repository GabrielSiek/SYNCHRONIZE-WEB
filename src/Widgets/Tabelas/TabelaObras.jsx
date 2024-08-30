import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { ptBR } from '@mui/x-data-grid/locales';
import StatusBadge from '../Badges/StatusBadge';

const columns = [
  { field: 'id', headerName: 'N°', width: 90, align: 'left', headerAlign: 'left'},
  {
    field: 'nome', 
    headerName: 'Nome',
    width: 130,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <Link to={`/obra/${params.row.obra_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        {params.value}
      </Link>
    ),
    },
  { 
    field: 'encarregado_nome',
    headerName: 'Encarregado',
    width: 170,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <Link to={`/encarregado/${params.row.encarregado_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        {params.value}
      </Link>
    )
  },
  { field: 'valor', headerName: 'Valor', width: 110, type: 'number', align: 'left', headerAlign: 'left' },
  { field: 'itens', headerName: 'Itens', width: 110, type: 'number', align: 'left', headerAlign: 'left'},
  { field: 'status',
    headerName: 'Status',
    width: 135,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <StatusBadge status={params.value} tipo={'obra'}/>
    ),
  },
];


const Table = ({ obras }) => {

  const [ collumnsVisible ,setCollumsVisible] = React.useState({
    obra_id: false,
    encarregado_id: false
  })
  
  return (
    <div style={{ height:500, width: '100%' }}>
      <DataGrid          
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText} 
        rows={obras}
        columns={columns}
        columnVisibilityModel={collumnsVisible}
        onColumnVisibilityModelChange={(newModel) =>
          setCollumsVisible (newModel)
        }

        disableColumnFilter
        slots={{
          toolbar: GridToolbar,
        }}

        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          pagination: {
            labelRowsPerPage: "Obras por página"
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
