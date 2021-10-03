import React, { Fragment, useEffect } from 'react'
import { Grid, Card, TextField, Icon } from '@material-ui/core'
import DoughnutChart from './shared/Doughnut'
import Campaigns from './shared/Campaigns'
import { useTheme } from '@material-ui/styles'
import { Autocomplete } from '@material-ui/lab'
import { useState } from 'react'
import { fetchClients } from 'app/redux/actions/ClientActions'
import { connect } from 'react-redux'
import { fetchCBS } from 'app/redux/actions/StockActions'
import { DataGrid } from '@material-ui/data-grid'
import { Button } from '@material-ui/core'
import DigitalNumber from './DigitalNumber'
import { Input } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addProcess } from 'app/redux/actions/ProcessActions'
import ProcessSnackbar from './ProcessSnackbar'

const Operation = ({ dispatch, clients, brands, stocks }) => {
    const [total, setTotal] = useState(0)
    const [payment, setPayment] = useState(0)
    const [open, setOpen] = useState(false)

    const [op, setOp] = useState({
        name: 'Op Achat',
        date: null,
        payments: [],
        baskets: [],
        client_id: 1,
        paied:0,
    })
    useEffect(() => {
        dispatch(fetchClients())
        dispatch(fetchCBS())
    }, [dispatch])
    const [value, setValue] = useState(clients?clients[0]:[])
    const [value1, setValue1] = useState([])
    const [value2, setValue2] = useState([])
    const [selectedStocks, setSelectedStocks] = useState([])
    const theme = useTheme()

    const top = [
        { id: 9, title: 'The Shawshank Redemption', year: 1994 },
        { id: 7, title: 'The Godfather', year: 1972 },
        { id: 15, title: 'The Godfather: Part II', year: 1974 },
        { id: 4, title: 'The Dark Knight', year: 2008 },
        { id: 2, title: '12 Angry Men', year: 1957 },
        { id: 99, title: "Schindler's List", year: 1993 },
    ]
    const [rows, setRows] = useState([])
    const ha = (e) => {
        setOp({ client_id: e?.id||1 })
    }
    const handleSubmit =()=>{
        if(open){
            const data ={client_id:op.client_id,date:null,paied:payment,total:total,name:null,baskets:[...rows]}
            dispatch(addProcess(data))
            console.log('data')
            console.log(data)
            setOpen(false)
            dispatch(fetchCBS())
            dispatch(fetchClients())


        
    }else{
        setOpen(true)}
    }
    const mystyle = {
        display: 'flex',
        align_items: 'stretch',
    }

    const columns = [
        {
            field: 'brand_name',
            headerName: 'Mark(Brand)',
            flex: 1,
            minwidth: 150,

            editable: true,
            valueFormatter: (params) =>
                `${params.getValue(params.id, 'brand_name')}` + '-'+`${params.getValue(params.id, 'name')}`,
        },
        {
            field: 'instock',
            headerName: 'instock',
            type: 'number',
            flex: 0.6,
            minwidth: 150,

        },

        {
            field: 'item_sale_price', //item_sale_price
            headerName: 'prix',
            type: 'number',
            flex: 0.8,
            minwidth: 150,

            valueFormatter: (params) =>
                `${params.getValue(params.id, 'item_sale_price')}` + ',00 DA',
        },

        {
            field: 'prix_final', //item_sale_price
            headerName: 'prix _final',
            type: 'number',
            flex: 0.8,
            editable: true,
            minwidth: 150,

            valueFormatter: (params) =>
                `${params.getValue(params.id, 'prix_final')}` + ',00 DA',
        },

        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            flex: 0.6,
            editable: true,
            minwidth: 150,

        },
        {
            field: 'delete',
            headerName: 'delete',
            type: 'button',
            flex: 0.4,
            editable: true,
            minwidth: 150,

            renderCell: (params) => (
                <strong>
                    <Button
                        onClick={() => handleDelete(params)}
                        color="primary"
                        size="small"
                    >
                        <Icon>delete</Icon>
                    </Button>
                </strong>
            ),
        },
    ]

    const [editRowsModel, setEditRowsModel] = React.useState({})
    const handleTotal = () => {
        var t

        rows.forEach((element) => {
            console.log('elem')
            console.log(element)
            t =
                parseInt(t) +
                parseInt(element.prix_final) * parseInt(element.quantity)
            console.log('t')
            console.log(t.toString())
            setTotal(t && t.toString())
            setPayment(t && t.toString())
        })
    }
    const handleAdd = (e) => {
        if (value1?.item_sale_price && value2?.name) {
            var rowItem = {
                ...value1,
                prix_final: value1.item_sale_price,
                brand_name: value2.name,
                quantity: 1,
            }
            var b = true

            console.log('rrr')
            console.log(rows)
            rows.forEach((e) =>
                e.id == rowItem.id ? (b = false) : console.log()
            )

            if (b) {
                var newrows = [
                    ...rows.filter((e) => e.id != rowItem.id),
                    rowItem,
                ]
                console.log('value.item_sale_price')
                console.log(value1.item_sale_price)
                console.log('rowItem.quantity')
                console.log(rowItem.quantity)
                var t = total + value1.item_sale_price * rowItem.quantity
                console.log('t')
                console.log(parseInt(t))
                setTotal(t)
                setPayment(t)

                console.log('newrows')
                console.log(newrows)

                setRows(newrows)
                setValue1([])
                setValue2([])
                setSelectedStocks([])
                console.log('rows add')
                console.log(rows)
            }
        }
    }
    const handleDelete = (e) => {
        console.log('e')
        console.log(e)
        setTotal(
            +parseInt(total) -
                parseInt(e.row.prix_final) * parseInt(e.row.quantity)
        )
        setPayment(
            +parseInt(total) -
                parseInt(e.row.prix_final) * parseInt(e.row.quantity)
        )
        setRows([...rows.filter((item) => item.id != e.id)])
    }

    const handleEditRowsModelChange = (model) => {
        setEditRowsModel(model)

        if (model && model != {}) {
            let id = Object.keys(model)[0]
           
            if (id) {
                let newrow = rows.find((e) => e.id == id)
                console.log('newrow')
                console.log(newrow)
                if (newrow) {
                    var new_quantity =
                        model[id]['quantity']?.value || newrow.quantity
                    var new_prix =
                        model[id]['prix_final']?.value || newrow.prix_final

                   
                    let t = -1 * newrow.quantity * newrow.prix_final

                    newrow.quantity = new_quantity
                    newrow.prix_final = new_prix
                    t = t + new_quantity * new_prix
                    let newTotal = total + t
                    setTotal(newTotal)
                    setPayment(newTotal)

                    let newrows = [...rows.filter((e) => e.id != id), newrow]
                    setRows(newrows)
                }
            }
        }
    }

    return (
        <Fragment>
            <addPaymentSnackbar />

            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3} xs={24}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <>
                            <Card className="px-6 py-4 mb-6">
                                <div className="card-title">
                                    Ajouter Operation
                                </div>
                                <Autocomplete
                                    id="tags-standard"
                                    value={value}

                                    onChange={(event, newValue) => {
                                        setValue(newValue)
                                        ha(newValue)
                                    }}
                                    options={clients}
                                    getOptionLabel={(option) =>
                                        option.name +
                                        `:........................credit:` +
                                        (parseInt(option.total) -
                                            parseInt(option.paied)) +
                                        ',00 DA'
                                    }
                                    // defaultValue={[]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Client"
                                            placeholder=""
                                        />
                                    )}
                                />
                            </Card>

                            {/* Top Selling Products */}
                            <Card className="px-6 py-4 mb-6">
                                <div className="card-title">
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            //onRowClick={}
                                            rows={rows || []}
                                            columns={columns}
                                            pageSize={5}
                                            // selectionModel={}
                                            editRowsModel={editRowsModel}
                                            onEditRowsModelChange={
                                                handleEditRowsModelChange
                                            }
                                        />
                                    </div>
                                    Ajouter Produits
                                </div>
                                <div style={mystyle}>
                                    <Autocomplete
                                        style={{ flex: 4 }}
                                        blurOnSelect
                                        clearOnBlur
                                        filterSelectedOptions
                                        onChange={(event, newValue, re) => {
                                            setValue2(newValue)
                                            setSelectedStocks([
                                                ...stocks.filter(
                                                    (e) =>
                                                        e.brand_id ==
                                                            parseInt(
                                                                newValue &&
                                                                    newValue.id
                                                            ) && e.instock > 0
                                                ),
                                            ])

                                        
                                        }}
                                        id="tags-standard"
                                        value={value2}
                                        options={brands}
                                        getOptionLabel={(option) => option.name}
                                        defaultValue={null}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Mark(brand)"
                                                placeholder=""
                                            />
                                        )}
                                    />
                                    <ProcessSnackbar/>
                                    <Autocomplete
                                        blurOnSelect
                                        filterSelectedOptions
                                        clearOnBlur
                                        style={{ flex: 4 }}
                                        id="tags-standard"
                                        value={value1}
                                        onChange={(event, newValue) => {
                                            newValue
                                                ? setValue1(newValue)
                                                : setValue1([])
                                        }}
                                        options={selectedStocks || []}
                                        getOptionLabel={(option) =>
                                            option.name
                                                ? option.name +
                                                  `:..........prix:` +
                                                  option.item_sale_price +
                                                  `,00DA` +
                                                  `...... instock : ` +
                                                  option.instock
                                                : ''
                                        }
                                        defaultValue={null}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Stock"
                                                placeholder=""
                                            />
                                        )}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <Button
                                            className="pt-2"
                                            color="primary"
                                            variant="contained"
                                            onClick={handleAdd}
                                        >
                                            <Icon>queue</Icon>
                                            <span className="pl-1 capitalize">
                                                add
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                            <Card className="px-6 py-4 mb-6">
                                <div className="card-title">
                                    <h1 style={{ color: 'green' }}>
                                        Payment`${payment}`
                                    </h1>
                                </div>
                                <div style={mystyle}>
                                    <Input
                                        root='color:"red"'
                                        style={{
                                            flex: 0.6,
                                            textAlign: 'right',
                                        }}
                                        defaultValue={total}
                                        value={payment}
                                        onChange={(e) =>
                                            setPayment(e.target.value)
                                        }
                                    ></Input>{' '}
                                    <h1 style={{ flex: 1 }}>
                                        ,00 / {total},00 DA
                                    </h1>
                                    <h2 style={{ flex: 1, color: 'red' }}>
                                        {parseInt(total) - parseInt(payment) >
                                        0 ? (
                                            <div>
                                                Credit:
                                                {parseInt(total) -
                                                    parseInt(payment)}
                                                ,00 DA
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </h2>
                                    <div
                                        style={{ flex: 1, alignItems: 'right' }}
                                    >
                                        <Button
                                            className="pt-2"
                                            color="secondary"
                                            variant="contained"
                                            onClick={handleSubmit}
                                        >
                                            <Icon>shopping_cart</Icon>
                                            <span className="pl-1 capitalize">
                                                Confirmer l'achat
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                            <div>
                                <Dialog
                                    open={open}
                                    onClose={()=>setOpen(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Confirmer l'achat?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <h1>client:{clients?.filter(e=>e.id==op.client_id)[0]?.name}</h1>
                                            <h1>achat:{rows.map(e=><h4>-{e.brand_name} ___  :prix_final:{e.prix_final},00DA ___  quantity:{e.quantity}</h4>)}</h1>
                                            <h1>total:{total}</h1>
                                            <h1>payment:{payment}</h1>
                                            <h1>credit:{total-payment}</h1>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={()=>setOpen(false)}
                                            color="primary"
                                        >
                                            Disagree
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            color="primary"
                                            autoFocus
                                        >
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </>
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card >
                       
                            <DoughnutChart
                                height="300px"
                                color={[
                                    theme.palette.primary.dark,
                                    theme.palette.primary.main,
                                    theme.palette.primary.light,
                                ]}
                            />
                        </Card>

                        <div>
                            <DigitalNumber
                                nums={total + '.00'} // nums is the number your wanna show (defualt '123'
                                color="#000" // the active line color of number
                                unActiveColor="#F17D13" // the unactive line color of number
                                backgroundColor="#F17D13" // digital number container's background color
                                transform
                                transition="2s"
                            />
                        </div>

                        <Campaigns />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    clients: state.clients.clients,
    loading: state.clients.loading,
    hasErrors: state.clients.hasErrors,
    brands: state.stocks.brands,
    stocks: state.stocks.stocks,
})

export default connect(mapStateToProps)(Operation)
