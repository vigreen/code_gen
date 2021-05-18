import React, { useState, ChangeEvent } from 'react';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import SVG from '../svg/file.svg'
import { ifElse, F, createCode, generateCode } from '../helpers/functions';
import { defaultPattern } from '../helpers/constants';

const generateFn = (length: number, pattern: string, callback: Function) => {
   const arr = generateCode(length, pattern);

   if (typeof callback === 'function' && arr) {
     callback(arr);
   }
}

function saveAsCsv(arr: string[][]) {
  if (arr.length > 0) {
    const csv = unparse(arr);
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
    saveAs(blob, "keys.csv");
  }
}

function saveAsTxt(arr: string[][]) {
  if (arr.length > 0) {
    const flatArr = arr.flatMap(a => a);
    const text = new Blob([JSON.stringify(flatArr)], {type: "text/plain;charset=utf-8"});
    saveAs(text, "keys.txt");
  }
}

function Form() {
  const [pattern, handlePattern] = useState<string>(defaultPattern);
  const [length, handleLength] = useState<number>(100);
  const [arr, handleArr] = useState<string[][]>([]);

  const ptrn = pattern.length ? pattern : defaultPattern;
  const lngth = length > 0 ? length : 1

  const saveWrapStyle = arr.length > 0 ? 'save-button button-border mt-12' : 'save-button mt-12 save-button-disabled';
  const saveBtnStyle = arr.length > 0 ? 'button' : 'button button-disabled';

  return (
    <div className="reg-form">
      <img src="./logo_large.svg" alt="logo" />
      <h1 className='bold'>Generate Codes for Free using your pattern</h1>
      <label className='input-label'>
        <p>Number of codes</p>
        <input placeholder='1 - 10 000' value={length} onChange={(e: ChangeEvent<HTMLInputElement>) => ifElse(Number.isFinite(+e.target.value) && !Number.isNaN(+e.target.value), () => handleLength(+e.target.value), F)}/>
      </label>
      <label className='input-label'>
        <p>Pattern</p>
        <input placeholder='Pattern' value={pattern} onChange={(e: ChangeEvent<HTMLInputElement>) => handlePattern(e.target.value)}/>
      </label>
      <label className='input-label'>
        <p className='flex-title'>Code example</p>
        <input className='input-disabled' placeholder='Example' value={createCode(pattern)} onChange={() => false} disabled />
      </label>
      <ul>
	      <li>"A" - uppercase number or char,</li>
        <li>"a" - lowercase char or number,</li>
        <li>"C" - only uppercase char,</li>
        <li>"c" - only lowercase char,</li>
        <li>"9" - random number,</li>
        <li>"x" or "X" - random number or char with random style (lowercase or uppercase).</li>
      </ul>
      <button className="button button-width button-border mt-12" onClick={() => generateFn(lngth, ptrn, handleArr)}><object type="image/svg+xml" data={SVG} />Generate Codes</button>
      <div className={saveWrapStyle}>
      	<button className={saveBtnStyle} onClick={() => saveAsCsv(arr)}>.csv</button>
      	<button className={saveBtnStyle} onClick={() => saveAsTxt(arr)}>.txt</button>
      	<div className="save-icon"><div /></div>
      </div>
    </div>
  );
}

export default Form;