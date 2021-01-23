import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {RecordItem} from '../../redux/reducers/recordSlice';
import {getStatisticReacordList} from '../../redux/reducers/recordSlice'
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../redux/store'
import {Decimal} from 'decimal.js';

const echarts = require('echarts')

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #9dccc2;
  font-size: 14px;
  > .total {
    font-size: 28px;
    margin: 6px 0;
    font-weight: bold;
  }
  > .count {
    background: #f9faf5;
    padding: 6px 16px;
    color: #aaa;
    border-radius: 2px;
  }
`

const ItemWrapper = styled.ul`
  margin-bottom: 20px;
  .total {
    font-size: 12px;
    color: #aaa;
    margin-left: 4px;
  }

`

const BarWrapper = styled.div`
  flex: 1;
  font-size: 14px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const Item = styled.li`
  display: flex;
  padding: 16px;
  background: #f9faf5;

  > .icon{
    font-size: 36px;
  }
`

const Bar = styled.div`
  height: 10px;
  margin-top: 6px;
  > div{
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background: #9dccc2 ;
  }
`

const Chart = styled.div`
  height: 360px;
`

type Props = {
  type: 'cost' | 'income',
  current: Date,
}

const PieChart: React.FC<Props> = ({type, current}) => {
  // 获取当月的记账信息
  const timestamp = current.toISOString()
  const dispatch = useDispatch()
  const recordList = useSelector((state: RootState) => state.record.statisticReacordList)
  const tagList = useSelector((state: RootState) => state.tagList)
  const loading = useSelector((state: RootState) => state.record.loading)
  useEffect(() => {
    dispatch(getStatisticReacordList({month: 0, timestamp}))
  }, [])
  
  // 根据type类型刷选出支出列表还是收入列表
  const selectedRecordListByType = useMemo(() =>{
    return recordList.reduce(
      (newList, item) => 
        item.category === type ? 
        [...newList, item] : 
        newList,
      [] as RecordItem[])
  }, [type, recordList])

  // 当前分类的总金额
  const totalAmount = useMemo(() => {
    return selectedRecordListByType.reduce((t, item) => t.plus(item.amount), new Decimal(0)).toNumber()
  }, [type, recordList])
  
  // 合计每一种标签的收入和支出的总和
  const filterList = useMemo(() => {
    // 找出有哪些标签
    const tagIdList = selectedRecordListByType.reduce(
      (target, item) => target.indexOf(item.tagId) > -1 ? target : [...target, item.tagId],
       [] as Array<number>)
    // 对每一个标签的金额求和
    return tagIdList.map((id) => {
      // 找出id对应的标签信息
      const tagObj = tagList.reduce((target, item) => item.id === id ? item : target)
      // 求出每个标签的金额总和
      const total = selectedRecordListByType.reduce((target, item) => item.tagId === id ? target + item.amount : target, 0)
      // 一个标签下总额占分类总额的百分比
      const percent = (total * 100 / totalAmount).toFixed(2) + '%'
      return { ...tagObj, total, percent }
    })
  }, [type, recordList])

  // 绘制图表
  const chartRef = useRef(null)
  useEffect(() => {
    const chart = echarts.init(chartRef.current)
    if(loading) {
      chart.showLoading()
    } else {
      initChart(chart)
      chart.hideLoading()
    }
  })

  const initChart = (chart: any) => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      label: {
        show: true,
        position: 'outside'
      },
      series: [
        {
          type: 'pie',
          radius: ['25%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: filterList.map(({ total, name}) => ({
            name: name,
            value: total
          })),
        }
      ]
    }
    chart.setOption(option)
  }

  return (
    <div>
      <Title>
        <span className="label">{type === 'cost' ? '共支出' : '共收入'}</span>
        <span className="total">￥{totalAmount}</span>
        <span className="count">共{selectedRecordListByType.length}条{ type==='cost' ? '支出' : '收入' }目录</span>
      </Title>
      <Chart ref={chartRef} />
      <ItemWrapper>
        {filterList.map((item, index) => (
          <Item key={index}>
            <Icon name={item.icon} />
            <BarWrapper>
              <div>
                <span>{item.name}</span>
                <span className='total'>{type=== 'cost' ? '支出' : '收入'}{item.total}</span>
              </div>
              <Bar>
                <div style={{width: item.percent}}></div>
              </Bar>
            </BarWrapper>
            <NumberWrapper>{item.percent}</NumberWrapper>
          </Item>
        ))}
      </ItemWrapper>
    </div>
  )
}

export {PieChart}