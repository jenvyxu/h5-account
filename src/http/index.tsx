import axios from 'axios';
import client from './client'
import { TagList, Tag } from 'redux/types/tagTypes';

// 使用unicloud空间
const host = 'https://fd9b10f6-6863-4898-962b-cdd165d2cdfb.bspapp.com'

// 新增标签
const httpAddTag = async (
    data: Tag
  ): Promise<TagList> => {
  const { data: {tagList} } = await axios.post(host + '/http/tag/add', data)
  return tagList
}

// 获取标签列表
const httpGetTag = async (): Promise<{tagList: TagList, success: boolean}> => {
  const {data: res} = await axios.get(host + '/http/tag/getTagList')
  return res
}

const deleteTag = () => {

}

const updateTag = () => {

}

const httpAddRecord = async (action: string, data: {
  tagId: number,
  amount: number,
  category: 'cost' | 'income',
  createAt: string,
  note: string
}) => {
  return await axios.post(host + '/http/record/' + action, data)
}

const httpGetOverview = async (data: {
    count: number,
    timestamp: string
  }) => {
  const { data: list } = await client.post('/http/statistic/overview', data)
  return list
}

const httpGetStatisticMonthly = async (data: {
    time: string
    type: 'income'|'cost'
  }) => {
  const { data: list } = await axios.post(host + '/http/statistic/monthly', data)
  return list
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
  deleteTag,
  updateTag, 
  httpAddRecord, 
  httpGetOverview,
  httpGetStatisticMonthly,
  httpGetRecordList
}
