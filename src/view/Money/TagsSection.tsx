import styled from 'styled-components';
import React from 'react';
import {useTags} from 'useTags';

const Wrapper = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: #fff;
  padding: 12px 16px;
  >ol {
    margin: 0 -12px;
    >li {
      display: inline-block;
      font-size: 14px;
      padding: 3px 18px;
      background: #d9d9d9;
      border-radius: 18px;
      margin: 8px 12px;
      &.selected {
        background:yellow;
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
  }
`
type Props = {
  value: number[];
  onChange: (selected: number[]) => void;
}

const TagsSection: React.FC<Props> = (props) => {
  const {tags, setTags} = useTags()
  const selectedIds = props.value
  const onAddTag = () => {
    const tagName = window.prompt('请输入标签')
    if(tagName !== null) {
      setTags([...tags ,{id: Math.random(), name: tagName}])
    }
  }
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
              className={getClass(tag.id)}>{tag.name}</li>
        )}
      </ol>
      <button onClick={onAddTag}>新增标签</button>
    </Wrapper>
  )
}

export { TagsSection }