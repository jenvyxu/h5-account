import axios from 'axios';
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

const httpGetStatistic = async (data: {
    start: string,
    end: string,
    type: 'total'|'income'|'cost'
  }) => {
  const { data: list } = await axios.post(host + '/http/record/statistic', data)
  return list
}

const httpGetStatisticMonthly = async (data: {
    time: string
    type: 'income'|'cost'
  }) => {
  const { data: list } = await axios.post(host + '/http/statistic/monthly', data)
  return list
}

export { 
  httpAddTag, 
  httpGetTag, 
  deleteTag,
  updateTag, 
  httpAddRecord, 
  httpGetStatistic,
  httpGetStatisticMonthly
}
