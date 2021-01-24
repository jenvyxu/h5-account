import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tagReducer, {fetchTagList} from './reducers/tagSlice';
import categoryReducer from './reducers/categorySlice';
import recordReducer from './reducers/recordSlice';
import {useDispatch} from 'react-redux';

export const rootReducer = combineReducers({
  category: categoryReducer,
  tagList: tagReducer, 
  record: recordReducer
})
  
const store = configureStore({
  reducer: rootReducer
});
store.dispatch<any>(fetchTagList())

export type RootState = ReturnType<typeof rootReducer>;
export default store

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 