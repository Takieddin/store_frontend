/*import React from 'react'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    productTable: {
        '& small': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-child': {
            paddingLeft: '16px !important',
        },
    },
}))

const TopSellingTable = () => {
    const classes = useStyles()

    return (
        <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
                <span className="card-title">top selling products</span>
                <Select size="small" defaultValue="this_month" disableUnderline>
                    <MenuItem value="this_month">This Month</MenuItem>
                    <MenuItem value="last_month">Last Month</MenuItem>
                </Select>
            </div>
            <div className="overflow-auto">
                <Table
                    className={clsx(
                        'whitespace-pre min-w-400',
                        classes.productTable
                    )}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-6" colSpan={4}>
                                Name
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Revenue
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Stock Status
                            </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    className="px-0 capitalize"
                                    colSpan={4}
                                    align="left"
                                >
                                    <div className="flex items-center">
                                        <Avatar src={product.imgUrl} />
                                        <p className="m-0 ml-8">
                                            {product.name}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    colSpan={2}
                                >
                                    $
                                    {product.price > 999
                                        ? (product.price / 1000).toFixed(1) +
                                          'k'
                                        : product.price}
                                </TableCell>

                                <TableCell
                                    className="px-0"
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.available ? (
                                        product.available < 20 ? (
                                            <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                                                {product.available} available
                                            </small>
                                        ) : (
                                            <small className="border-radius-4 bg-primary text-white px-2 py-2px">
                                                in stock
                                            </small>
                                        )
                                    ) : (
                                        <small className="border-radius-4 bg-error text-white px-2 py-2px">
                                            out of stock
                                        </small>
                                    )}
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>
                                    <IconButton>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}*/
import React, { Fragment ,useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { PinDropSharp } from '@material-ui/icons';
import {connect} from 'react-redux'
import { fetchClients, SELECT_CLIENT } from 'app/redux/actions/ClientActions'
import { LinearProgress, Radio, RadioGroup } from '@material-ui/core';
import { SELECT_PROCESS } from 'app/redux/actions/ProcessActions';
import MatxProgressBar from 'app/components/MatxProgressBar/MatxProgressBar';
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



const  DataTable = ({dispatch, loading, clients, hasErrors}) =>{
    const [selected, setSelected]=useState(1)
    useEffect(() => {
        dispatch(fetchClients())
      }, [dispatch])
     const handleRowClick=(param,event)=>{
         setSelected(param.id)
         dispatch({type:SELECT_CLIENT,payload:param.id})
         dispatch({type:SELECT_PROCESS,payload:null})

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
