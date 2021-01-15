import { TOGGLE_CATEGORY } from '../actionTypes';
import {Action} from '@reduxjs/toolkit';

export type Category = 'income'|'cost';
export interface CategoryAction extends Action {
  type: typeof TOGGLE_CATEGORY,
  payload?: {
    category: Category
  }
}