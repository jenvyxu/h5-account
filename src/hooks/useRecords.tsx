import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

export type RecordItem = {
  tagIds: number[];
  note: string;
  category: '+' | '-';
  amount: number;
  createAt: string;
}

type newRecordItem = Omit<RecordItem, 'createAt'>

const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([])
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
  },[])

  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records))
  }, records)

  const addRecord = (newRecord: newRecordItem) => {
    if(newRecord.amount <= 0 ){
      return 'requireMoney'
    }
    if(newRecord.tagIds.length === 0) {
      return 'requireTag'
    }
    const record = {...newRecord, createAt: (new Date()).toISOString()}
    setRecords([...records, record])
    return 'complete'
  }
  return { records, setRecords, addRecord }
}

export { useRecords }
