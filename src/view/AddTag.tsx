import styled from 'styled-components';
import Icon from '../components/Icon';
import React, {useState} from 'react';
import {Input} from '../components/Input';
import {useHistory} from 'react-router-dom';
import {Header} from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../redux/store';
import {tagsCategoryList} from '../constant';
import {asyncAddTag} from '../redux/reducers/tagSlice';
import message from 'lib/message';

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
const InputWrapper = styled.div`
  margin: 0 16px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  >label {
    flex: 1;
  }
  >span{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #a0ded1;
    >.icon {
      width: 30px;
      height: 30px;
    }
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
const IconItem = styled.div`
  >div{
    font-size: 16px;
  }
  >ul {
    display: flex;
    flex-wrap: wrap;
    margin: 10px -10px;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 10px;
      >span {
        display: flex;
        background: #d6e0e2;
        border-radius: 50%;
        padding: 6px;
        &.selected {
          background: #93e1d2;
        }
        .icon {
          width: 30px;
          height: 30px;
        }
      }
      &:last-child {
        margin-right: auto;
      }
    }
  }

`
const AddTag: React.FC = () => {
  const { goBack } = useHistory();
  // 标签图标
  const initialTagIcon = tagsCategoryList[0].items[0].icon
  const [selectedTagIcon, setSelectedTagIcon] = useState<string>(initialTagIcon);
  // 标签名称
  const [tagName, setTagName] = useState<string>('')
  // 收入或支出
  const category = useSelector((state:RootState) => state.category)
  const dispatch = useDispatch()
  // 提交标签信息
  const onConfirm = async () => {
    if(!tagName || !selectedTagIcon) return
    if(tagName.length > 2) {
      return message.warning('标签字数不能超过2个')
    }
    try {
      await dispatch(asyncAddTag({
        name: tagName,
        icon: selectedTagIcon,
        category}))
      goBack()      
    } catch (e) {

    }
  }

  return (
    <Wrapper>
      <Header
        title="新增标签"
        left={<Icon name="back" onClick={goBack} />}
        right={<Icon name="confirm" onClick={onConfirm} />}
      />
      <InputWrapper>
        <span><Icon name={selectedTagIcon} /></span>
        <Input
          label='' 
          placeholder="填写标签名" 
          onChange={(e) => {setTagName(e.target.value)}} />
      </InputWrapper>
      <IconWrapper>
        {
          tagsCategoryList.map((tag) =>(
            <IconItem key={tag.category}>
              <div>{tag.category}</div>
              <ul>
                { tag.items.map((item)=> (
                  <li key={item.icon}
                      onClick={() => {setSelectedTagIcon(item.icon)}}
                  >
                    <span className={ selectedTagIcon === item.icon ? 'selected' : ''}>
                      <Icon name={item.icon} />
                    </span>
                  </li>
                ))}
              </ul>
            </IconItem>
          ))
        }
      </IconWrapper>
    </Wrapper>
  )
}

export default AddTag