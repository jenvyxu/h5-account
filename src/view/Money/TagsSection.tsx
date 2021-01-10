import styled from 'styled-components';
import React, {useEffect} from 'react';
import {useTags} from 'hooks/useTags';
import Icon from 'components/Icon';
import {Link} from 'react-router-dom';
import type {TagList} from '../../redux/reducers/tagList'

const Wrapper = styled.section`
  flex-grow: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f9faf5;
  padding: 4px 16px 12px 16px;
  >ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    >li {
      width: calc(20% - 8px);
      margin: 4px 4px 0 4px;
      padding: 4px 8px;
      border: 2px solid transparent;
      border-radius: 8px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      text-align: center;
      >.icon {
        width: 40px;
        height: 40px;
      }
      >a{
        >.icon {
          width: 40px;
          height: 40px;
          fill: #f2c841;
        }
      }
      &.selected {
        background: #a0ded1;
        border: 2px solid #95c8be;
      }
      &:last-child {
        margin-right: auto;
      }
    }
  }
  >button {
    border: none;
    background: none;
    padding: 2px 4px;
    border-bottom: 1px solid #333;
    color: #666;
    outline: none;
    margin-top: 8px;
    justify-self: flex-end;
  }
`
type Props = {
  value: number;
  category: 'income' | 'cost';
  onChange: (selected: number) => void;
  tagList: TagList
}

const TagsSection: React.FC<Props> = ({value, category, onChange, tagList}) => {
  // const {tags} = useTags()
  const getClass = (tagId: number) => value === tagId ? 'selected' : ''
  const onToggleTag = (tagId: number) => {
    if(value === tagId) {
      onChange(-1)
    } else {
      onChange(tagId)
    }
  }
  
  return (
    <Wrapper>
      <ol>
        {tagList.filter(tag => tag.category === category).map(tag =>
          <li key={tag.id}
              onClick={()=> {onToggleTag(tag.id)}}
              className={getClass(tag.id)}>
            <Icon name={tag.icon}/><span>{tag.name}</span></li>
        )}
        <li>
          <Link to={{
            pathname: '/tags/add',
            state: category || 'cost'
          }}>
          <Icon name="add"/></Link>
        </li>
      </ol>
    </Wrapper>
  )
}

export { TagsSection }