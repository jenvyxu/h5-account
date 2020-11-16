import Icon from 'components/Icon';
import React from 'react';
import styled from 'styled-components';

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
  data: [{
    category: 'expense' | 'income',
    icon: string,
    name: string,
    createAt: string,
    amount: number,
  }][]
}

const RecentRecord:React.FC<Props> = (props) => {
  return (
    <Wrapper>
      {props.data.map((item,index) => (
        <Record key={index}>
          <RecordHeader>
            <div>11月16</div>
            <div>
              <span>
                支出￥{item.reduce((t, v) => v.category === 'expense' ? v.amount + t : t, 0)}
              </span>
              <span>
                收入￥{item.reduce((t, v) => v.category === 'income' ? v.amount + t : t, 0)}
              </span>
            </div>
          </RecordHeader>
          <RecordContent>
            {
              item.map((data,index) => (
                <li key={index}>
                  <ItemIcon><Icon name="bag"/>{data.name}</ItemIcon>
                  <ItemContent>
                    <span>{data.category === 'income' ? '' : '-'}￥{data.amount}</span>
                    <span>{data.createAt}</span>
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