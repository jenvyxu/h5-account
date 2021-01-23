import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {getOverviewRecordList, RecordItem, RecordList} from '../../redux/reducers/recordSlice';
import {Decimal} from 'decimal.js';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';

const echarts = require('echarts')
const Wrapper = styled.div``
const ChartWrapper = styled.div`
  position: relative;
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
const Overview: React.FC = () => {
  // 每次获取多少天的数据
  const count = 7
  const [current] = useState(new Date())
  // 当前时间戳，用来生成同样的日期对象，作复制用
  const timestamp = current.toISOString()
  // 当前索引位置，0表示今天
  const [index, setIndex] = useState(0)
  // x轴数据
  const [xAxisData, setXaxisData] = useState<string[]>(['', '', '', '', '', '', ''])
  // y轴数据
  const [totalIncomeList, setTotalIncomeList] = useState<number[]>([])
  const [totalCostList, setTotalCostList] = useState<number[]>([])

  // 获取overviewRecordList
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.record.loading)
  const overviewRecordList = useSelector((state: RootState) => state.record.overviewRecordList)
  const chartRef = useRef(null)
  useEffect(() => {
    dispatch(getOverviewRecordList({timestamp, day: count - 1}))
  }, [])
  // loading改变重新渲染图表
  useEffect(() => {
    const chart = echarts.init(chartRef.current)
    if(loading) {
      chart.showLoading()
    } else {
      const dateList = getDateList(overviewRecordList)
      getMonenyList(dateList, overviewRecordList)
      setXaxisData(dateList)
      initChart(chart)
      chart.hideLoading()
    }
  }, [loading])

  // 初始化图表
  const initChart = (chart: any) => {
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
        data: totalCostList,
        type: 'line'
      },
      {
        name: '收入',
        data: totalIncomeList,
        type: 'line'
      }]
    }
    chart.setOption(option)
  }

  // 获取x轴日期列表
  const getDateList = (list: RecordList) => {
    const currentCopy = new Date(current.toISOString())
    let dateList:Array<string> = []
    for (let i = 0; i < count; i++) {
      let key = currentCopy.toISOString().slice(5, 10) // 01-11
      dateList.unshift(key)
      const date = currentCopy.getDate()
      currentCopy.setDate(date - 1)
    }
    return dateList
  }
  // 获取y轴金钱列表
  const getMonenyList = (dateList: string[], list: RecordList) => {
    let dateObj:{[key: string]: {income: number[], cost: number[]}} = {}
    // 把每天的收入和支出分别加入两个不同的数组
    dateList.forEach((key) => {
      dateObj[key] = { income: [], cost: [] }
      list.forEach(({createAt, amount, category}:
        {createAt: string, amount: number, category: 'cost'|'income'}
        ) => {
        if(createAt.match(key)) {
          dateObj[key][category].push(amount)
        }
      })
    })
    // 计算每天收入和支出的总和
    let incomeList: number[] = []
    let costList: number[] = []

    for(let key in dateObj) {
      let totalIncome = dateObj[key].income.reduce((total, val) =>total.plus(val), new Decimal(0))
      let totalCost = dateObj[key].cost.reduce((total, val) =>total.plus(val), new Decimal(0))
      incomeList.push(totalIncome.toNumber())
      costList.push(totalCost.toNumber())
    }
    setTotalCostList(costList)
    setTotalIncomeList(incomeList)
  }
  // 获取前count天数据
  const getPrevData = () => {
    if(loading) return
    current.setDate(current.getDate() - count)
    setIndex(index - 1)
    dispatch(getOverviewRecordList({timestamp: current.toISOString(), day: count - 1}))
  }
  // 获取后count天数据
  const getNextData = () => {
    if(loading) return
    current.setDate(current.getDate() + count)
    setIndex(index + 1)
    dispatch(getOverviewRecordList({timestamp: current.toISOString(), day: count - 1}))
  }
  // 获取当前七天数据
  const getCurrentData = () => {
    if(loading) return
    current.setDate(current.getDate() - count * index)
    setIndex(0)
    dispatch(getOverviewRecordList({timestamp: current.toISOString(), day: count - 1}))
  }

  return (
    <Wrapper>
      <ChartWrapper ref={chartRef} />
      <ButtonWrapper>
        <button onClick={() => getPrevData()}>往前7天</button>
        <button onClick={() => getCurrentData()}>现在</button>
        <button onClick={() => getNextData()}>往后7天</button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export {Overview}