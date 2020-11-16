import Layout from 'components/Layout';
import { useRecords } from 'hooks/useRecords';
import React, {useState} from 'react';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NoteSection} from './Money/NoteSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';
import {animated, useTransition} from 'react-spring';
import {Toast} from '../components/Toast';
import {Header} from '../components/Header';
import Icon from '../components/Icon';
import { useHistory } from 'react-router-dom';

const AnimatedToast = animated(Toast);

const MoneyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`

const HeaderSection = styled(Header)`
  .title {
    flex: 1;
    text-align: left;
    margin-left: 10px;
  }
  .left{
    display: flex;
    flex: 0;
  }
  .right {
    flex: 0 0 auto;
  }

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


  const [visible, setVisible] = useState(false)
  const transitions = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('tip')

  const {addRecord} = useRecords()
  type Selected = typeof selected
  const onChange = (obj: Partial<Selected>) => {
    setSelected({
      ...selected,
      ...obj
    })
  }

  const submit = () => {
    if(addRecord(selected) === 'requireMoney') {
      showTip('请输入金额', 'warn')
    } else if(addRecord(selected) === 'requireTag') {
      showTip('请选择标签', 'warn')
    } else if(addRecord(selected) === 'complete') {
      showTip('记账成功')
      setTimeout(() => {
        setVisible(false)
      }, 1000)
      setSelected(defaultFormData)
    }
  }

  const showTip = (msg:string, type='tip', duration=1000) => {
    setMsg(msg)
    setType(type)
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, duration)
  }

  const history = useHistory()
  return (
    <MoneyLayout scrollTop={9999}>
      {
        transitions.map(({ item, key, props }) =>
          item && <AnimatedToast
            message={msg}
            key={key}
            style={props}
            type={type} />)
      }
      <HeaderSection title="记一笔帐"
              left={<Icon name="back" onClick={history.goBack}/>}
              right={
                <CategorySection
                value={selected.category}
                onChange={category => onChange({category})}/>
              }/>
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