import Layout from 'components/Layout';
import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {Link, useLocation} from 'react-router-dom';
import { Header } from 'components/Header';

const TagsLayout = styled(Layout)`
  >a {
    position: absolute;
    bottom: 64px;
    right: 16px;
    display: inline-block;
    .icon {
      vertical-align: top;
      width: 48px;
      height: 48px;
      fill: #91cdc0;
    }
  }
`

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
      padding: 10px 16px 10px 0;
      >.icon {
        fill: #666;
      }
    }
  }
`
const Label = styled.span`
  display: flex;
  align-items: center;
  >.icon {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }
`

const Tags = () => {
  // const {tags} = useTags()
  const location= useLocation()
  console.log('location', location)
  return (
    <TagsLayout>
      <Header title="标签管理" />
      <TagList>
        {/* {tags.map(tag => <li key={tag.id}>
          <Link to={'/tags/' + tag.id}>
            <Label><Icon name={tag.icon} /><span>{tag.name}</span></Label>
            <Icon name="right"/>
          </Link>
        </li>)} */}
      </TagList>
      <Link to='tags/add'><Icon name="add" /></Link>
    </TagsLayout>
  )
}

export default Tags;