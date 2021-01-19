import Layout from 'components/Layout';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {RecordItem, useRecords} from 'hooks/useRecords';
import day from 'dayjs'
import {Header} from '../../components/Header';
import Icon from '../../components/Icon';
import {Overview} from './Overview';
import {PieChart} from './PieChart';
// import {httpGetStatistic} from '../../http';

const TabHeader = styled.ul`
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
    icon:'overview'
  },
  {
    name: '支出分析',
    icon:'cost'
  },
  {
    name: '收入分析',
    icon: 'income'
  }]

const Statistics = () => {
  const [selected, setSelected] = useState('overview')
  const [current, setCurrent] = useState(new Date())



  // 获取月度支出统计
  // const getMonthlyIncomeStatistic = (type: 'income'|'cost') => {
  //   const dateString = new Date().toISOString().slice(0, 7) // 2020-12
  //   const today = new Date(dateString)
  //   const start = today.toISOString()
  //   today.setMonth(today.getMonth() + 1)
  //   const end = today.toISOString()
  //   httpGetStatistic({start, end, type}).then(({data})=> {
  //     if(type === 'income') {
  //       setIncomeList(data)
  //     } else {
  //       setCostList(data)
  //     }
  //   })
  // }

  return (
    <Layout>
      <Header title={day(current).format('YYYY年MM月')} />
      <TabHeader>
        {tabs.map((tab) =>
          <li 
            onClick={() => {setSelected(tab.icon)}}
            key={tab.icon}
            className={selected === tab.icon ? 'selected' : ''}
          >
            <div>
              <Icon name={tab.icon}/>
              { selected === tab.icon && <span>{tab.name}</span>}
            </div>
          </li>)}
      </TabHeader>
      {
        selected === 'overview' ?
          <Overview /> :<div />
          // <PieChart current={current} type={selected === 'cost' ? 'cost' : 'income'} />
      }
    </Layout>
  )
}

export default Statistics;