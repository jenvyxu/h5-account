import { CONSTANTS } from 'lib/constants';
const math = require('mathjs');

const generateOutput = (text: string, output: string) => {
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
        return output
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
        return output.slice(0, -1) || '';
      } else {
        return ''
      }
    case CONSTANTS.clear:
      return '';
    case '=':
      let strArr = output.split(/(\+|-)/);
      let valueArr: number[] = []
      let operator: number = 1
      let sum:number = 0
      for( let i=0; i<strArr.length; i++) {
        if(strArr[i] === '') {
          return
        } else if(strArr[i] === '+') {
          operator = 1
        } else if (strArr[i] === '-') {
          operator = -1
        } else {
          let num = parseFloat(strArr[i])
          valueArr.push(num * operator)
        }
      }
      sum = valueArr.reduce((total, val) => {
          if(val > 0) {
            return total.add(val)
          } else {
            return total.subtract(Math.abs(val))
          }
        }, math.chain(sum)).toString()
      return sum
    default:
      return '';
  }
}

export {generateOutput}