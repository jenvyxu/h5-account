import styled from 'styled-components';

const CategorySection = styled.section`
  font-size: 24px;
  >ul {
    display: flex;
    background: #c4c4c4;
      >li {
        position: relative;
        flex-basis: 50%;
        padding: 16px 0;
        text-align: center;
        &.selected::after {
          content: '';
          display: block;
          height: 3px;
          background: #333;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      }
   }
`

export { CategorySection }