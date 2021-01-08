import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
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
  list: {name: string, icon: string, total: number, percent: string}[]
}

const PieChart: React.FC<Props> = (props) => {
  const {type, list} = props
  const chartRef = useRef(null)

  useEffect(() => {
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
          data: list.map((item: {name: string, total: number}) => ({
            name: item.name,
            value: item.total
          })),
        }
      ]
    };
    const chart = echarts.init(chartRef.current)
    chart.setOption(option)
  })

  return (
    <div >
      <Title>
        <span className="label">{type=== 'cost' ? '共支出' : '共收入'}</span>
        <span className="total">￥{102}</span>
        <span className="count">共{list.length}条{type==='cost'?'支出':'收入'}目录</span>
      </Title>
      <Chart ref={chartRef} />
      <ItemWrapper>
        {list.map((item, index) => (
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