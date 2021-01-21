import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {httpGetRecordList} from '../../http'

export type RecordItem = {
  tagId: number;
  note: string;
  category: 'income' | 'cost';
  amount: number;
  createAt: string;
}
export type NewRecordItem = Omit<RecordItem, 'createAt'>

type RecordArgs =  {
  day?: number,
  month?: number, 
  timestamp: string
}

export const getRecordList = createAsyncThunk<Array<any>, RecordArgs, { state: RootState }>(
  'record/getRecordList',
  async (obj, { rejectWithValue }) => {
    try {
      const list = await httpGetRecordList(obj)
      return list
    }catch(err) {
      return rejectWithValue(err)
    }
  }
)

const record = createSlice({
  name: 'record',
  initialState: [] as RecordItem[],
  reducers:{
    addRecord: (state, action) => {
      state = action.payload
    },
    removeRecord: (state, action) => {
      state = action.payload
    }
  },
  extraReducers: builder => { 
    builder.addCase(getRecordList.fulfilled, (state, action) => {
      state.push(...action.payload)
    })
  }
})


export const { addRecord, removeRecord } = record.actions
export default record.reducer
