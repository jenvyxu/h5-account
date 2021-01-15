import { configureStore } from '@reduxjs/toolkit';

import tagSlice from './reducers/tagSlice';
import categorySlice from './reducers/categorySlice';

const store = configureStore({
  reducer: {
    category: categorySlice,
    tagList: tagSlice, 
  }
});

// store.dispatch<any>(fetchTagList())

export default store