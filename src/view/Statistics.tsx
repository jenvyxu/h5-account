import Layout from 'components/Layout';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {RecordItem, useRecords} from 'hooks/useRecords';
import {useTags} from 'hooks/useTags';
import day from 'dayjs'
import {Header} from '../components/Header';
import Icon from '../components/Icon';
import {Chart} from './Statistics/Chart';
import {PieChart} from './Statistics/PieChart';
import {httpGetStatistic} from '../http';


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
    icon: 'income'
  }]

type TagList = { id: number; name: string; icon: string; category: "cost" | "income"; }[]

const Statistics = () => {
  const [category, setCategory] = useState<'income'|'expense'>('expense')
  const {records} = useRecords()
  const {getName, getTags} = useTags()
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

  const [chartData, setChartData] = useState<{[key: string]: { income: number, cost: number }}>({})
  // 获取图表数据
  const [current, setCurrent] = useState(new Date())
  const [count] = useState(7)

  const [incomeList, setIncomeList] = useState([])
  const [costList, setCostList] = useState([])

  useEffect(() => {
    getTotalaStatistic(count, current)
    getMonthlyIncomeStatistic('cost')
    getMonthlyIncomeStatistic('income')
  }, [])

  const [loading, setLoading] = useState(false)
  // 获取最近七天的统计数据
  const getTotalaStatistic = (count: number, current: Date) => {
    const currentDate = new Date(current.toISOString().slice(0, 10)) // new Date('2020-12-20')
    // 获取开始和结束时间
    let date = currentDate.getDate()
    currentDate.setDate(date + 1)
    const end = currentDate.toISOString()
    currentDate.setDate(date - count + 1)
    const start = currentDate.toISOString()

    httpGetStatistic({ start, end, type: 'total'})
      .then(({data})=> {
        if(!data) return
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
  // 获取月度支出统计
  const getMonthlyIncomeStatistic = (type: 'income'|'cost') => {
    const dateString = new Date().toISOString().slice(0, 7) // 2020-12
    const today = new Date(dateString)
    const start = today.toISOString()
    today.setMonth(today.getMonth() + 1)
    const end = today.toISOString()
    httpGetStatistic({start, end, type}).then(({data})=> {
      if(type === 'income') {
        setIncomeList(data)
      } else {
        setCostList(data)
      }
    })
  }

  // 获取前七天数据
  const getPrevData = () => {
    if(loading) return
    current.setDate(current.getDate() - count)
    getTotalaStatistic(count, current)
  }
  // 获取后七天数据
  const getNextData = () => {
    if(loading) return
    current.setDate(current.getDate() + count)
    getTotalaStatistic(count, current)
  }
  // 解决setCurrent异步变化的问题
  useEffect(() => {
    getTotalaStatistic(count, current)
  }, [current])
  // 获取当前七天数据
  const getCurrentData = () => {
    if(loading) return
    setCurrent(new Date())
  }
  // 对标签进行处理
  const tag = () => {

  }
  return (
    <Layout>
      <Header title={current.toISOString().slice(0, 7)} />
      <CategoryTab>
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
      {
        selected === 'total' ?
          <Chart data={chartData} prev={getPrevData} next={getNextData} current={getCurrentData} /> :
          <PieChart type={selected === 'cost' ? 'cost' : 'income'}
                    list={selected === 'cost' ? costList : incomeList} />
      }
    </Layout>
  )
}

export default Statistics;