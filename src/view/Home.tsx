import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import {Header} from '../components/Header';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {RecentRecord} from './RecentRecord';
import { useDispatch } from 'react-redux';
import {getRecordList} from '../redux/reducers/recordSlice';

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

const previewData = Array(7).fill(Array(5).fill({
  category: 'expense', //expense | income
  icon: 'bag',
  name: '购物',
  createAt: '12:19',
  amount: 123
}))

const Home: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecordList({day: 6, timestamp: new Date().toISOString()}))
  }, [])
  return (
    <Layout>
      <Header title="TODAY" />
      <Total>
        <span>今日支出</span>
        <span>￥4081</span>
        <span>收入￥1991</span>
      </Total>
      <RecordButton>
        <Link to='/money'>记一笔</Link>
      </RecordButton>
      <ShowRecordButton onClick={() =>setVisible(!visible)}>展示近七天账单
        <Icon name="up" className={visible?'down':'up'}/>
      </ShowRecordButton>
      { visible && <RecentRecord data={ previewData }/>}
    </Layout>
  )
}

export {Home}