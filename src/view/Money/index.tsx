import Layout from 'components/Layout';
import { useRecords } from 'hooks/useRecords';
import React, {useState} from 'react';
import styled from 'styled-components';
import CategorySection from './CategorySection';
import {NoteSection} from './NoteSection';
import {NumberPadSection} from './NumberPadSection';
import {TagsSection} from './TagsSection';
import {animated, useTransition} from 'react-spring';
import {Toast} from '../../components/Toast';
import {Header} from '../../components/Header';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import type {Category} from '../../redux/types/categoryTypes';
import {RootState} from '../../redux/store'
const AnimatedToast = animated(Toast);

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
const initialFormData = {
  tagId: 0,
  note: '',
  category: 'cost' as Category,
  amount: 0
}

const Money: React.FC = () => {
  const [formData, setFormData] = useState({
    tagId: 0,
    note: '',
    amount: 0
  })
  const tagList = useSelector((state: RootState )=> state.tagList)
  const category = useSelector((state: RootState) => state.category)
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const transitions = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('tip')
  const {addRecord} = useRecords()
  type Selected = typeof formData

  const onChange = (obj: Partial<Selected>) => {
    setFormData({
      ...formData,
      ...obj
    })
  }
  // 保存记账信息
  const saveRecord = async () => {
    const res = await addRecord({...formData, category})
    switch (res) {
      case 'requireMoney':
        showTip('请输入金额', 'warn');
        break;
      case 'requireTag':
        showTip('请选择标签', 'warn');
        break;
      case 'complete':
        showTip('记账成功');
        setTimeout(() => {
          setVisible(false)
        }, 1000);
        setFormData(initialFormData);
        break;
      default:
        showTip('网络出错', 'warn')
        break;
    }
  }
  // 显示提示
  const showTip = (msg:string, type='tip', duration=1000) => {
    setMsg(msg)
    setType(type)
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, duration)
  }

  return (
    <Layout>
      {
        transitions.map(({ item, key, props }) =>
          item && <AnimatedToast
            message={msg}
            key={key}
            style={props}
            type={type} />)
      }
      <HeaderSection 
        title="记一笔帐"
        right={<CategorySection />}/>
      <TagsSection
        value={formData.tagId}
        category={category}
        tagList={tagList}
        onChange={tagId => onChange({tagId})}/>
      <NoteSection
        value={formData.note}
        onChange={note => onChange({note})}/>
      <NumberPadSection
        value={formData.amount}
        onChange={amount => onChange({amount})}
        saveRecord={saveRecord} />
    </Layout>
  )
}

export default Money;
