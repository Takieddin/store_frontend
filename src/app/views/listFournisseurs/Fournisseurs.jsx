import React, { Fragment, useEffect } from 'react'
import { Grid, Card } from '@material-ui/core'
import DoughnutChart from './shared/Doughnut'
import UpgradeCard from './shared/UpgradeCard'
import Campaigns from './shared/Campaigns'
import { useTheme } from '@material-ui/styles'
import DataTable from './shared/DataTable'
import FullWidthTabs from './FullWidthTabs'
import DataTableProcesses from './shared/DataTableProcesses'
import FournisseurForm from './FournisseurForm'
const Fournisseurs = ({ dispatch, loading, fournisseurs, hasErrors }) => {
    const theme = useTheme()

    return (
        <Fragment>
                        <addPaymentSnackbar/>

            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3} xs={24}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <>
                            <Card className="px-6 py-4 mb-6">
                            <div className="card-title">Ajouter Fournisseur</div>
                            <FournisseurForm />
                            </Card>

                            {/* Top Selling Products */}
                            <Card className="px-6 py-4 mb-6">
                                <div className="card-title">List Fournisseurs</div>
                                <DataTable />
                            </Card>
                            <Card className="px-6 py-4 mb-6 bg-light-green">
                                <div className="card-title">List Processes</div>
                                <DataTableProcesses />
                            </Card>
                            <Card className="px-6 py-4 mb-6 ">
                                <FullWidthTabs />
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
export default Fournisseurs

/*import React, {useEffect} from 'react'

import {fetchFournisseurs} from '../actions/fournisseursActions'
import {Fournisseur} from '../components/Fournisseur'

const FournisseursPage = ({dispatch, loading, fournisseurs, hasErrors}) => {
  useEffect(() => {
    dispatch(fetchFournisseurs())
  }, [dispatch])

  // Show loading, error, or success state
  const renderFournisseurs = () => {
    if (loading) return <p>Loading fournisseurs...</p>
    if (hasErrors) return <p>Unable to display fournisseurs.</p>
    return fournisseurs.map((fournisseur) => <Fournisseur key={fournisseur.id} fournisseur={fournisseur} />)
  }

  return (
    <section>
      <h1>Fournisseurs</h1>
      {renderFournisseurs()}
    </section>
  )
}

const mapStateToProps = (state) => ({
  loading: state.fournisseurs.loading,
  fournisseurs: state.fournisseurs.fournisseurs,
  hasErrors: state.fournisseurs.hasErrors,
})

export default connect(mapStateToProps)(FournisseursPage)*/
