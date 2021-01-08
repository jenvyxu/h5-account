import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import {httpAddRecord} from '../http';

export type RecordItem = {
  tagId: number;
  note: string;
  category: 'income' | 'cost';
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

  const addRecord = async (newRecord: newRecordItem) => {
    if(newRecord.amount <= 0 ){
      return 'requireMoney'
    }
    if(newRecord.tagId === -1) {
      return 'requireTag'
    }
    const record = {...newRecord, createAt: (new Date()).toISOString()}
    // setRecords([...records, record])
    console.log(record);
    const res = await httpAddRecord('add', record)
    if(res.statusText === 'OK' ) {
      return 'complete'
    }
  }
  return { records, setRecords, addRecord }
}

export { useRecords }
