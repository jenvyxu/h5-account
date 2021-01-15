import {ADD_TAG, DELETE_TAG, UPDATE_TAG, LOAD_TAGLIST} from '../actionTypes';

export type Tag = {
  id: number,
  name: string,
  icon: string,
  category: 'cost'|'income'
}

export type TagList = Array<Tag>

export type TagAction = {
  type: typeof ADD_TAG|typeof DELETE_TAG|typeof UPDATE_TAG|typeof LOAD_TAGLIST
  payload: Tag | number | TagList
}

