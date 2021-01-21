import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import {Header} from '../components/Header';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {RecentRecord} from './RecentRecord';
import { useDispatch, useSelector } from 'react-redux';
import {getRecordList} from '../redux/reducers/recordSlice';
import {RootState} from '../redux/store';
import {RecordItem} from '../redux/reducers/recordSlice';
import Decimal from 'decimal.js';

const Total = styled.div`
  color: #9ecdc1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 100px 0 40px 0;
  >span {
     &:nth-child(2) {
        font-size: 30px;
        font-weight: bold;
        margin: 4px 0;
     }
     &:nth-child(3) {
      color: #acacac;
     }
  }
`

const RecordButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  >a {
    font-size: 14px;
    padding: 8px 32px;
    background: #a1e0cf;
    border: 2px solid #9acdbc;
    border-radius: 8px;
    color: #333;
  }
`

const ShowRecordButton = styled.div`
  text-align: center;
  color: #adadad;
  .icon {
    vertical-align: bottom;
    width: 1.4em;
    height: 1.4em;
    fill: #adadad;
    transition: all 200ms;
    &.down {
      transform: rotate(180deg);
    }
  }
`
const Home: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const current = new Date()
  const timestamp = current.toISOString()
  const recordList = useSelector((state: RootState) => state.record)
  // 今天的记账信息
  const todayRecordList = useSelector<RootState>(({record})=> {
    const match = timestamp.slice(0, 10)
    return record.reduce((arr, item) => {
      if(item.createAt.includes(match)){
        arr.push(item)
      }
      return arr
    }, [] as Array<RecordItem>)
  })
  // 今天所有收入
  const todayTotalIncome = (todayRecordList as Array<RecordItem>).reduce((total, item) =>
    item.category === 'income' ? total.plus(item.amount) : total, new Decimal(0)).toNumber()
  // 今天总支出
  const todayTotalCost = (todayRecordList as Array<RecordItem>).reduce((total, item) =>
    item.category === 'cost' ? total.plus(item.amount) : total, new Decimal(0)).toNumber()
  // 获取最近三天的记账信息
  useEffect(() => {
    dispatch(getRecordList({day: 2, timestamp}))
  }, [])

  return (
    <Layout>
      <Header title="TODAY" />
      <Total>
        <span>今日支出</span>
        <span>￥{todayTotalCost}</span>
        <span>收入￥{todayTotalIncome}</span>
      </Total>
      <RecordButton>
        <Link to='/money'>记一笔</Link>
      </RecordButton>
      <ShowRecordButton onClick={() =>setVisible(!visible)}>展示近三天账单
        <Icon name="up" className={ visible ? 'down' : 'up' }/>
      </ShowRecordButton>
      { visible && <RecentRecord list={recordList}/>}
    </Layout>
  )
}

export {Home}