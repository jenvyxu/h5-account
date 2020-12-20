import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';

const echarts = require('echarts')

const Wrapper = styled.div`
`

const ChartWrapper = styled.div`
  height: 400px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  >button {
    margin: 0 6px;
    padding: 2px 6px;
    color: #a0cac6;
    border: 1px solid #a0cac6;
    border-radius: 4px;
    outline: none;
    background: #fff;
  }
`

type Props = {
  data: {[key: string]: { income: number, cost: number }},
  next: () => void,
  prev: () => void,
  current: () => void,
}

const Chart:React.FC<Props> = (props) => {
  const chartRef = useRef(null)
  const { data, next, prev, current } = props

  const chartData = useMemo(() =>{
    let xDataArr = []
    let incomeDataArr = []
    let costDataArray = []
      for(let key in data) {
        xDataArr.push(key.slice(5))
        incomeDataArr.push(data[key].income)
        costDataArray.push(data[key].cost)
      }
      return {
        xAxisData: xDataArr.reverse(),
        incomeData: incomeDataArr.reverse(),
        costData: costDataArray.reverse()
      }
  }, [data])

  useEffect(() =>{
    const myChart = echarts.init(chartRef.current);
    const option = {
      legend: {
        data: ['收入', '支出'],
        textStyle: {padding: [3, 4, 5, 6]}
      },
      tooltip: {
        show:true,
        alwaysShowContent: true,
      },
      xAxis: {
        name: '',
        type: 'category',
        data: chartData.xAxisData,
        axisLabel: {
          inside: false,
          rotate: 45
        }
      },
      yAxis: {
        name: '',
        type: 'value',
        axisLabel: {
          inside: false,
          rotate: 45
        }
      },
      series: [{
        name:'支出',
        data: chartData.costData,
        type: 'line'
      },
      {
        name: '收入',
        data: chartData.incomeData,
        type: 'line'
      }]
    };
    myChart.setOption(option);
  })

  useEffect(() =>{
    const myChart = echarts.init(chartRef.current);
    myChart.setOption({
      xAxis: {
        data: chartData.xAxisData,
      },
    });
  }, [chartData.xAxisData])

  return (
    <Wrapper>
      <ChartWrapper ref={chartRef} />
      <ButtonWrapper>
        <button onClick={() => prev()}>往前7天</button>
        <button onClick={() => current()}>现在</button>
        <button onClick={() => next()}>往后7天</button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export {Chart}