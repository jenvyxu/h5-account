import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {useTags} from 'hooks/useTags';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Button} from 'components/Button';
import styled from 'styled-components';
import {Input} from 'components/Input';
import { Center } from 'components/Center';
import { Space } from 'components/Space';

const Header = styled.header`
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 20px 16px;
  background: #f8fbf5;
  justify-content: space-between;
  >span {
    font-size: 24px;
    font-weight: bold;
  }
  >button {
    background: #a0e0cf;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
  }
 `
const InputWrapper = styled.div`
  padding: 0 14px;
  background: #fff;
  margin-top: 8px;
  input {
    border-bottom: 1px solid #ccc;
  }
`

type Params = {
  id: string
}
const Tag = () => {
  const { id: idString } = useParams<Params>()
  const { findTag, updateTag, deleteTag } = useTags()
  const tag = findTag(parseInt(idString))
  const history = useHistory()

  const TagContent = (tag: {id: number, name: string}) => {
    return (
      <div>
        <InputWrapper>
          <Input label="标签名"
                 placeholder="标签名"
                 type="text"
                 value={tag.name}
                 onChange={(e) => {
                   updateTag(tag.id,{ name: e.target.value})
                 }}
          />
        </InputWrapper>
        <Center>
          <Space />
          <Space />
          <Space />
          <Button onClick={()=>onDelete(tag.id)}>删除标签</Button>
        </Center>
      </div>
    )
  }
  const onClickBack = () => {
    history.goBack()
  }
  const onDelete = (id:number) => {
    deleteTag(id)
    history.goBack()
  }
  return (
    <Layout>
      <Header>
        <span>编辑标签</span>
        <button onClick={onClickBack}>返回</button>
      </Header>
      {tag ? TagContent(tag) : <Center><span>标签不存在</span></Center>}
  </Layout>
  )
}

export {Tag}