import Layout from 'components/Layout';
import { useRecords } from 'hooks/useRecords';
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

const defaultFormData = {
  tagIds: [] as number[],
  note: '',
  category: '-' as Category,
  amount: 0
}

const Money = () => {
  const [selected, setSelected] = useState({
    tagIds: [] as number[],
    note: '',
    category: '-' as Category,
    amount: 0
  })
  const {addRecord} = useRecords()
  type Selected = typeof selected
  const onChange = (obj: Partial<Selected>) => {
    setSelected({
      ...selected,
      ...obj
    })
  }

  const submit = () => {
    if(addRecord(selected)) {
      alert('保存成功')
      setSelected(defaultFormData)
    }
  }

  return (
    <MoneyLayout scrollTop={9999}>
      <CategorySection
        value={selected.category}
        onChange={category => onChange({category})}/>
      <TagsSection
        value={selected.tagIds}
        onChange={tagIds => onChange({tagIds})}/>
      <NoteSection
        value={selected.note}
        onChange={note => onChange({note})}/>
      <NumberPadSection
        value={selected.amount}
        onChange={amount => onChange({amount})}
        onOk={submit} />
    </MoneyLayout>
  )
}

export default Money;