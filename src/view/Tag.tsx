import React from 'react';
import { useParams } from 'react-router-dom';
import {useTags} from 'useTags';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Button} from 'components/Button';
import styled from 'styled-components';
import {Input} from 'components/Input';
import { Center } from 'components/Center';
import { Space } from 'components/Space';

const Topbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 20px;
  padding: 14px;
  background: #fff;
 `
const InputWrapper = styled.div`
  padding: 0 14px;
  background: #fff;
  margin-top: 8px;
`

type Params = {
  id: string
}
const Tag = () => {
  const { id: idString } = useParams<Params>()
  const { findTag, updateTag } = useTags()
  const tag = findTag(parseInt(idString))
  return (
    <Layout>
      <Topbar>
        <Icon name="arrow-left" />
        <span>编辑标签</span>
        <Icon />
      </Topbar>
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
        <Button>删除标签</Button>
      </Center>
    </Layout>
  )
}

export {Tag}