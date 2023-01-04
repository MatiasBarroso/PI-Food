import { useState } from 'react';
import './InputLabelForm.css'

const InputLabelForm = ({ type = 'text', label }) => {
    const [value, setValue] = useState('');
  
    function handleChange(e) {
      setValue(e.target.value);
    }
  
    return (
      <div className="input-container">
        <input type={type} value={value} onChange={handleChange} />
        <label className={value && 'filled'} htmlFor='name'>
          {label}
        </label>
      </div>
    );
  }

export default InputLabelForm;