import React, { useState  } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Icon, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Switch, FormGroup, TextField } from '@material-ui/core'
import 'date-fns'
import { connect } from 'react-redux'
import CustomizedSnackbars from './CustomizedSnackbar'
import { addDip, addExp } from 'app/redux/actions/ExpansesDipositesActions'
import { Autocomplete } from '@material-ui/lab'

const SimpleForm = ({ dispatch, loading, clients, hasErrors }) => {
    const [state, setState] = useState({
        name: '',
        details: '',
        amount: '',
        date: '',
        type: 'E',
        cash:true,
        profit:true
    })

    const handleSubmit = (event) => {
        const tmp={...state}
        type=="E"?
        dispatch( addExp(tmp)):dispatch( addDip(tmp))
        setState({
            name: '',
            details: '',
            amount: '',
            date: '',
            type: 'E',
            cash:true,
            profit:true
        })

    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handlecash = (event) => {
        event.persist()
        setState({
            ...state,
            cash: !cash,
        })
    }
    const handleprofit = (event) => {
        event.persist()
        setState({
            ...state,
            profit: !profit,
        })
    }

    const { name, details, amount, date, type ,cash,profit} = state

    return (
        <div>
            <CustomizedSnackbars />
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={10} md={10} sm={12} xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Diposite(+) or Expances(-)</FormLabel>
                            <RadioGroup
                                aria-label="type"
                                name="type"
                                value={type}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="E"
                                    control={<Radio />}
                                    label="Expance -"
                                />
                                <FormControlLabel
                                    value="D"
                                    control={<Radio />}
                                    label="Diposite +"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                        {type=="E"?<Autocomplete
                                    id="tags-standard"
                                    value={name || ''}

                                    onChange={(event, newValue) => {
                                        setState({...state,name:newValue})
                                    }}
                                    options={['khadam payment','masrouf soug','masrouf hanout','equipment','personal profit','other']}
                                    // defaultValue={[]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="name"
                                            placeholder=""
                                        />
                                    )}
                                />:
                        <TextValidator
                            className="mb-4 w-full"
                            label="name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 20',
                            ]}
                            errorMessages={['this field is required']}
                        />}
                    </Grid>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="details"
                            onChange={handleChange}
                            type="text"
                            name="details"
                            value={details || ''}
                            errorMessages={['this field is required']}
                        />
                    </Grid>

                    <Grid item lg={5} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="amount en DA"
                            onChange={handleChange}
                            type="number"
                            name="amount"
                            value={amount || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            <Icon>send</Icon>
                            {type=="E"? <span className="pl-1 capitalize">
                                Ajouter Expance  
                            </span>: <span className="pl-1 capitalize">
                                Ajouter Diposite  
                            </span>} 
                            
                        </Button>
                    </Grid>
                </Grid>
                <Grid item lg={5} md={6} sm={12} xs={12}>

                <FormGroup>
                            <FormControlLabel
                                control={<Switch 
                                    checked={cash}
                                    name="cash"
                                    onChange={handlecash}
                                     defaultChecked />}
                                label={type=="E"?"Substract - from cash":"add  + to cash"}  
                            />
                            <FormControlLabel
                                
                                control={<Switch  
                                    checked={profit}
                                    name="profit"
                                    
                                    onChange={handleprofit}
                                    defaultChecked/>}
                                label={type=="E"?"Substract - from profit":"add  + to profit"}                               
                                
                            />
                        </FormGroup>
                </Grid>

            </ValidatorForm>
        </div>
    )
}
const mapStateToProps = (state) => ({
    loading: state.expdip.loading,
    suc: state.expdip.clients,
    hasErrors: state.expdip.hasErrors,
})
export default connect(mapStateToProps)(SimpleForm)
