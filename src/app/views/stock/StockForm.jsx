import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {  Icon, Grid, Fab } from '@material-ui/core'

import 'date-fns'
import { connect } from 'react-redux'
import { postBrand, postCategory } from 'app/redux/actions/StockActions'

const StockForm = ({ dispatch, form, c, selectedCategory }) => {
    const [state, setState] = useState({ name: '' })
    const handleSubmit = (event) => {
        c == 0
            ? dispatch(postCategory({ name: name }))
            : dispatch(postBrand({ name: name, category_id: selectedCategory }))
        setState({ name: '' })
    }
    const mystyle = {
        display: 'flex',
        align_items: 'stretch',
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const { name } = state

    return (<div>
            
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={9} md={6} sm={12} xs={12}>
                        <div style={mystyle}>
                            <TextValidator
                                className="mb-4 w-full"
                                label={form}
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
                            />

                            <Fab
                                style={{ align: 'right' }}
                                size="small"
                                color="primary"
                                aria-label="add"
                                type="submit"
                            >
                                <Icon>add_circle</Icon>
                            </Fab>
                        </div>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </div>
    )
}
const mapStateToProps = (state) => ({
    selectedCategory: state.stocks.selectedCategory,
    categories: state.stocks.categories,
    brands: state.stocks.brands,
    stocks: state.stocks.stocks,
    loading: state.stocks.loading,
    hasErrors: state.stocks.hasErrors,
    success: state.stocks.success,
    selectedBrand: state.stocks.selectedBrand,
    selectedStock: state.stocks.selectedStock,
})
export default connect(mapStateToProps)(StockForm)
