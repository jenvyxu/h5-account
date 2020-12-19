import axios from 'axios';

// 使用unicloud空间
const host = 'https://fd9b10f6-6863-4898-962b-cdd165d2cdfb.bspapp.com'

const httpAddTag = async (action: string, data: {name: string, icon: string, id: number}) => {
  return await axios.post(host + '/http/tag/' + action, data)
}

type Tag = {
  id: number,
  name: string,
  icon: string,
  category: 'cost'|'income'
}
const httpGetTag: () => Promise<Array<Tag>>  = async () => {
  const { data } =  await axios.get(host + '/http/tag/get')
  return data.map((tag: {id:number, name:string, icon: string} ) => {
    const { id, name, icon } = tag
    return { id, name, icon }
  })
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

const httpGetStatistic = async (data: {count: number, current: string}) => {
  const { data: list } = await axios.post(host + '/http/record/statistic', data)
  return list
}

export { httpAddTag, httpGetTag, deleteTag, updateTag, httpAddRecord, httpGetStatistic }
