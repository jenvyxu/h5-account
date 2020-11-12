import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: #9bcabf;
  padding: 16px;
  > .output {
    background: #fff;
    font-size: 22px;
    font-family: 'DeliusUnicase-Bold',serif;
    font-weight: bold;
    line-height: 40px;
    text-align: right;
    padding: 0 16px;
    border-radius: 8px;
    border: 2px solid #000;
  }
  >.pad {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    >button {
      font-family: 'DeliusUnicase-Regular',serif;
      font-size: 24px;
      width: 22%;
      height: 40px;
      border: 2px solid #000;
      border-radius: 8px;
      margin-top: 8px;
      background: #fff;
      &:nth-child(4),
      &:nth-child(15),
      &:nth-child(16){
        font-size: 16px;
        font-family: inherit;
      }
      &:last-child{
        background: #f1c21a;
      }
    }
  }
`
export {Wrapper}