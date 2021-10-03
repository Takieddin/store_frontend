import React, { useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux'
import { fetchClients, SELECT_CLIENT } from 'app/redux/actions/ClientActions'
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minwidth:150,

    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'number',
    flex: 1,
    editable: true,    
  },
  {
    field: 'paied',
    headerName: 'paied',
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'credit',
    headerName: 'credit',
    type: 'number',
    flex: 1,
    editable: true,
  },
  {
    field: 'delais',
    headerName: 'delais',
    type: 'date',
    flex: 1,
    editable: true,
  },
];



const  DataTable = ({dispatch,  clients}) =>{
    const [selected, setSelected]=useState(1)
    useEffect(() => {
        dispatch(fetchClients())
      }, [dispatch])
     const handleRowClick=(param,event)=>{
         console.log("row")
         console.log(param.id)
         setSelected(param.id)
         dispatch({type:SELECT_CLIENT,payload:param.id})

      }
  return (
    <div style={{ height: 400, width: '100%' }}>
        
      <DataGrid 
      onRowClick={handleRowClick}
        rows={clients||[]}
        columns={columns}
        pageSize={5}
        checkboxSelection
        selectionModel={selected}    
        onRawedit={handleRowClick}    
        
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
    loading: state.clients.loading,
    clients: state.clients.clients,
    hasErrors: state.clients.hasErrors,
  })
export default connect(mapStateToProps)(DataTable)



/*const productList = [
    {
        imgUrl: '/assets/images/products/headphone-2.jpg',
        name: 'earphone',
        price: 100,
        available: 15,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'earphone',
        price: 1500,
        available: 30,
    },
    {
        imgUrl: '/assets/images/products/iphone-2.jpg',
        name: 'iPhone x',
        price: 1900,
        available: 35,
    },
    {
        imgUrl: '/assets/images/products/iphone-1.jpg',
        name: 'iPhone x',
        price: 100,
        available: 0,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Head phone',
        price: 1190,
        available: 5,
    },
]

export default TopSellingTable*/
