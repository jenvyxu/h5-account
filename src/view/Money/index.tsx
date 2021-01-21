import Layout from 'components/Layout';
import { useRecords } from 'hooks/useRecords';
import React, {useState} from 'react';
import styled from 'styled-components';
import CategorySection from './CategorySection';
import {NoteSection} from './NoteSection';
import {NumberPadSection} from './NumberPadSection';
import {TagsSection} from './TagsSection';
import {Header} from '../../components/Header';
import {useSelector} from 'react-redux';
import {Category} from '../../redux/types/categoryTypes';
import {RootState} from '../../redux/store';
import message from '../../lib/message';
import {Tag} from '../../redux/types/tagTypes'

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
type FormData = {
  tagId: number,
  note: string,
  category: Category,
  amount: number
}

const initialFormData: FormData = {
  tagId: 0,
  note: '',
  category: 'cost',
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

  const {addRecord} = useRecords()
  type Selected = typeof formData

  const onChange = (obj: Partial<Selected>) => {
    setFormData({
      ...formData,
      ...obj
    })
  }
  // 保存记账信息
  const saveRecord = async (): Promise<any> => {
    const res = await addRecord({...formData, category})
    switch (res) {
      case 'requireMoney':
        message.warning('请输入金额')
        return Promise.reject()
      case 'requireTag':
        message.warning('请选择标签')
        return Promise.reject()
      case 'complete':
        message.warning('记账成功')
        setFormData(initialFormData);
        return Promise.resolve()
      default:
        return Promise.reject()
    }
  }

  return (
    <Layout>
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
