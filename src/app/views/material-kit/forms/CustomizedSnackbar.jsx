import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { CLOSE_SNACKBAR } from 'app/redux/actions/ClientActions'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyles1 = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))

function MySnackbarContentWrapper(props) {
    const classes = useStyles1()
    const { className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    )
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
        .isRequired,
}


const CustomizedSnackbars=({dispatch, loading, clients, hasErrors,ploading, psuc, phasErrors,}) =>{
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }

        dispatch({type:CLOSE_SNACKBAR})
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={(loading||hasErrors)||(psuc||phasErrors)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={phasErrors||hasErrors?'error':'success'}
                    message={phasErrors||hasErrors?phasErrors?'payment was not added':'Client was not added':psuc?'Payment added':"Client added"}
                />
            </Snackbar>
        </div>
    )
}
const mapStateToProps = (state) => ({
    loading: state.clients.loading,
    clients: state.clients.clients,
    hasErrors: state.clients.hasErrors,
    ploading: state.payments.loading,
    psuc: state.payments.suc,
    phasErrors: state.payments.hasErrors,
  })
export default connect(mapStateToProps)(CustomizedSnackbars)

