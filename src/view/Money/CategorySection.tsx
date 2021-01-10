import styled from 'styled-components';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {toggleCategory} from '../../redux/actions';
import type {Category} from '../../redux/reducers/category';
import type {TagList} from '../../redux/reducers/tagList'

const Wrapper = styled.ul`
  display: flex;
  font-size: 14px;
  background: #e8ecef;
  padding: 2px;
  border-radius: 4px;
    >li {
      padding: 3px 8px;
      border-radius: 4px;
      &.selected {
        background: #fff;
      }
    }
`
type Props = {
  category: Category,
  toggleCategory: (category: 'income'|'cost') => void
}

const CategorySection: React.FC<Props> = ({category, toggleCategory}) => {
  const categoryMap = { 'income': '收入', 'cost': '支出'}
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['income', 'cost'])

  return (
    <Wrapper>
      {categoryList.map(c =>
        <li className={category === c ? 'selected' : ''}
            key={c}
            onClick={()=>{toggleCategory(c)}}
        >{categoryMap[c]}</li>
      )}
    </Wrapper>
  )
}

const mapStatetoProps = (state: {
  category: Category,
  tagList: TagList
}) => {
  return {
    category: state.category
  }
}

export default connect(mapStatetoProps, { toggleCategory })(CategorySection)
