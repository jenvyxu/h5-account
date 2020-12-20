import {useEffect, useState} from 'react';
import {createId} from 'lib/cteateId';
import {useUpdate} from 'hooks/useUpdate';
import {httpAddTag, httpGetTag} from '../http';

type Tag = {
  id: number,
  name: string,
  icon: string,
  category: 'cost'|'income'
}

const defaultTags: Array<Tag> = [
  { id: createId(), name: '房租', icon: 'fangzu', category: 'cost' },
  { id: createId(), name: '水电', icon: 'shuidian', category: 'cost' },
  { id: createId(), name: '居家', icon: 'shop', category: 'cost' },
  { id: createId(), name: '交通', icon: 'train', category: 'cost' },
  { id: createId(), name: '学习', icon: 'book', category: 'cost' },
  { id: createId(), name: '日用', icon: 'riyong', category: 'cost' },
  { id: createId(), name: '餐饮', icon: 'canyin', category: 'cost' },
  { id: createId(), name: '购物', icon: 'shopping', category: 'cost' },
  { id: createId(), name: '娱乐', icon: 'youxi', category: 'cost' },
  { id: createId(), name: '旅游', icon: 'lvyou', category: 'cost' },
  { id: createId(), name: '宠物', icon: 'chongwu', category: 'cost' },

  { id: createId(), name: '工资', icon: 'gongji', category: 'income' },
  { id: createId(), name: '报销', icon: 'baoxiao', category: 'income' },
  { id: createId(), name: '补助', icon: 'buzhu', category: 'income' },
  { id: createId(), name: '红包', icon: 'hongbao', category: 'income' },
  { id: createId(), name: '分红', icon: 'fenhong', category: 'income' },
  { id: createId(), name: '奖金', icon: 'jiangjin', category: 'income' },
  { id: createId(), name: '借款', icon: 'jiekuan', category: 'income' },
]



const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // let localTags = JSON.parse(window.localStorage.getItem('tags')|| '[]')
    let localTags: Tag[] = []
    httpGetTag().then((tags) => {
      if(localTags.length === 0 ) {
        localTags = defaultTags.concat(tags)
      }
      setTags(localTags)
      window.localStorage.setItem('tags', JSON.stringify(tags))
    })
  }, []) // 组件挂载时执行

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
  }, tags)

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

  const addTag = async (obj: { name: string, icon: string, category: 'income'|'cost', id: number }) => {
    const {name, icon} = obj
    if(name !== '' && icon !== '') {
      // setTags([...tags ,{id: createId(), name, icon}])
      const res = await httpAddTag('add', obj)
      defaultTags.push(obj)
      return res
    }
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
export type { Tag };
