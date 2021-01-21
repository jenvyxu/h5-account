import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {httpGetRecordList} from '../../http'

export type RecordItem = {
  tagId: number;
  note: string;
  category: 'income' | 'cost';
  amount: number;
  createAt: string;
  _id?: string
}
export type NewRecordItem = Omit<RecordItem, 'createAt'>

type RecordArgs =  {
  day?: number,
  month?: number, 
  timestamp: string
}

export const getRecordList = createAsyncThunk<void, RecordArgs, { state: RootState }>(
  'record/getRecordList',
  async (obj, { rejectWithValue, dispatch }) => {
    try {
      if(obj.month === undefined) {
        const list = await httpGetRecordList(obj)
        dispatch({type: 'record/getRecordListByDay', payload: list})
      } else {
        const list = await httpGetRecordList(obj)
        dispatch({type: 'record/getRecordListByMonth', payload: list})
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

interface IntialState<T> {
  homeRecordList: Array<T>,
  statisticReacordList: Array<T>
}

const record = createSlice({
  name: 'record',
  initialState: {
    homeRecordList: [],
    statisticReacordList: []
  } as IntialState<RecordItem>,
  reducers:{
    addRecord: (state, action) => {
      state = action.payload
    },
    removeRecord: (state, action) => {
      state = action.payload
    },
    getRecordListByDay: (state, action) => {
      state.homeRecordList = action.payload
    },
    getRecordListByMonth: (state, action) => {
      state.statisticReacordList = action.payload
    }
  },
  // extraReducers: builder => {
  //   builder.addCase(getRecordList.fulfilled, (state, action) => {
     
  //   })
  // }
})


export const { addRecord, removeRecord } = record.actions
export default record.reducer
