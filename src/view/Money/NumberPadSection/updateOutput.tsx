import { CONSTANTS } from 'lib/constants';
import {Decimal} from 'decimal.js';

export default function updateOutput(text: string, output: string) {
  switch(text) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if(output === '0') {
        return text;
      } else if(/([+-])0$/.test(output)) {
        return output.slice(0, -1) + text
      } else {
        return output + text;
      }
    case '+':
      if(/\.$/.test(output)) {
        return output + '0' + text;
      } else if(/\D$/.test(output)){
        return output.slice(0, -1) + text
      } else if(output === '0') {
        return output
      } else {
        return output + text
      }
    case '-':
      if(/\.$/.test(output)) {
        return output + '0' + text;
      } else if(/\D$/.test(output)){
        return output.slice(0, -1) + text
      } else if(output === '0') {
        return '-'
      } else {
        return output + text
      }
    case '.':
      if(/(\.\d*|\D)$/.test(output)) {
        return output;
      } else {
        return output + '.';
      }
    case CONSTANTS.delete:
      if(output.length > 1) {
        return output.slice(0, -1) || '0';
      } else {
        return '0'
      }
    case CONSTANTS.clear:
      return '0';
    case '=':
      let strArr = output.split(/(\+|-)/)
      let newStrArr = transArray(strArr)
      let total = newStrArr.reduce((sum, cur)=> {
        return sum.plus(cur)
      }, new Decimal(0))
      return total.valueOf()
    default:
      return '0';
  }
}

// 数字和符号合并、移除空字符串
function transArray(strArr: Array<string>) {
  strArr.forEach((str, index) => {
    if(str === '') {
      strArr[index] = '0'
    }
  })

  return strArr.reduce((arr: Array<string>, val) => {
    // 数组最后一个是符号
    if(/(\+|-)/.test(val) || arr.length === 0){
      arr.push(val)
    } else {
      arr[arr.length-1] = arr[arr.length-1] + val
    }
    return arr
  }, [])
}