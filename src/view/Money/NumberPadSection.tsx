import React, {useState} from 'react';
import {Wrapper} from './NumberPadSection/Wrapper';
import {generateOutput} from './NumberPadSection/generateOutput';
import { CONSTANTS } from 'lib/constants';

type Props ={
  value: number;
  onChange: (value: number) => void;
  onOk?: () => void;
}
const NumberPadSection: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState(props.value.toString())
  const setOutput = (output: string) => {
    let newOutput: string
    if(output.length > 20) {
      newOutput = output.slice(0, 20)
    } else if(output.length === 0 ) {
      newOutput = '0'
    } else {
      newOutput = output
    }
    _setOutput(newOutput)
    props.onChange(parseFloat(newOutput))
  }
  const ocClickButtonWrapper = (e: React.MouseEvent) => {
    const text= (e.target as HTMLButtonElement).textContent
    if(text === null) {return}
    if(text === '完成') {
      if(props.onOk){
        props.onOk()
        _setOutput('0')
      }
      return
    }
    // @ts-ignore
    setOutput(generateOutput(text, output))
  }
  return (
    <Wrapper>
      <div className="output">{output}</div>
      <div className="pad clearfix"
            onClick={ocClickButtonWrapper}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>{CONSTANTS.delete}</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button className="zero">0</button>
        <button>{CONSTANTS.clear}</button>
        <button className="ok">{/(\D)/.test(output)  ? '=' : CONSTANTS.complete}</button>
      </div>
    </Wrapper>
  )
}

export { NumberPadSection }