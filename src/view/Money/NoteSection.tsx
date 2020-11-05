import styled from 'styled-components';

const NoteSection = styled.section`
  background: #f5f5f5;
  padding: 0 16px;
  font-size: 14px;
  >label {
    display: flex;
    align-items: center;
    >span {
      margin-right: 16px;
      white-space: nowrap;
    }
    >input {
      height: 72px;
      flex: 1;
      border: none;
      background: none;
    }
  }

`

export { NoteSection }