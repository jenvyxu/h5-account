import { TOGGLE_CATEGORY } from '../actionTypes'

export type Category = 'income'|'cost'
type Action = {
  type: string,
  payload: {category: Category}
}

const inittialCategory: Category = 'cost'

export default function(state:Category = inittialCategory, action: Action) {
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      return action.payload.category
    }
    default: {
      return state
    }
  }
}