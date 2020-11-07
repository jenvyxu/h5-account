import Layout from 'components/Layout';
import React, {useState} from 'react';
import {CategorySection} from './Money/CategorySection';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
// import day from 'dayjs'

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
const Statistics = () => {
  const [category, setCategory] = useState<'+'|'-'>('-')
  const {records} = useRecords()
  const {getName} = useTags()

  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={value => setCategory(value)} />
      </CategoryWrapper>
      <div>{records.map(r => {
        return (
          <Item>
            <div className="tags">{ r.tagIds.map(id => <span>{getName(id)}</span>)}</div>
            {r.note && <div className="note">{r.note}</div>}
            <div className="amount">
              <span>￥</span>{r.amount}
            </div>
            {/*{day(r.createAt).format('YYYY/MM/DD')}*/}
          </Item>
        )
      })}</div>
    </Layout>
  )
}

export default Statistics;