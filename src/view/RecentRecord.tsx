import Icon from 'components/Icon';
import React, {useMemo} from 'react';
import styled from 'styled-components';
import {RecordItem} from '../redux/reducers/recordSlice';
import dayjs from 'dayjs'
import Decimal from 'decimal.js';
import {RootState} from 'redux/store';
import {useSelector} from 'react-redux';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Record = styled.div`
  width: 100%;
  margin: 16px;
`
const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #adadad;   
  >div {    
    &:first-child {
      color: #9ecdc1;
    }
  >span {
    &:first-child {
      margin-right: 10px;
    }
  }   
}
`
const RecordContent = styled.ul`
  >li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafbf6;
    margin: 10px 0;
    padding: 8px;
    border-radius: 8px;
  }
`
const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
`
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  >span {
    color: #adadad;
    &:first-child {
    color: #333;
      font-size: 16px;
      font-weight: bold;
    }
  }
`
type Props = {
  list: Array<RecordItem>
}
type NewRecordItem = {
  tagId: number,
  amount: number,
  category: 'income'|'cost',
  icon: string,
  name: string,
  time: string
}

type FormatRecordObject = {
  [date: string]: Array<NewRecordItem>
}

type FormatRecordList = {
  date: string,
  list: Array<NewRecordItem>
}[]

const RecentRecord:React.FC<Props> = ({list}) => {
  const tagList = useSelector((state:RootState) => state.tagList)
  const formatList = useMemo(() => {
    let formatObj: FormatRecordObject = {}
    // 获取tag内容加入到record中
    list.forEach((item) => {
      const {tagId, category, amount, createAt } = item
      let matchedTag = {icon: '', name: ''}
      tagList.forEach(({name, id, icon}) => {
        if(tagId === id) matchedTag = {icon, name}
      })
      const date = createAt.slice(0, 10)
      const dateObj = dayjs(createAt)
      const newItem: NewRecordItem  = { 
        tagId, category, amount,
        time: dateObj.format('HH:MM'),
         ...matchedTag }
      if (date in formatObj) {
        formatObj[date].unshift(newItem)
      } else {
        formatObj[date] = [newItem]
      }
    })
    // 组合date和新的recordItem列表
    let formatList: FormatRecordList = []
    for(let key in formatObj) {
      formatList.push({date: dayjs(key).format('MM月DD日'), list: formatObj[key]})
    }
    return formatList
  }, list)

  return (
    <Wrapper>
      {formatList.map((item,index) => (
        <Record key={index}>
          <RecordHeader>
            <div>{item.date}</div>
            <div>
              <span>
                支出￥{item.list.reduce((total, item) => item.category === 'cost' ? total.plus(item.amount) : total, new Decimal(0)).valueOf()}
              </span>
              <span>
                收入￥{item.list.reduce((total, item) => item.category === 'income' ? total.plus(item.amount) : total, new Decimal(0)).valueOf()}
              </span>
            </div>
          </RecordHeader>
          <RecordContent>
            {
              item.list.map((record, index) => (
                <li key={index}>
                  <ItemIcon><Icon name={record.icon}/>{record.name}</ItemIcon>
                  <ItemContent>
                    <span>{record.category === 'income' ? '' : '-'}￥{record.amount}</span>
                    <span>{record.time}</span>
                  </ItemContent>
                </li>
              ))
            }
          </RecordContent>
        </Record>
      ))}
    </Wrapper>
  )
}

export {RecentRecord}