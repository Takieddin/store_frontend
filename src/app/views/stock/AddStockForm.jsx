import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Grid,
    Select,
    MenuItem,
    Switch,
    FormGroup,
    FormControlLabel,
} from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import { connect } from 'react-redux'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { fetchFou } from 'app/redux/actions/FournisseurActions'
import { postStock } from 'app/redux/actions/StockActions'

const AddStockForm = ({
    dispatch,
    fournisseurs,
    selectedBrand,
}) => {
    useEffect(() => {
        dispatch(fetchFou())
    }, [dispatch])
    const [state, setState] = useState({
        name: '',
        note: '',
        quantity: '',
        date: Date.now(),
        item_buying_price: '',
        item_sale_price: '',
        supplier: '',
        clearance: '',
    })
    const mystyle = {
        display: 'flex',
        align_items: 'stretch',
    }
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);

  const handleCheck1 = (event) => {
    event.persist()

    setChecked1(!checked1);
  };
  const handleCheck2 = (event) => {
    event.persist()

    setChecked2(!checked2);
  };

    const handleSubmit = (event) => {
        dispatch(postStock({ ...state, brand_id: selectedBrand,subcash:checked1,subprofit:checked2 }))
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
        if (
            event.target.name == 'quantity' ||
            event.target.name == 'item_buying_price'
        ) {
            event.persist()

            setState({
                ...state,
                [event.target.name]: event.target.value,

                clearance: null,
            })
        }
    }

    const {
        name,
        note,
        quantity,
        date,
        item_buying_price,
        item_sale_price,
        supplier,
        clearance,
    } = state
    const [selectedDate, setSelectedDate] = React.useState(
        new Date('2014-08-18T21:11:54')
    )

    const handleDateChange = (date) => {
        setState({
            ...state,
            date: date,
        })
    }

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Note"
                            onChange={handleChange}
                            type="text"
                            name="note"
                            value={note || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextValidator
                            className="mb-4 w-full"
                            label="quantity"
                            onChange={handleChange}
                            type="number"
                            name="quantity"
                            value={quantity || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <div style={mystyle}>
                            <div style={{ flex: 0.8 }}>
                                <TextValidator
                                    inputStyle={{ alignContent: 'right' }}
                                    className="mb-4 w-full"
                                    label="prix d'achat"
                                    onChange={handleChange}
                                    type="number"
                                    name="item_buying_price"
                                    value={item_buying_price || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </div>

                            {/* <div style={{ flex: 0.2,verticalAlign:'bottom' }}><h3>,00 DA </h3></div>*/}
                        </div>
                        <TextValidator
                            className="mb-4 w-full"
                            label="prix de vente"
                            onChange={handleChange}
                            type="number"
                            name="item_sale_price"
                            value={item_sale_price || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch 
                                    checked={checked1}
                                    onChange={handleCheck1}
                                     defaultChecked />}
                                label="Substract from cash(coffre)"
                            />
                            <FormControlLabel
                                
                                control={<Switch  
                                    checked={checked2}
                                    onChange={handleCheck2}
                                    defaultChecked/>}
                                label="Substract from profit"                                
                                
                            />
                        </FormGroup>
                        <div style={mystyle}>
                            Fournisseur:
                            <Select
                                style={{ flex: 1 }}
                                labelId="demo-simple-select-label"
                                name="supplier"
                                value={supplier}
                                label="supplier"
                                onChange={handleChange}
                            >
                                {fournisseurs.map((e) => (
                                    <MenuItem value={e.id}>
                                        {e.name} {e.paied},00/{e.total},00 DA
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        {supplier ? (
                            <TextValidator
                                className="mb-4 w-full"
                                label="Total a paye"
                                onChange={handleChange}
                                type="number"
                                name="clearance"
                                value={
                                    clearance || quantity * item_buying_price
                                }
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        ) : (
                            ''
                        )}
                    </Grid>
                </Grid>
                <div style={{ float: 'right', padding: 2 }}>
                    <Button
                        color="primary"
                        autoFocus
                        type="submit"
                        variant="outlined"
                    >
                        Ajouter Stock
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    )
}

const mapStateToProps = (state) => ({
    fournisseurs: state.fournisseurs.fournisseurs,

    loading: state.clients.loading,
    clients: state.clients.clients,
    hasErrors: state.clients.hasErrors,
    selectedBrand: state.stocks.selectedBrand,
})
export default connect(mapStateToProps)(AddStockForm)
