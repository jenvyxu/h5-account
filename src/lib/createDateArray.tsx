const createDateArray =  (step: number, length=7) => {
  const today = new Date()
  const oneDayTime = 86400000
  const oneWeekTime = oneDayTime * 7
  return Array(length).fill('').map((val, index) => {
    const targetDate = new Date(today.valueOf() - oneDayTime * index - step * oneWeekTime)
    const mon = targetDate.getMonth() + 1
    const date = targetDate.getDate()
    return `${mon}-${date}`
  }).reverse()
}

export {createDateArray}

//index 0 当前7天
// index 1 q前7天
