function floatSum (x: string, y: string) {
  // x, y必须都是浮点数
  let stringX = ''
  let stringY = ''
  let flag = ''
  let result = ''
  let carry = 0

  if(x[0] === '-' && y[0] === '-') {
    flag = '-'
    stringX = x.slice(1)
    stringY = y.slice(1)
  } else {
    stringX = x
    stringY = y
  }

  let [intX, floatX] = stringX.split('.')
  let [intY, floatY] = stringY.split('.')
  let diff = Math.abs(floatX.length - floatY.length)
  // 保证x, y小数位一致
  if(floatX.length > floatY.length) {
    for(let i=0; i<diff; i++ ) {
      stringY = stringY + '0'
    }
  } else {
    for(let i=0; i<diff; i++ ) {
      stringX = stringX + '0'
    }
  }
  let i = stringX.length - 1
  let j = stringY.length - 1
  while(j>=0 || i>=0) {
    let a = stringX[i] || '0'
    let b = stringY[j] || '0'
    if(a === '.' && b === '.') {
      result = '.' + result
    } else {
      let sum = parseInt(a) + parseInt(b) + carry
      if(sum > 9) {
        result = sum.toString().slice(1) + result
        carry = 1
      } else {
        result = sum + result
        carry = 0
      }
    }
    j--
    i--
  }
  if(carry > 0) {
    result = '1' + result
  }
  return flag + result
}


function floatSub(x: string, y: string) {
  // x,y小数点后面位数一致, x的值比y大
  if(parseFloat(x) + parseFloat(y) === 0) return '0'
  let result = ''
  let flag = parseFloat(y) + parseFloat(x) >= 0 ?  '' : '-'
  let carry = 0;
  let newX = ''
  let newY = ''
  // 保证newX的绝对值比newY大
  if(Math.abs(parseFloat(y)) > Math.abs(parseFloat(x))) {
    newX = Math.abs(parseFloat(y)).toString()
    newY = Math.abs(parseFloat(x)).toString()
  } else {
    newX = Math.abs(parseFloat(x)).toString()
    newY = Math.abs(parseFloat(y)).toString()
  }
  // 判断x, y是不是浮点数
  let xIsFloat = /\./.test(newX)
  let yIsFloat = /\./.test(newY)

  if(xIsFloat && !yIsFloat) {// x是小数，y是整数
    let [intX, floatX] = newX.split('.')
    newY = newY + '.'
    // 补齐小数位的0
    for(let i=0; i<floatX.length; i++) {
      newY = newY + '0'
    }
  } else if(!xIsFloat && yIsFloat) { // x是整数，y是小数
    let [intY, floatY] = newY.split('.')
    newX = newX + '.'
    // 补齐小数位的0
    for(let i=0; i<floatY.length; i++) {
      newX= newX + '0'
    }
  } else if(xIsFloat && yIsFloat){ // x,y都是小数
    let [intX, floatX] = newX.split('.')
    let [intY, floatY] = newY.split('.')
    let diff = Math.abs(floatX.length - floatY.length)
    // 保持x, y小数位数一致
    if(floatX.length > floatY.length) {
      for(let i=0; i<diff; i++ ) {
        newY = newY + '0'
      }
    } else {
      for(let i=0; i<diff; i++ ) {
        newX = newX + '0'
      }
    }
  }

  let i = newX.length - 1
  let j = newY.length - 1

  while(j>=0 || i>=0) {
    let a = newX[i] || '0'
    let b = newY[j] || '0'
    if(a === '.' && b === '.') {
      result = '.' + result
    } else {
      let sum = parseInt(a) - parseInt(b) - carry
      if(sum < 0) {
        result = String(sum + 10) + result
        carry = 1
      } else {
        result = sum + result
        carry = 0
      }
    }
    j--
    i--
  }
  while(result[0] === '0' && result[1] !== '.') {
    result = result.slice(1)
  }
  return flag + result
}

function calcFloat(x: number|string, y: number|string) {
  let stringX = typeof x === 'string' ? x : '' + x
  let stringY = typeof y === 'string' ? y : '' + y
  let xIsFloat = /\./.test(stringX)
  let yIsFloat = /\./.test(stringY)
  let result = ''
  let valueX = parseFloat(stringX)
  let valueY = parseFloat(stringY)
  // 加法
  if ((valueX >= 0 && valueY >= 0) || (valueX<=0 && valueY <=0)) { // 加法
    if(!xIsFloat && !yIsFloat) {
      result = parseInt(stringX) + parseInt(stringY) + ''
    } else if(xIsFloat && !yIsFloat){
      let [intX, floatX] = stringX.split('.')
      result = parseInt(intX) + parseInt(stringY) + '.' + floatX
    } else if(!xIsFloat && yIsFloat){
      let [intY, floatY] = stringY.split('.')
      result = parseInt(stringX) + parseInt(intY) + '.' + floatY
    } else {
      result = floatSum(stringX, stringY)
    }
  } else { // 减法
    if(!xIsFloat && !yIsFloat) {
      result = parseInt(stringX) + parseInt(stringY) + ''
    } else {
      result = floatSub(stringX, stringY)
    }
  }
  return result
}

export { calcFloat }