import Layout from 'components/Layout';
import React, {useState} from 'react';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NoteSection} from './Money/NoteSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';

const MoneyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`
type Category = '-' | '+'

const Money = () => {
  const [selected, setSelected] = useState({
    tags: [] as string[],
    note: '',
    category: '-' as Category,
    amount: 0
  })
  return (
    <MoneyLayout>
      <TagsSection value={selected.tags}
                   onChange={(tags)=>{
                     setSelected({
                       ...selected,
                       tags
                     })
                   }}/>
      <NoteSection value={selected.note}
                   onChange={(note) => {
                     setSelected({
                       ...selected,
                       note
                     })
                   }}/>
      <CategorySection value={selected.category}
                       onChange={(category) => {
                         setSelected({
                           ...selected,
                           category
                         })
                       }}/>
      <NumberPadSection value={selected.amount}
                        onChange={(amount) => {
                          setSelected({
                            ...selected,
                            amount
                          })
                        }}
                        onOk={() => {console.log('ok');}}/>
    </MoneyLayout>
  )
}

export default Money;