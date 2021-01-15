import type {Category} from '../types/categoryTypes';
import {createSlice} from '@reduxjs/toolkit';

const category = createSlice({
  name: 'category',
  initialState: 'cost' as Category,
  reducers: {
    toggleCategory(state, action){
      return action.payload
    }
  }
})

export const { toggleCategory } = category.actions
export default category.reducer