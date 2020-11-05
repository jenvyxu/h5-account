import Layout from 'components/Layout';
import React from 'react';
import styled from 'styled-components';

const TagsSection = styled.section`
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

const NoteSection = styled.section``

const CategorySection = styled.section``

const NumberPadSection = styled.section``

const Money = () => {
  return (
    <Layout>
      <TagsSection>
        <ol>
          <li>衣</li>
          <li>食</li>
          <li>住</li>
          <li>行</li>
        </ol>
        <button>新增标签</button>
      </TagsSection>
      <NoteSection>
        <label>
          <span>备注</span>
          <input type="text"/>
        </label>
      </NoteSection>
      <CategorySection>
        <ul>
          <li>支出</li>
          <li>收入</li>
        </ul>
      </CategorySection>
      <NumberPadSection>
        <div>100</div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>删除</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>清空</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>OK</button>
          <button>0</button>
          <button>.</button>
        </div>
      </NumberPadSection>

    </Layout>
  )
}

export default Money;