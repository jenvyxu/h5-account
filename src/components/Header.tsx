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
    color: #010101;
  }
  .icon {
    height: 1em;
    width: 1em;
  }
  .left,
  .right {
    flex: 1;
  }
  .right {
    text-align: right;
  }
`

type Props = {
  title?: string,
  left?: any,
  right?: any,
  className?: string,
}


const Header: React.FC<Props> = (props) => {
  const { left, title, right, className } = props
  return (
    <Wrapper className={className} >
      { left && <span className="left">{left}</span> }
      { title && <span className="title">{title}</span> }
      { right && <span className="right">{right}</span> }
    </Wrapper>
  )
}

export {Header}