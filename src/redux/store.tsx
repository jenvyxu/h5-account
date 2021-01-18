import { combineReducers, configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import tagSlice, {fetchTagList} from './reducers/tagSlice';
import thunk from 'redux-thunk';
import categorySlice from './reducers/categorySlice';

export const rootReducer = combineReducers({
  category: categorySlice,
  tagList: tagSlice, 
})
  
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk]
});
store.dispatch<any>(fetchTagList())

export type RootState = ReturnType<typeof rootReducer>;
export default store