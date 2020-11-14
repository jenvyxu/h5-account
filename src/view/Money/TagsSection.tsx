import styled from 'styled-components';
import React from 'react';
import {useTags} from 'hooks/useTags';
import Icon from '../../components/Icon';
import {Link} from 'react-router-dom';

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
      font-size: 12px;
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
  value: number[];
  onChange: (selected: number[]) => void;
}

const TagsSection: React.FC<Props> = (props) => {
  const {tags} = useTags()
  const selectedIds = props.value

  const onToggleTag = (tagId: number) => {
    const index = selectedIds.indexOf(tagId)
    // 新增或者移除某个标签
    if(index>=0) {
      props.onChange(selectedIds.filter(id => id!==tagId))
    } else {
      props.onChange([...selectedIds, tagId])
    }
  }
  const getClass = (tagId: number) => selectedIds.indexOf(tagId) >=0 ? 'selected' : ''
  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag.id}
              onClick={()=> {onToggleTag(tag.id)}}
              className={getClass(tag.id)}>
            <Icon name={tag.icon}/><span>{tag.name}</span></li>
        )}
        <li><Link to='/tags/add'><Icon name="add"/></Link></li>
      </ol>
    </Wrapper>
  )
}

export { TagsSection }