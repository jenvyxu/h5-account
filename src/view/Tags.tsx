import Layout from 'components/Layout';
import React from 'react';
import {useTags} from 'hooks/useTags';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {Link} from 'react-router-dom';

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

const Header = styled.header`
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  background: #f8fbf5;
  >span {
    font-size: 24px;
    font-weight: bold;
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
  >span {
  
  }

`

const Tags = () => {
  const {tags} = useTags()
  return (
    <TagsLayout>
      <Header><span>标签管理</span></Header>
      <TagList>
        {tags.map(tag => <li key={tag.id}>
          <Link to={'/tags/' + tag.id}>
            <Label><Icon name={tag.icon} /><span>{tag.name}</span></Label>
            <Icon name="right"/>
          </Link>
        </li>)}
      </TagList>
      <Link to='tags/add'><Icon name="add" /></Link>
    </TagsLayout>
  )
}

export default Tags;