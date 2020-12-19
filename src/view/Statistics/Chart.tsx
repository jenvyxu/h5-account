import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {createDateArray} from '../../lib/createDateArray';

const echarts = require('echarts')
const Wrapper = styled.div`
 
`

const ChartWrapper = styled.div`
  height: 400px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  >button {
    margin: 0 10px;  
  }
`

const createValueArr = () => Array(7).fill(0).map((val, index) => {
  return Math.ceil(Math.random()*100)
})

type Props = {
  data: {[key: string]: { income: number, cost: number }}
}

const Chart:React.FC<Props> = (props) => {
  const chartRef = useRef(null)
  const [dateIndex, setDateIndex] = useState(0)
  const [dataX, setDataX] = useState(createDateArray(0))

  const { data } = props
  const xAxisData:string[] = []
  const incomeData:number[] = []
  const costData:number[] = []
  for(let key in data) {
    xAxisData.push(key.slice(5))
    incomeData.push(data[key].income)
    costData.push(data[key].cost)
  }
  xAxisData.reverse()
  incomeData.reverse()
  costData.reverse()

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
        data: xAxisData,
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
        data: costData,
        type: 'line'
      },
      {
        name: '收入',
        data: incomeData,
        type: 'line'
      }]
    };
    myChart.setOption(option);
  })

  useEffect(() =>{
    const myChart = echarts.init(chartRef.current);
    myChart.setOption({
      xAxis: {
        data: xAxisData,
      },
    });

  }, [xAxisData])

  const goForward = () => {
    setDateIndex(dateIndex + 1)
    setDataX(createDateArray(dateIndex))
    console.log(1);
    console.log(dateIndex);
    console.log(createDateArray(dateIndex));
  }

  const goBack = () => {
    setDateIndex(dateIndex -1)
    setDataX(createDateArray(dateIndex))
  }

  const goCurrent = () => {
    setDateIndex(0)
    setDataX(createDateArray(dateIndex))
  }

  return (
    <Wrapper>
      <ChartWrapper ref={chartRef} />
      <ButtonWrapper>
        <button onClick={() => goForward()}>前进</button>
        <button onClick={() => goCurrent()}>现在</button>
        <button onClick={() => goBack()}>后退</button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export {Chart}