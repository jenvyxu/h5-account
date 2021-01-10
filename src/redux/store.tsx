import { createStore } from "redux";
import {categoryReducer} from './reducer'

const store = createStore(categoryReducer)

export default store