import React, { Fragment } from 'react'
import { Grid, Card } from '@material-ui/core'
import DoughnutChart from './shared/Doughnut'
import Campaigns from './shared/Campaigns'
import { useTheme } from '@material-ui/styles'
import DataTable from './shared/DataTable'
import SimpleForm from '../material-kit/forms/SimpleForm'
import FullWidthTabs from './FullWidthTabs'
import DataTableProcesses from './shared/DataTableProcesses'
const Clients = ({ dispatch, loading, clients, hasErrors }) => {
    const theme = useTheme()

    return (
        <Fragment>
                        <addPaymentSnackbar/>

            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3} xs={24}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <>
                            <Card className="px-6 py-4 mb-6">
                            <div className="card-title">Ajouter Client</div>
                            <SimpleForm />
                            </Card>

                            {/* Top Selling Products */}
                            <Card className="px-6 py-4 mb-6">
                                <div className="card-title">List Clients</div>
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
export default Clients

/*import React, {useEffect} from 'react'

import {fetchClients} from '../actions/clientsActions'
import {Client} from '../components/Client'

const ClientsPage = ({dispatch, loading, clients, hasErrors}) => {
  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  // Show loading, error, or success state
  const renderClients = () => {
    if (loading) return <p>Loading clients...</p>
    if (hasErrors) return <p>Unable to display clients.</p>
    return clients.map((client) => <Client key={client.id} client={client} />)
  }

  return (
    <section>
      <h1>Clients</h1>
      {renderClients()}
    </section>
  )
}

const mapStateToProps = (state) => ({
  loading: state.clients.loading,
  clients: state.clients.clients,
  hasErrors: state.clients.hasErrors,
})

export default connect(mapStateToProps)(ClientsPage)*/
