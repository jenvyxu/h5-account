import {useEffect, useState} from 'react';
import {useUpdate} from 'hooks/useUpdate';
import {httpAddTag, httpGetTag} from '../http';

type Tag = {
  id: number,
  name: string,
  icon: string,
  category: 'cost'|'income'
}

const initialTags: Array<Tag> = [
  { id: 1, name: '房租', icon: 'fangzu', category: 'cost' },
  { id: 2, name: '水电', icon: 'shuidian', category: 'cost' },
  { id: 3, name: '居家', icon: 'shop', category: 'cost' },
  { id: 4, name: '交通', icon: 'train', category: 'cost' },
  { id: 5, name: '学习', icon: 'book', category: 'cost' },
  { id: 6, name: '日用', icon: 'riyong', category: 'cost' },
  { id: 7, name: '餐饮', icon: 'canyin', category: 'cost' },
  { id: 8, name: '购物', icon: 'shopping', category: 'cost' },
  { id: 9, name: '娱乐', icon: 'youxi', category: 'cost' },
  { id: 10, name: '旅游', icon: 'lvyou', category: 'cost' },
  { id: 11, name: '宠物', icon: 'chongwu', category: 'cost' },
  { id: 12, name: '工资', icon: 'gongji', category: 'income' },
  { id: 13, name: '报销', icon: 'baoxiao', category: 'income' },
  { id: 14, name: '补助', icon: 'buzhu', category: 'income' },
  { id: 15, name: '红包', icon: 'hongbao', category: 'income' },
  { id: 16, name: '分红', icon: 'fenhong', category: 'income' },
  { id: 17, name: '奖金', icon: 'jiangjin', category: 'income' },
  { id: 18, name: '借款', icon: 'jiekuan', category: 'income' },
]

const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  let [nextId, setNextId] = useState(0)

  // 获取tagList
  useEffect(() => {
    httpGetTag().then(({tagList}) => {
      const newTagList = initialTags.concat(tagList)
      setTags(newTagList)
      let idMax = newTagList.reduce((id, tag) => Math.max(id, tag.id), 0)
      setNextId(idMax + 1)
    })
  }, [])

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
  }, tags)

  const addTag = async (obj: { name: string, icon: string, category: 'income'|'cost'}):Promise<string> => {
    const {name, icon} = obj
    if(name !== '' && icon !== '') {
      const {success, tagList} = await httpAddTag('add', { ...obj, id: nextId })
      if(success){
        setTags(tagList.concat(tags))
        return 'success'
      } else {
        return 'fail'
      }
    } else {
      return 'fail'
    }
  }

  const findTag = (id: number) => tags.filter(tag => tag.id === id)[0]

  const findTagIndex = (id: number) => {
      let result = -1
      for(let i=0; i<tags.length; i++) {
        if(tags[i].id === id) {
          result = i;
          break;
        }
      }
      return result;
  }

  const updateTag = (id: number, obj: {name: string}) => {
    setTags(tags.map(tag => tag.id === id ? Object.assign(tag, obj) : tag));
  }

  const deleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  const getName = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0]
    return tag ? tag.name : ''
  }

  const getTags = (category: 'income'|'cost') => {
    if(category === 'income') {
      return tags.filter(tag => tag.category === 'income')
    } else if(category === 'cost') {
      return tags.filter(tag => tag.category === 'cost')
    } else {
      return tags
    }
  }
  return { tags, getTags, getName, setTags, findTag, findTagIndex, updateTag, deleteTag, addTag };
}

export {useTags};
export type {Tag}
