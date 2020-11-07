import Layout from 'components/Layout';
import React, {ReactNode, useState} from 'react';
import {CategorySection} from './Money/CategorySection';
import styled from 'styled-components';
import {RecordItem, useRecords} from 'hooks/useRecords';
import {useTags} from 'hooks/useTags';
import day from 'dayjs'

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
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;

`

const Statistics = () => {
  const [category, setCategory] = useState<'+'|'-'>('-')
  const {records} = useRecords()
  const {getName} = useTags()
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

  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={value => setCategory(value)} />
      </CategoryWrapper>
      {
        array.map(([date, record]) => (
          <div>
            <Header>{date}</Header>
            <div>{
              record.map(r => {
                return (
                  <Item key={r.createAt}>
                    <div className="tags">
                      {
                        r.tagIds.map(id => <span key={r.createAt}>{getName(id)}</span>)
                          .reduce((result,span,index,array) => {
                            return result.concat(index < array.length - 1 ? [span, '，']: [span])
                          }, [] as ReactNode[])
                      }
                    </div>
                    {r.note && <div className="note">{r.note}</div>}
                    <div className="amount">
                      <span>￥</span>{r.amount}
                    </div>
                  </Item>)
            })}</div>
          </div>))}
    </Layout>
  )
}

export default Statistics;