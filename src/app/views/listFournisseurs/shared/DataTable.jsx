import React, { useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux'
import MatxProgressBar from 'app/components/MatxProgressBar/MatxProgressBar';
import { fetchFou,  SELECT_FOU } from 'app/redux/actions/FournisseurActions';
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
    flex: 2,
    type: 'number',

    renderCell: (params) =>{const v=((parseInt(`${params.getValue(params.id, 'paied')}`)/parseInt(`${params.getValue(params.id, 'total')}`))*100);return (<>
    

            <div style={{display: "inline-block"}}>{`${params.getValue(params.id, 'paied')+',00 /'}`+`${params.getValue(params.id, 'total')+',00 DA '}`}</div>
            
       
         <MatxProgressBar 
                    value={v}
                    color={v<80?"secondary":"primary"}
                    text={v+'%'}
                />
        </>
      )}
  },
  {
    field: 'total',
    headerName: 'Credit restent',
    type: 'number',
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
    `${(parseInt(`${params.getValue(params.id, 'total')}`)-parseInt(`${params.getValue(params.id, 'paied')}`))+',00 DA'}`
  },
  {
    field: 'delais',
    headerName: 'delais',
    type: 'date',
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
    `${new Date(params.getValue(params.id, 'delais')).toLocaleDateString()}`},
];



const  DataTable = ({dispatch, loading, fournisseurs, hasErrors}) =>{
    const [selected, setSelected]=useState(1)
    useEffect(() => {
        dispatch(fetchFou())
      }, [dispatch])
     const handleRowClick=(param,event)=>{
         setSelected(param.id)
         dispatch({type:SELECT_FOU,payload:param.id})

      }
  return (
    <div style={{ height: 400, width: '100%' }}>
        
      <DataGrid 
      onRowClick={handleRowClick}
        rows={fournisseurs||[]}
        columns={columns}
        pageSize={5}
        checkboxSelection
        selectionModel={selected}        
        
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
    fournisseurs: state.fournisseurs.fournisseurs,
    hasErrors: state.fournisseurs.hasErrors,
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
