import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
} from '@material-ui/core'

import 'date-fns'
import { connect } from 'react-redux'
import { postFournisseur } from 'app/redux/actions/FournisseurActions'



const FournisseurForm = ({dispatch}) => {
    const [state, setState] = useState({username:'',mobile:''})


    const handleSubmit = (event) => {
        dispatch( postFournisseur({name:username,phone:mobile}))     
        setState({username:'',mobile:''})   
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

   
    const {
        username,
        mobile,
    
    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Username (Min length 4, Max length 20)"
                            onChange={handleChange}
                            type="text"
                            name="username"
                            value={username || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 20',
                            ]}
                            errorMessages={['this field is required']}
                        />
                    </Grid>

                       

                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Mobile Nubmer"
                            onChange={handleChange}
                            type="text"
                            name="mobile"
                            value={mobile || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        
                    </Grid>
                    <Grid item lg={3} md={4} sm={4} xs={12} >
                        <Button color="primary" variant="contained" type="submit" >
                        <Icon>send</Icon>
                        <span className="pl-1 capitalize">add Fournisseur</span>
                        </Button>
                    </Grid>


                </Grid>
                
            </ValidatorForm>
        </div>
    )
}
const mapStateToProps = (state) => ({
  })
export default connect(mapStateToProps)(FournisseurForm)


