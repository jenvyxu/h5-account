import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
  font-size: 24px;
  >ul {
    display: flex;
      >li {
        position: relative;
        flex-basis: 50%;
        padding: 16px 0;
        text-align: center;
        &.selected::after {
          content: '';
          display: block;
          height: 3px;
          background: #333;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      }
   }
`
type Props = {
  value: '-' | '+';
  onChange: (value: '-' | '+') => void
}

const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = { '+': '收入', '-': '支出'}
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['-', '+'])
  const category = props.value
  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li className={category === c ? 'selected' : ''}
              key={c}
              onClick={()=>{props.onChange(c)}}
          >{categoryMap[c]}</li>
        )}
      </ul>
    </Wrapper>
  )
}

export { CategorySection }