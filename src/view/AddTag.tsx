import styled from 'styled-components';
import Icon from '../components/Icon';
import React, {useState} from 'react';
import {Input} from '../components/Input';
import { useHistory, useLocation } from 'react-router-dom';
import {useTags} from '../hooks/useTags';
import {Header} from '../components/Header';
// import {createId} from 'lib/cteateId';

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

const tagsCategory = [
  {
    category: '娱乐',
    items: [
      { icon: 'yule', name: '娱乐' }, { icon: 'dianying', name: '电影' }, { icon: 'book', name: '书本' }, { icon: 'swimming', name: '游泳' },
      { icon: 'party', name: '聚会' }, { icon: 'ticket', name: '演唱会' }, { icon: 'lanqiu', name: '篮球' },
      { icon: 'yinyue', name: '音乐' },
    ]
  },
  {
    category: '交通',
    items: [
      { icon: 'taxi', name: '出行' }, { icon: 'train', name: '火车' }, { icon: 'xiaoche', name: '小车' },
      { icon: 'gongjiao', name: '公交' }, { icon: 'chuzuche', name: '出租' }, { icon: 'feiji', name: '飞机' },
      { icon: 'youlun', name: '船' }, { icon: 'diandongche', name: '电动车' }, { icon: 'weizhang', name: '违章' },
      { icon: 'jiayou', name: '加油' },
    ]
  },
  {
    category: '医护',
    items: [
      { icon: 'health', name: '健康' }, { icon: 'yisheng', name: '医生' }, { icon: 'yiyuan', name: '医院' },
      { icon: 'yaowan', name: '药丸' }, { icon: 'jiuhuche', name: '救护车' }, { icon: 'zhen', name: '针' },
      { icon: 'xindiantu', name: '心电图' }, { icon: 'bingchuang', name: '病床' }, { icon: 'yachi', name: '牙齿' },
    ]
  },
  {
    category: '亲子',
    items: [
      { icon: 'babycar', name: '母婴' }, { icon: 'naiping', name: '奶瓶' }, { icon: 'wanju', name: '玩具' },
    ]
  },
  {
    category: '生活',
    items: [
      { icon: 'fitness', name: '健身' }, { icon: 'fruit', name: '水果' }, { icon: 'game', name: '娱乐' },
      { icon: 'gas', name: '加油' }, { icon: 'ice-cream', name: '零食' }, { icon: 'muscle', name: '锻炼' },
      { icon: 'pet', name: '宠物' }, { icon: 'phone', name: '话费' }, { icon: 'travel', name: '旅行' },
      { icon: 'shucai', name: '蔬菜' }, { icon: 'shafa', name: '沙发' }, { icon: 'yinliao', name: '饮料' },
      { icon: 'liwu', name: '礼物' },
    ]
  },
  {
    category: '购物',
    items: [
      { icon: 'yifu', name: '衣服' },{ icon: 'kuzi', name: '裤子' }, { icon: 'shoes', name: '鞋子' },
      { icon: 'bag', name: '背包' },{ icon: 'kouhong', name: '口红' }, { icon: 'diannao', name: '电脑' },
      { icon: 'shopping', name: '购物' },
    ]
  },
  {
    category: '教育',
    items: [
      { icon: 'education', name: '教育' }, { icon: 'laptop', name: '电脑' }, { icon: 'shuben', name: '书籍' },
      { icon: 'xuexiao', name: '学校' }, { icon: 'laoshi', name: '老师' }, { icon: 'lianxice', name: '作业' },
    ]
  },
  {
    category: '金融',
    items: [
      { icon: 'bank', name: '银行' }, { icon: 'invest', name: '投资' }, { icon: 'wallet', name: '工资' },
      { icon: 'stock', name: '股票' }
    ]
  }
]


const AddTag = () => {
  const {goBack} = useHistory();
  const [selectedIcon, setSelectedIcon] = useState<string>('electric');
  const [tagName, setTagName] = useState<string>('')
  const {addTag} = useTags()
  const { search } = useLocation()

  const onConfirm = async () => {
    if(tagName==='') return
    let category = search.slice(1) as 'cost'|'income'
    const res = await addTag({
      name: tagName,
      icon: selectedIcon,
      category,
    })
    if (res && res.status === 200) {
      goBack()
    } else {

    }
  }
  return (
    <Wrapper>
      <Header title="新增标签"
              left={<Icon name="back" onClick={goBack} />}
              right={<Icon name="confirm" onClick={onConfirm} />}
      />
      <InputWrapper>
        <span><Icon name={selectedIcon} /></span>
        <Input label='' placeholder="填写标签名" onChange={
          (e) => {setTagName(e.target.value)}
        }/>
      </InputWrapper>
      <IconWrapper>
        {
          tagsCategory.map((tag) =>(
            <IconItem key={tag.category}>
              <div>{tag.category}</div>
              <ul>
                { tag.items.map((item)=> (
                  <li key={item.icon}
                      onClick={() => {setSelectedIcon(item.icon)}}
                  >
                    <span className={ selectedIcon === item.icon ? 'selected' : ''}>
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
export {AddTag}