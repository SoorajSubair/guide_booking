import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import axios from '../../../Utils/axios'
import { getRevenue } from '../../../Utils/Urls'

const MainChart = () => {

    const[lable, setLable] = useState([])
    const [revenue, setRevenue] = useState([])
    const [range, setRange] = useState('daily');

    useEffect(()=>{
        const user_authTokens = JSON.parse(localStorage.getItem('authTokens'))
        const access = user_authTokens?.access
        const data = {range}
        axios.post(getRevenue, data, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
          })
            .then((response) => {
              setLable(response.data.lable)
              setRevenue(response.data.revenue)
              
            })
            .catch((error)=>{
              console.log(error.response.data)
            })
    },[range])

    const option = {
        color: ['#696CFF'],

        toolbox: {
            feature: {
                saveAsImage: {},
            }
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross"
            },
            backgroundColor: "rgba(0, 0, 0, 0.59)",
            borderWidth: 0,
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            show: false,
        },

        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: lable
            }
        ],
        yAxis: [
            {
                type: "value",
                splitLine: {
                    show: false,
                }
            }
        ],
        series: [
            {
                type: "line",
                smooth: true,
                lineStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(106, 107, 178)",
                        },
                        {
                            offset: 1,
                            color: "#696CFF"
                        }
                    ]),
                    width: 4
                },
                areaStyle: {
                    opacity: .5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
                        {
                            offset: 0,
                            color: "#696CFF"
                        },
                        {
                            offset: 1,
                            color: "rgba(106, 107, 178,0.1)"
                        }
                    ])
                },
                emphasis: {
                    focus: "series",
                },
                showSymbol: false,
                data: revenue
            }
        ]
    }

    return (
        <>
        <div className="main-chart-title">
            <span style={{textTransform:"capitalize"}}>{range} Revenue</span>
            <div className='main-chat-filter'>
            <select onChange={(e)=>{setRange(e.target.value)}}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthy</option>
            </select>
          </div>
          </div>
        <ReactECharts option={option}/>
        </>
    )
}

export default MainChart