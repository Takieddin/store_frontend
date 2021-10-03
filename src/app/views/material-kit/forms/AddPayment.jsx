import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
   
} from '@material-ui/core'

import 'date-fns'
import { addClient } from 'app/redux/actions/ClientActions'
import { connect } from 'react-redux'
import { addPayment } from 'app/redux/actions/PaymentActions'
import addPaymentSnackbar from './addPaymentSnackbar'
import { fetchProcesses, SELECT_PROCESS } from 'app/redux/actions/ProcessActions'

const AddPayment = ({
    dispatch,
    suc,
    loading,
    hasErrors,
    selectedClient,
    selectedProcess,
}) => {
    const [state, setState] = useState({ amount: ''})

    const handleSubmit = (event) => {
        dispatch(addPayment({ amount: amount,date:null,client_id:selectedClient , process_id:selectedProcess }))
        setState({ amount: ''})
        dispatch({type:SELECT_PROCESS,payload:selectedProcess})

    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]:parseInt( event.target.value),
        })
    }

    const { amount } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>

                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="amount"
                            onChange={handleChange}
                            type="text"
                            name="amount"
                            value={amount}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            <Icon>queue</Icon>
                            <span className="pl-1 capitalize">Add payment</span>
                        </Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </div>
    )
}
const mapStateToProps = (state) => ({
    suc:state.payments.suc,
    loading: state.payments.loading,
    hasErrors: state.payments.hasErrors,
    selectedClient: state.clients.selected,
    selectedProcess: state.processes.selected,
})
export default connect(mapStateToProps)(AddPayment)
