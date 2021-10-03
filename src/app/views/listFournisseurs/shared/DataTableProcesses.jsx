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
import React, { useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux'
import { fetchProcesses, SELECT_PROCESS } from 'app/redux/actions/ProcessActions';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: "Operation d'achat",
    flex: 1,
    minwidth:150,

    editable: true,
  },
  {
    field: 'total',
    headerName: 'payée/Total',
    type: 'number',
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
    `${params.getValue(params.id, 'paied')+',00 /'}`+`${params.getValue(params.id, 'total')+',00 DA '}`
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



const  DataTableProcesses = ({dispatch, loading, selectedclient, hasErrors,processes}) =>{
    const [selected, setSelected]=useState(1)
    useEffect(() => {
        dispatch(fetchProcesses())
        dispatch({type:SELECT_PROCESS,payload:null})
      }, [dispatch])
     const handleRowClick=(param,event)=>{
         setSelected(param.id)
         dispatch({type:SELECT_PROCESS,payload:param.id})

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
