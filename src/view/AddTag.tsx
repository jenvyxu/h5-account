import styled from 'styled-components';
import Icon from '../components/Icon';
import React, {useState} from 'react';
import {Input} from '../components/Input';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f9faf5;
  >label {
    background: #a0ded1;
    margin: 4px 16px;
    padding: 10px 8px;
    border-radius: 4px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  >span {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  button {
    border-radius: 4px;
    background: #a0ded1;
    padding: 4px 10px;
    font-size: 14px;
    border: none;
  }
`

const IconWrapper = styled.div`
  padding: 16px;
  >div {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  >ul {
    display: flex;
    flex-wrap: wrap;

    >li {
      text-align: center;
      width: calc(20% - 10px);
      margin: 4px 5px 0 5px;
      border-radius: 8px;
      border: 2px solid transparent;
      .icon {
        width: 80%;
        height: 60px;
      }
      &.selected {
       background: #a0ded1;
       border: 2px solid #95c8be;
      }
    }
  }
`


const AddTag = () => {
  const {goBack} = useHistory();
  const [selected, setSelected] = useState<string>('bag');
  const [tags] = useState([
    { icon: 'bag' }, { icon: 'babycar' }, { icon: 'bank' }, { icon: 'book' },
    { icon: 'bus' }, { icon: 'clothes' }, { icon: 'education' }, { icon: 'electric' },
    { icon: 'fitness' }, { icon: 'fruit' }, { icon: 'game' }, { icon: 'gas' },
    { icon: 'health' }, { icon: 'ice-cream' }, { icon: 'invest' }, { icon: 'jeans' },
    { icon: 'job' }, { icon: 'laptop' }, { icon: 'movie' }, { icon: 'muscle' },
    { icon: 'party' }, { icon: 'pet' }, { icon: 'phone' }, { icon: 'shoes' },
    { icon: 'shopping' }, { icon: 'stock' }, { icon: 'swimming' }, { icon: 'taxi' },
    { icon: 'ticket' }, { icon: 'tools' }, { icon: 'toy' }, { icon: 'train' },
    { icon: 'travel' }, { icon: 'wallet' }
  ])
  const onComplete = () => {
    goBack()
  }
  return (
    <Wrapper>
      <Header>
        <span>添加标签</span>
        <button onClick={() => onComplete()}>完成</button>
      </Header>
      <Input label="标签名" placeholder="填写标签名"/>
      <IconWrapper>
        <div>选择图标</div>
        <ul>
          { tags.map(tag => (
            <li onClick={() => {setSelected(tag.icon)}}
                className={ selected === tag.icon ? 'selected' : ''}>
              <Icon name={tag.icon} key={tag.icon} />
            </li>
          ))}
        </ul>
      </IconWrapper>
    </Wrapper>
  )
}
export {AddTag}