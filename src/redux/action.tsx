import { TOGGLE_CATEGORY } from './actionTypes'

export const toggleCategory = (category: 'income'|'cost') => {
  return {
    type: TOGGLE_CATEGORY,
    payload: category
  }
}