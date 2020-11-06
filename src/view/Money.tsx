import Layout from 'components/Layout';
import React from 'react';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NoteSection} from './Money/NoteSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';

const MoneyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`

const Money = () => {
  return (
    <MoneyLayout>
      <TagsSection />
      <NoteSection />
      <CategorySection />
      <NumberPadSection />
    </MoneyLayout>
  )
}

export default Money;