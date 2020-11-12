import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Icon from './Icon';

const NavWrapper = styled.nav`
  line-height: 24px;
  background-color: #f7f8f3;
  >ul {
    display:flex;
    >li {
      width: 33.33%;
      font-size: 14px;    
      >a {
        padding: 8px 0 2px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #d7e0e2;
        font-size: 12px;
        .icon {
          width: 24px;
          height: 24px;
          fill: #d7e0e2
        }
        &.selected {
          color: #a3c6bf;
          .icon {
            fill: #a3c6bf;
          }
        }
      }
    }
  }
`

const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/tags" exact activeClassName="selected">
            <Icon name="tag"/>
            标签
          </NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name="money"/>
            记账
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="chart" />
            统计
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  )
}

export default Nav;