import { TOGGLE_CATEGORY, ADD_TAG, DELETE_TAG, LOAD_TAGLIST } from './actionTypes'

export const addTag = (tag: {
  name: string,
  icon: string,
  category: 'income'|'cost'
}) => {
  return {
    type: ADD_TAG,
    payload: {...tag}
  }
}

export const deleteTag = (id: number) => {
  return {
    type: DELETE_TAG,
    payload: {id}
  }
}

export const toggleCategory = (category: 'income'|'cost') => {
  return {
    type: TOGGLE_CATEGORY,
    payload: {category}
  }
}

