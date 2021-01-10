import { combineReducers } from 'redux';

import tagListReducer from './tagList';
import categoryReducer from './category';

export default combineReducers({ 
  category: categoryReducer,
  tagList: tagListReducer, 
})

