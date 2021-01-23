import Layout from 'components/Layout';
import React, {useState} from 'react';
import styled from 'styled-components';
import day from 'dayjs'
import {Header} from '../../components/Header';
import Icon from '../../components/Icon';
import {Overview} from './Overview';
import {PieChart} from './PieChart';

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

type TabType = 'overview' | 'cost' | 'income'

const Statistics = () => {
  const [selected, setSelected] = useState<TabType>('overview')
  const [current, setCurrent] = useState(new Date())
  return (
    <Layout>
      <Header title={day(current).format('YYYY年MM月')} />
      <TabHeader>
        {tabs.map((tab) =>
          <li 
            onClick={() => {setSelected(tab.icon as TabType)}}
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
          <Overview /> :
          <PieChart current={current} type={selected} />
      }
    </Layout>
  )
}

export default Statistics;