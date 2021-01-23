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
export type RecordList = Array<RecordItem>
type RecordArgs =  {
  day?: number,
  month?: number, 
  timestamp: string
}

interface IntialState<T> {
  homeRecordList: Array<T>,
  statisticReacordList: Array<T>,
  overviewRecordList: Array<T>,
  loading: boolean
}
// 获取首页统计列表
export const getHomeRecordList = createAsyncThunk<RecordList,
  Omit<RecordArgs, "month">,
  { state: RootState }>(
  'record/getHomeRecordList',
  async (obj, { rejectWithValue }) => {
    try {
      return await httpGetRecordList(obj)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
// 获取统计概览组件列表
export const getOverviewRecordList = createAsyncThunk<RecordList, 
  Omit<RecordArgs, "month">, 
  { state: RootState }>(
  'record/getOverviewRecordList',
  async (obj, { rejectWithValue }) => {
    try {
      return await httpGetRecordList(obj)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
// 获取收入支出统计组件列表
export const getStatisticReacordList = createAsyncThunk<RecordList,
  Omit<RecordArgs, "day">,
  { state: RootState }>(
  'record/getStatisticReacordList',
  async (obj, { rejectWithValue }) => {
    try {
      return await httpGetRecordList(obj)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const record = createSlice({
  name: 'record',
  initialState: {
    homeRecordList: [],
    statisticReacordList: [],
    overviewRecordList: [],
    loading: false
  } as IntialState<RecordItem>,
  reducers:{
    addRecord: (state, action) => {
      state = action.payload
    },
    removeRecord: (state, action) => {
      state = action.payload
    },
  },
  extraReducers: builder => {
    // 获取统计概览组件列表
    builder.addCase(getOverviewRecordList.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getOverviewRecordList.fulfilled, (state, action) => {
      state.overviewRecordList = action.payload
      state.loading = false
    })
    // 获取收入支出统计列表
    builder.addCase(getStatisticReacordList.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getStatisticReacordList.fulfilled, (state, action) => {
      state.statisticReacordList = action.payload
      state.loading = false
    })
    // 获取首页统计列表
    builder.addCase(getHomeRecordList.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getHomeRecordList.fulfilled, (state, action) => {
      state.homeRecordList = action.payload
      state.loading = false
    })
  }
})

export const { addRecord, removeRecord } = record.actions
export default record.reducer
