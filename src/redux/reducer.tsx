import { TOGGLE_CATEGORY } from './actionTypes'

type StoreState = {
  category: 'income'|'cost'
}

const inittialCategory: StoreState = {
  category: 'cost'
}

const categoryReducer = (state: StoreState = inittialCategory, action: {
  type: string,
  payload: 'income'|'cost'
}):StoreState => {
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      return {
        ...state,
        category: action.payload
      }
    }
    default:
      return state
  }
}

export type {StoreState}
export {categoryReducer}