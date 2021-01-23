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
import {RootState} from '../../redux/store';
import message from '../../lib/message';

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
  amount: number
}
// 最小的tagId是0
const initialFormData: FormData = {
  tagId: -1,
  note: '',
  amount: 0
}

const Money: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData)
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
        message.success('记账成功')
        resetFormData()
        return Promise.resolve()
      default:
        return Promise.reject()
    }
  }
  // 重置表单数据
  const resetFormData = () => {
    console.log('reset')
    setFormData({...initialFormData, tagId: -1})
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
