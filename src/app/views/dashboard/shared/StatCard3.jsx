import React from 'react'
import { Grid, Card, IconButton, Icon } from '@material-ui/core'
import { connect } from 'react-redux'

const StatCard3 = ({cash,coffre,profit,monthprofit,monthsaleprofit,credit,profits,sale_profits,sale_profit}) => {
    /*
.
.
.bg-error
.bg-dark
.
.bg-light-greensubstring(1, 4)
.bg-light-error
.bg-light-primary*/
console.log("monthprofit")
const l=monthprofit
console.log(monthprofit[monthprofit.length-1]?.monthly)
console.log("cashc")
    const statList = [
        {
            icon: 'euro_symbol',
            amount: (cash||0 )+",00 DA",
            title: 'Current Cash',
            color :'bg-green'
        },
        {
            icon: 'euro_symbol',
            amount:  (coffre||0 )+",00 DA",
            title: 'Coffre',
            color :'bg-secondary'
            
        },
        {
            icon: 'euro_symbol',
            amount:  (cash-coffre||0 )+",00 DA",
            title: 'Caissse',
            color :'bg-light-dark'

        },
    
        {
            icon: 'euro_symbol',
            amount:  (profit||0 )+",00 DA",
            title: 'Total Net Profit',
            color :'bg-green'

        },
        {
            icon: 'euro_symbol',
            amount:   (sale_profit||0 )+",00 DA",
            title: 'Total Sales Profit',
            color :'bg-primary'

        },
        {
            icon: 'euro_symbol',
            amount:   (credit||0 )+",00 DA",
            title: 'Total Credits',
            color :'bg-error'

        },
        {
            icon: 'euro_symbol',
            amount:  (monthprofit[monthprofit.length-1]?.monthly||0 )+",00 DA",
            title: 'sales profit of :  '+monthprofit[monthprofit.length-1]?.month?.substring(0,7),
            color :'bg-secondary'

        },
        {
            icon: 'euro_symbol',
            amount:(monthsaleprofit[monthsaleprofit.length-1]?.monthly||0 )+",00 DA",
            title:  'net  profit of :  '+monthsaleprofit[monthsaleprofit.length-1]?.month?.substring(0,7),
            color :'bg-primary'

        },
    ]

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
                    <Grid key={item.title} item md={3} sm={6} xs={12}>
                        <Card elevation={3} className={"p-5 flex text-white "+`${item.color}`}>
                            <div>
                                <IconButton
                                    size="small"
                                    className="p-2 bg-light-gray"
                                >
                                    <Icon className="text-white">
                                        {item.icon}
                                    </Icon>
                                </IconButton>
                            </div>
                            <div className="ml-4">
                                <h3 className="mt-1 text-32">
                                    {item.amount.toLocaleString()}
                                </h3>
                                <p className="m-5 text-white">{item.title}</p>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cash: state.expdip.cash,
    coffre: state.expdip.coffre,
    profit: state.expdip.profit,
    monthprofit: state.expdip.monthprofit,
    monthsaleprofit: state.expdip.monthsaleprofit,
    credit: state.expdip.credit,
    profits: state.expdip.profits,
    sale_profits: state.expdip.sale_profits,
    sale_profit: state.expdip.sale_profit,
    
})
export default connect(mapStateToProps)(StatCard3)