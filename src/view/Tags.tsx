import Layout from '../components/Layout';
import React from 'react';
import {useTags} from '../useTags';
import styled from 'styled-components';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';

const TagList = styled.ol`
  font-size: 16px;
  background: #fff;
  >li {
    border-bottom: 1px solid #d5d5d9;
    line-height: 20px;
    margin-left: 16px;
    >a {
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 12px 0;
    }
  }
`
const Center = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Space = styled.div`
  height: 16px;
`

const Button = styled.button`
  font-size: 18px;
  border: none;
  padding: 8px 12px;
  background: #767676;
  color: #fff;
  border-radius: 4px;

`

const Tags = () => {
  const {tags, setTags} = useTags()
  return (
    <Layout>
      <TagList>
        {tags.map(tag => <li key={tag}>
          <Link to={'/tags/' + tag}>
            <span className="on-line">{tag}</span>
            <Icon name="arrow-right"/>
          </Link>
        </li>)}
      </TagList>
      <Center>
        <Space/>
        <Space/>
        <Button>新增标签</Button>
      </Center>

    </Layout>
  )
}

export default Tags;