
import React, { useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux'
import { fetchCBS } from 'app/redux/actions/StockActions';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'brand_name',
    headerName: "Brand ",
    flex: 1,
    minwidth:150,

  },
  {
    field: 'name',
    headerName: "Stock",
    flex: 1,
    minwidth:150,

  },
  {
    field: 'quantity',
    headerName: 'quantity',
    type: 'number',
    flex: 1,
  },
  {
    field: 'instock',
    headerName: 'instock',
    type: 'number',
    flex: 1,
  },
  {
    field: 'item_buying_price',
    headerName: 'Prix d\'achat',
    type: 'number',
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
    `${params.getValue(params.id, 'item_buying_price')+',00 DA'}`
  },
  {
    field: 'item_sale_price',
    headerName: 'Prix de vente',
    type: 'number',
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
    `${params.getValue(params.id, 'item_sale_price')+',00 DA'}`
  },
  
  {
    field: 'date',
    headerName: 'date',
    type: 'date',
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
    `${new Date(params.getValue(params.id, 'date')).toLocaleDateString()}`
  },
];



const  DataTableStocks = ({dispatch,stocks}) =>{
    const [selected, setSelected]=useState(1)
    useEffect(() => {
        dispatch(fetchCBS())
      }, [dispatch])
     const handleRowClick=(param,event)=>{
         setSelected(param.id)

      }
  return (
    <div style={{ height: 400, width: '100%' }}>
        
      <DataGrid 
      onRowClick={handleRowClick}
        rows={stocks||[]}
        columns={columns}
        pageSize={5}
        checkboxSelection
        selectionModel={selected}        
        
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
 
    stocks: state.stocks.stocks,
  })
export default connect(mapStateToProps)(DataTableStocks)




