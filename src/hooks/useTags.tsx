import {useEffect, useState} from 'react';
import {createId} from 'lib/cteateId';
import {useUpdate} from 'hooks/useUpdate';

const useTags = () => {
  const [tags, setTags] = useState<{ id: number, name: string, icon: string }[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags')|| '[]')
    if(localTags.length === 0 ) {
      localTags = [
        { id: createId(), name: '出行', icon: 'train'},
        { id: createId(), name: '日常', icon: 'shop'},
        { id: createId(), name: '购物', icon: 'shopping'},
        { id: createId(), name: '娱乐', icon: 'game'},
        { id: createId(), name: '聚会', icon: 'party'},
        { id: createId(), name: '教育', icon: 'book'},
        { id: createId(), name: '宠物', icon: 'pet'},
        { id: createId(), name: '母婴', icon: 'babycar'},
        { id: createId(), name: '水电', icon: 'electric'},
      ]
    }
    setTags(localTags)
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
    setTags(tags.map(tag => tag.id === id ? {id, name: obj.name, icon: ''} : tag));
  }
  const deleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id))
  }
  const addTag = (obj: { name: string, icon: string }) => {
    const {name, icon} = obj
    if(name !== '' && icon !== '') {
      setTags([...tags ,{id: createId(), name, icon}])
    }
  }
  const getName = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0]
    return tag ? tag.name : ''
  }
  return { tags, getName, setTags, findTag, findTagIndex, updateTag, deleteTag, addTag };
}

export {useTags}


