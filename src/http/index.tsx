import axios from 'axios';

// 使用unicloud空间
const host = 'https://fd9b10f6-6863-4898-962b-cdd165d2cdfb.bspapp.com'

const httpAddTag = async (action: string, data: {name: string, icon: string, id: number, currentId: number}) => {
  return await axios.post(host + '/http/tag/' + action, data)
}

type TagData = {
  tagList: {
    id: number,
    name: string,
    icon: string,
    category: 'cost'|'income'
  }[],
  recentlyId: number
}

const httpGetTag: () => Promise<TagData>  = async () => {
  const {data} =  await axios.get(host + '/http/tag/getTagList')
  let tagList
  if(data.tagList) {
    tagList = data.tagList.map((tag: {id:number, name:string, icon: string} ) => {
      const { id, name, icon } = tag
      return { id, name, icon }
    })
  } else {
    tagList = []
  }
  return {tagList, recentlyId: data.currentId}
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
