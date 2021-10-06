import React, { useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux'
import { fetchProcesses, SELECT_PROCESS } from 'app/redux/actions/ProcessActions';
import { getPayments } from 'app/redux/actions/PaymentActions';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: "Operation d'achat",
    flex: 1,
    minWidth:150,

    editable: true,
  },
  {
    field: 'total',
    headerName: 'payée/Total',
    type: 'number',
    flex: 1,
    editable: true,
    minWidth:200,

    valueFormatter: (params) =>
    `${params.getValue(params.id, 'paied')+',00 /'}`+`${params.getValue(params.id, 'total')+',00 DA '}`
  },
  
  {
    field: 'date',
    headerName: 'date',
    type: 'date',
    flex: 1,
    editable: true,
    minWidth:150,

    valueFormatter: (params) =>
    `${new Date(params.getValue(params.id, 'date')).toLocaleDateString()}`
  },
];



const  DataTableProcesses = ({dispatch, loading, selectedclient, hasErrors,processes}) =>{
    const [selected, setSelected]=useState(1)
    useEffect(() => {
        dispatch(fetchProcesses())
        dispatch({type:SELECT_PROCESS,payload:null})
      }, [dispatch])
     const handleRowClick=(param,event)=>{
         setSelected(param.id)
         dispatch({type:SELECT_PROCESS,payload:param.id})
         dispatch(getPayments(processes&&processes.filter((e)=>e.id==param.id)[0]&&processes.filter((e)=>e.id==param.id)[0].payments||[]))

      }
  return (
    <div style={{ height: 400, width: '100%' }}>
        
      <DataGrid 
      onRowClick={handleRowClick}
        rows={processes.filter((e)=>{return e.client_id==selectedclient})||[]}
        columns={columns}
        pageSize={5}
        checkboxSelection
        selectionModel={selected}        
        
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
    loading: state.processes.loading,
    selectedclient: state.clients.selected,
    hasErrors: state.processes.hasErrors,
    processes:state.processes.processes
  })
export default connect(mapStateToProps)(DataTableProcesses)



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
