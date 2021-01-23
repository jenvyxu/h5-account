import client from './client';
import { TagList, Tag } from 'redux/types/tagTypes';

// 新增标签
const httpAddTag = async (
    data: Tag
  ): Promise<TagList> => {
  try {
    const { data: { tagList } } = await client.post('/http/tag/add', data)
    return tagList
  } catch(e) {
    return Promise.reject(e)
  }
}

// 获取标签列表
const httpGetTag = async (): Promise<{tagList: TagList, success: boolean}> => {
  try {
    const { data: list } = await client.get('/http/tag/getTagList')
    return list    
  } catch(e) {
    return Promise.reject(e)
  }
}

const httpAddRecord = async (action: string, data: {
  tagId: number,
  amount: number,
  category: 'cost' | 'income',
  createAt: string,
  note: string
}) => {
  try {
    return await client.post('/http/record/' + action, data)
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * 获取记账列表
 * @param timestamp  当前时间戳 new Date().toISOStrng()
 * @param day 获取多少天的记录
 * @param month 获取多少个月的记录
 * @returns 返回列表信息
 */
type RecordResult = {
  code: number
  message: string
  data?: any
  startTime?: string
  endTime?: string
}

const httpGetRecordList = async (data: {timestamp: string, day?: number, month?: number}) => {
  try {
    const { data: {code, data: list, message} } = await client.post<RecordResult>('/http/record/getRecordList', data)
    if(code === 0 && list) {
      return list
    } else {
      return Promise.reject(message)
    }
  } catch(e) {
    Promise.reject(e)
  }
}

export { 
  httpAddTag,
  httpGetTag,
  httpAddRecord,
  httpGetRecordList
}
