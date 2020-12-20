import Layout from 'components/Layout';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {CategorySection} from './Money/CategorySection';
import styled from 'styled-components';
import {RecordItem, useRecords} from 'hooks/useRecords';
import {useTags} from 'hooks/useTags';
import day from 'dayjs'
import {Header} from '../components/Header';
import Icon from '../components/Icon';
import {Chart} from './Statistics/Chart';
import {PieChart} from './Statistics/PieChart';
import {httpGetStatistic} from '../http';

const CategoryWrapper = styled.div`
    background: #fff;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 20px;
  background: #fff;
  >.note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
`

const CategoryTab = styled.ul`
  display: flex;
  padding: 20px 16px;
  color: #a0cac6;
  >li {
    flex: 1;
    >div {
      display: inline-flex;
      align-items: center;
      position: relative;
      span {
        color: #aaa;
        font-size: 15px;
      }
      .icon {
        fill: #a0cac6;
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
       &::after {
        content: '';
        position: absolute;
        display: block;
        bottom: -6px;
        left: 2%;
        width: 0;
        height: 4px;
        border-radius: 2px;
        background: #a0cac6;
        transition: width 300ms;
      }
    }

    &.selected {
      transition: width 4s;
      flex: 1.6;
      >div{
        &::after {
          width: 96%;
        }       
      }
    }    
  }
`

const tabs = [
  {
    name: '概览',
    icon:'total'
  },
  {
    name: '支出分析',
    icon:'cost'
  },
  {
    name: '收入分析',
    icon:'piggy-bank'
  }
  ]

const Statistics = () => {
  const [category, setCategory] = useState<'income'|'expense'>('expense')
  const {records} = useRecords()
  const {getName} = useTags()
  const [selected, setSelected] = useState('total')
  const selectedRecords = records.filter(r => r.category === category)
  const hash: {[K: string ]: RecordItem[]} = {}
  selectedRecords.forEach(r => {
    const key = day(r.createAt).format('YYYY-MM-DD')
    if(!(key in hash)) {
      hash[key] = []
    }
    hash[key].push(r)
  })

  const array = Object.entries(hash).sort((a, b)=> {
    if(a[0] > b[0]) return -1
    if(a[0] < b[0]) return 1
    if(a[0] === b[0]) return 0
    return 0
  })

  const onTabChange = (e: React.MouseEvent) => {
    console.log(e);
  }

  const [chartData, setChartData] = useState<{[key: string]: { income: number, cost: number }}>({})
  // 获取图表数据

  const [current, setCurrent] = useState(new Date())
  const [count] = useState(7)

  useEffect(() => {
    getStatistic(count, current)
  }, [])

  const [loading, setLoading] = useState(false)
  const getStatistic = (count: number, current: Date) => {
    httpGetStatistic({ count, current: current.toISOString() })
      .then(({data})=> {
        let tempData:{[key: string]: { income: number, cost: number }} = {}
        // 创建一个新的Date对象, 防止修改current对象
        const currentDate = new Date(current.toISOString())
        // 初始化temData数据
        for(let i = 0; i < count; i++) {
          const date = currentDate.getDate()
          let key = currentDate.toISOString().slice(0, 10)
          tempData[key] = {income: 0, cost: 0}
          currentDate.setDate(date - 1)
        }
        // 填充tempData数据
        data.forEach((item:any) => {
          const key = item.createAt.slice(0, 10)
          if(item.category === 'income') {
            tempData[key]['income'] = item.amount
          } else if(item.category === 'cost'){
            tempData[key]['cost'] = item.amount
          } else {

          }
        })
        setChartData(tempData)
        setLoading(false)
      })
  }
  // 获取前七天数据
  const getPrevData = () => {
    if(loading) return
    current.setDate(current.getDate() - count)
    getStatistic(count, current)
  }
  // 获取后七天数据
  const getNextData = () => {
    if(loading) return
    current.setDate(current.getDate() + count)
    getStatistic(count, current)
  }
  // 解决setCurrent异步变化的问题
  useEffect(() => {
    getStatistic(count, current)
  }, [current])
  // 获取当前七天数据
  const getCurrentData = () => {
    if(loading) return
    setCurrent(new Date())
    // getStatistic(count, current)
  }

  return (
    <Layout>
      <Header title={current.toISOString().slice(0, 7)} />
      <CategoryTab onClick={(e) => onTabChange(e)}>
        {
          tabs.map((tab) =>
            <li onClick={() => {setSelected(tab.icon)}} key={tab.icon}
                className={selected === tab.icon ? 'selected' : ''}>
              <div>
                <Icon name={tab.icon}/>
                { selected === tab.icon && <span>{tab.name}</span>}
              </div>
            </li>
          )
        }
      </CategoryTab>
      <Chart data={chartData} prev={getPrevData} next={getNextData} current={getCurrentData} />
      {/*<div>*/}
      {/*  <span>本月共支出: ￥1000</span>*/}
      {/*  <span>本月共收入: $10980</span>*/}
      {/*</div>*/}
      {/*<PieChart />*/}
    </Layout>
  )
}

export default Statistics;