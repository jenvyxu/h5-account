import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{type: string}>`
  position: fixed;
  top: 8vh;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  font-size: 18px;
  color: ${props => props.color || '#333' };
  background: ${props=>props.type === 'tip'? '#f3ffee': '#fff2f0'};
  border-color: ${props=>props.type === 'tip'? '#a6f499': '#ffcac8'};
  border-width: 2px;
  border-radius: 4px;
`

type Props = {
  message: string;
  style: object;
  type: string;
}

const Toast: React.FC<Props> = (props) => {
  const {style, children, message,type, ...rest} = props
  return (
    <Wrapper type={type} {...rest} style={style}>{message}</Wrapper>
  )
}

Toast.defaultProps = {
  type:'tip',
  message:'提交成功'
}

export {Toast}