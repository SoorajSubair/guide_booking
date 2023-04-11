import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
const MainChart = () => {

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
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
                data: [28000, 19000, 32000, 18000, 41000, 30000, 26000]
            }
        ]
    }

    return (
        <ReactECharts option={option}
        />
    )
}

export default MainChart