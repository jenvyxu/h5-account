import React, {useState} from 'react';
import {Wrapper} from './NumberPadSection/Wrapper';
import updateOutput from './NumberPadSection/updateOutput';
import { CONSTANTS } from 'lib/constants';

type Props = {
  value: number;
  onChange: (value: number) => void;
  saveRecord: () => void;
}

const NumberPadSection: React.FC<Props> = ({saveRecord, onChange, value}) => {
  const [output, setOutput] = useState(value + '')

  const handleClickPad = (e: React.MouseEvent) => {
    const text = (e.target as HTMLElement).textContent
    if(text === null) return
    // 保存记账信息
    if(text === '完成') {
      saveRecord()
      onChange(0)
      setOutput('0')
      return
    }
    // 限制输入长度为20
    let result = updateOutput(text, '' + output)
    if(result.length > 20) return
    // 更新显示信息    
    setOutput(result)
    onChange(+result)
  }

  return (
    <Wrapper>
      <div className="output">{output}</div>
      <div className="pad clearfix" onClick={handleClickPad}>
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
        <button className="btn-zero">0</button>
        <button>{CONSTANTS.clear}</button>
        <button className="btn-complete">{/^\-?\d+\.?\d*$/.test(output)  ? CONSTANTS.complete : '='}</button>
      </div>
    </Wrapper>
  )
}

export { NumberPadSection }