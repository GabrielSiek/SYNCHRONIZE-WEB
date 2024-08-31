    import { DataGrid, GridToolbar } from '@mui/x-data-grid';
    import { ptBR } from '@mui/x-data-grid/locales';
    import StatusBadge from '../Badges/StatusBadge';
    import { useCallback, useState } from 'react';
    import './Tabela.scss'

    const columns = [
        {
            field: 'numero',
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
            field: 'sistemas',
            headerName: 'Sistemas',
            width: 140,
            align: 'left',
            headerAlign: 'left'
        },
        {
            field: 'tipo',
            headerName: 'Tipo',
            align: 'left',
            headerAlign: 'left',
            type: 'number'
        },
        {
            field: 'quantidade',
            width: 120,
            headerName: 'Quantidade',
            align: 'left',
            headerAlign: 'left',
            type: 'number'
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
            field: 'valor_etapa',
            headerName: 'Valor Etapa',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            renderCell: (params) => (
                <div>{`R$${params.value}`}</div>
            )
        },
        {
            field: 'preparacao_tipo',
            headerName: 'Tipo',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-preparacao'
        },
        {
            field: 'preparacao_area_total',
            headerName: 'Área Total',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-preparacao',
            renderCell: (params) => (
                <div>{`${params.value}m²`}</div>
            )
        },
        {
            field: 'preparacao_valor',
            headerName: 'Valor',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-preparacao',
            renderCell: (params) => (
                <div>{`R$${params.value}`}</div>
            )
        },
        {
            field: 'preparacao_valor_etapa',
            headerName: 'Valor Etapa',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-preparacao',
            renderCell: (params) => (
                <div>{`R$${params.value}`}</div>
            )
        },
        {
            field: 'preparacao_desenvolvimento_area',
            headerName: 'Desenvolvido(m²)',
            width: 140,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            editable: true,
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
            editable: true,
            cellClassName: 'obra-preparacao',
            renderCell: (params) => (
                <div>{`${params.value}%`}</div>
            )
        },
        {
            field: 'protecao_tipo',
            headerName: 'Tipo',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-protecao'
        },
        {
            field: 'protecao_area_total',
            headerName: 'Área Total',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-protecao',
            renderCell: (params) => (
                <div>{`${params.value}m²`}</div>
            )
        },
        {
            field: 'protecao_valor',
            headerName: 'Valor',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-protecao',
            renderCell: (params) => (
                <div>{`R$${params.value}`}</div>
            )
        },
        {
            field: 'protecao_valor_etapa',
            headerName: 'Valor Etapa',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            cellClassName: 'obra-protecao',
            renderCell: (params) => (
                <div>{`R$${params.value}`}</div>
            )
        },
        {
            field: 'protecao_desenvolvimento_area',
            headerName: 'Desenvolvido(m²)',
            width: 140,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
            editable: true,
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
            editable: true,
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
            editable: true,
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
            editable: true,
            
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
    ];

    const Table = ({ itens, obra, status, onCellChange }) => {

    const HandleCellChange = useCallback(

        (newRow, oldRow) => {

            //verifica preparacao
            if (newRow.preparacao_desenvolvimento_area !== oldRow.preparacao_desenvolvimento_area) {
                newRow.preparacao_desenvolvimento_porcentagem = Number(((newRow.preparacao_desenvolvimento_area / oldRow.preparacao_area_total) * 100).toFixed(2)); 
            } else if (newRow.preparacao_desenvolvimento_porcentagem !== oldRow.preparacao_desenvolvimento_porcentagem) {
                newRow.preparacao_desenvolvimento_area = Number(((newRow.preparacao_desenvolvimento_porcentagem / 100) * oldRow.preparacao_area_total).toFixed(2));
            }

            //verifica protecao
            else if (newRow.protecao_desenvolvimento_area !== oldRow.protecao_desenvolvimento_area) {
                newRow.protecao_desenvolvimento_porcentagem = Number(((newRow.protecao_desenvolvimento_area / oldRow.protecao_area_total) * 100).toFixed(2)); 
            } else if (newRow.protecao_desenvolvimento_porcentagem !== oldRow.protecao_desenvolvimento_porcentagem) {
                newRow.protecao_desenvolvimento_area = Number(((newRow.protecao_desenvolvimento_porcentagem / 100) * oldRow.protecao_area_total).toFixed(2));
            }  
            
            //veririca geral
            else if (newRow.desenvolvimento_area !== oldRow.desenvolvimento_area) {
                newRow.desenvolvimento_porcentagem = Number(((newRow.desenvolvimento_area / oldRow.area_total) * 100).toFixed(2)); 
            } else if (newRow.desenvolvimento_porcentagem !== oldRow.desenvolvimento_porcentagem) {
                newRow.desenvolvimento_area = Number(((newRow.desenvolvimento_porcentagem / 100) * oldRow.area_total).toFixed(2));
            }
            
            if(newRow.preparacao_desenvolvimento_porcentagem >= 100 && newRow.protecao_desenvolvimento_porcentagem >= 100 && newRow.desenvolvimento_porcentagem >= 100 )
                newRow.status = 'CONCLUIDO';
            else if(newRow.status !== 'NAO_CONCLUIDO')
                newRow.status = 'NAO_CONCLUIDO';

            onCellChange(newRow, oldRow);

            return newRow;
        },
        [onCellChange]
    );
        
        return (
            <div className='data-grid-with-save-button'>
                <DataGrid
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    rows={itens}
                    columns={columns}
                    processRowUpdate={HandleCellChange} 
                    onProcessRowUpdateError={(error) => console.log(error)}         
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
                    checkboxSelection
                />
            </div>
        )
    }

    export default Table;   
