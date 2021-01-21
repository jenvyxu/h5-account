import { combineReducers, configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import tagReducer, {fetchTagList} from './reducers/tagSlice';
import categoryReducer from './reducers/categorySlice';
import recordReducer from './reducers/recordSlice'

export const rootReducer = combineReducers({
  category: categoryReducer,
  tagList: tagReducer, 
  record: recordReducer
})
  
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk]
});
store.dispatch<any>(fetchTagList())

export type RootState = ReturnType<typeof rootReducer>;
export default store