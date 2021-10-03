import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Card, Fab, Icon, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core'
import DoughnutChart from './shared/Doughnut'
import UpgradeCard from './shared/UpgradeCard'
import Campaigns from './shared/Campaigns'
import { useTheme } from '@material-ui/styles'
import DataTable from './shared/DataTable'
import StockForm from './StockForm'
import FullWidthTabs from './FullWidthTabs'
import StockSnackbar from './StockSnackbar'
import { connect } from 'react-redux'
import AddStockForm from './AddStockForm'
import DataTableStocks from './shared/DataTableStocks'
const Stock = ({ dispatch, selectedCategory, selectedBrand, categories,brands }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const mystyle = {
        display: 'flex',
        align_items: 'stretch',
    }

    return (
        <Fragment>
            <StockSnackbar />

            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3} xs={24}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <>
                        

                            {/* Top Selling Products */}
                            <Card className="px-6 py-4 mb-6">
                                <div style={mystyle}>
                                    <div>
                                        <DataTable head="Category" c="0" />
                                        <StockForm c="0" form="add category" />
                                    </div>
                                    <div>
                                        <DataTable head="Mark (model)" c="1" />
                                        <StockForm c="1" form="add Mark" />
                                    </div>
                                    <div>
                                        <DataTable head="Stock" c="2" />{' '}
                               
                                           
                                        { selectedBrand&&selectedCategory?<div  style={{alignItems:'center', display: 'flex',}}>  <Button
                                            className="pt-2"
                                            color="secondary"
                                            variant="contained"
                                            onClick={()=>setOpen(true)}
                                        >
                                            <Icon>shopping_cart</Icon>
                                            <span className="pl-1 capitalize">
                                                Add Stock to {categories?.find(e=>e.id==selectedCategory)?.name}:{brands?.find(e=>e.id==selectedBrand)?.name}
                                                </span>
                                        </Button></div>:""}
                                    </div>
                                    <div>
                                        <Dialog
                                            open={open}
                                            onClose={() => setOpen(false)}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Ajouter  un stock?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                       ********************************************************************
                                                       ******************************************************************** 
                                                       ********************************************************************                
                                                   
                                                </DialogContentText>
                                                <AddStockForm></AddStockForm>

                                            </DialogContent>
                                           
                                        </Dialog>
                                    </div>
                                </div>
                            </Card>
                            <Card className="px-6 py-4 mb-6 bg-light-green">
                                <div className="card-title">List Stocks</div>
                                <DataTableStocks/>
                            </Card>
                           
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


                        <Campaigns />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    categories: state.stocks.categories,
    brands: state.stocks.brands,
    stocks: state.stocks.stocks,
    selectedCategory: state.stocks.selectedCategory,
    selectedBrand: state.stocks.selectedBrand,
    selectedStock: state.stocks.selectedStock,
  })
export default connect(mapStateToProps)(Stock)