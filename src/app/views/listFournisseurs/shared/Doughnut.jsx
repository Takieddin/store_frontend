import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Card } from '@material-ui/core'
import img from '../../../../cloth/faltlay.jpg'


const DoughnutChart = ({ height, color = [] }) => {
    const useStyles = makeStyles(({ palette, ...theme }) => ({
        cardHolder: {
            background: `url(${img})`,
            backgroundSize:'100% auto',
            backgroundRepeat:'no-repeat'

        },
        card: {
            maxWidth: 800,
            borderRadius: 12,
            margin: '1rem',
            opacity:'0.8',
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }))
    const classes=useStyles()
    

    
    const theme = useTheme()

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'Traffic Rate',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: [
                    {
                        value: 65,
                        name: 'Google',
                    },
                    {
                        value: 20,
                        name: 'Facebook',
                    },
                    { value: 15, name: 'Others' },
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    return (
        <div style={{background: `url(${img})` ,backgroundSize:'100% auto',}}className={classes}>
        <ReactEcharts

            style={{ opacity:'0.1' }}
            option={{
                ...option,
                color: [...color],
            }}
        /></div>
    )

}

export default DoughnutChart
