import styled from 'styled-components';
import {Link} from 'react-router-dom';
import React from 'react';
require('assets/icons/money.svg') //fuck
require('assets/icons/tag.svg')
require('assets/icons/chart.svg') //fuck me

const NavWrapper = styled.nav`
  box-shadow: 0 0 3px rgba(0,0,0.25);
  line-height: 24px;
  >ul {
    display:flex;
    >li {
      width: 33.33%;
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }
`

const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <svg className="icon">
            <use xlinkHref="#tag" />
          </svg>
          <Link to="/tags">标签</Link>
        </li>
        <li>
          <svg className="icon">
            <use xlinkHref="#money" />
          </svg>
          <Link to="/money">记账</Link>
        </li>
        <li>
          <svg className="icon">
            <use xlinkHref="#chart" />
          </svg>
          <Link to="/statistics">统计</Link>
        </li>
      </ul>
    </NavWrapper>
  )
}

export default Nav;