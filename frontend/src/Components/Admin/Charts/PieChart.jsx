import React from 'react'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";


const PieChart = (props) => {
    const option = {
        color: [
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "#1158E2"
                },
                {
                    offset: 1,
                    color: "#42B5F2"
                }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "#E8A618",
                },
                {
                    offset: 1,
                    color: "#EB6B36",
                }
            ]),
        ],
        series: [
            {
                name: "Item",
                type: "pie",
                radius: ["60%", "80%"],
                avoidLabelOverlap: false,
                itemStyle : {
                    borderRadius: 20,
                },
                label: {
                    show: false,
                    position: "center"
                },
                emphasis : {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: "bold"
                    }
                },
                data: [
                    { value: props.razorpay, name: "RazorPay" },
                    { value: props.paypal, name: "PayPal" },
                ]
            }
        ]
    }

    return (
        <ReactECharts style={{ height: '100%', width:'100%' }} option={option} />
    )
}

export default PieChart