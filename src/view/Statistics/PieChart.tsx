import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
const echarts = require('echarts')

const Chart = styled.div`
  height: 400px;
`

const PieChart: React.FC = (props) => {

  const chartRef = useRef(null)

  useEffect(() => {

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
          ]
        }
      ]
    };
    const chart = echarts.init(chartRef.current)
    chart.setOption(option)
  })

  return (
    <div >
      <div><span>共支出</span><span>￥22327</span>
      <span>共15条支出目录</span></div>
      <Chart ref={chartRef} />
    </div>
  )
}

export {PieChart}