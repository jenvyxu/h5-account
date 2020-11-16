import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  min-height: 58px;
  font-size: 20px;
  >.title {
    font-weight: bold;
    text-align: center;
    padding: 6px 0;
    color: #010101;
  }
  .icon {
    height: 1em;
    width: 1em;
  }
  .left {
    position: absolute;
    left: 20px;
  }
  .right {
    position: absolute;
    right: 20px;
  }
`

type Props = {
  title?: string,
  left?: any,
  right?: any
}

const Header: React.FC<Props> = (props) => {
  const { left, title, right } = props
  return (
    <Wrapper className="clearfix">
      { left && <span className="left">{left}</span> }
      { title && <span className="title">{title}</span> }
      { right && <span className="right">{right}</span> }
    </Wrapper>
  )
}

export {Header}