import React, { PropTypes } from 'react';

/**
 * Renders an input field of type text
 * @param {any} { id, name, type, errorText,
 *   floatText, value, handleChange }
 * @returns {object} jsx
 */
function TextInput({ id, name, type, errorText,
  floatText, value, handleChange, disabled }) {
  return (
    <div className="input-field">
      <label htmlFor={id} className="active">{floatText}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      {errorText && <div className="red-text small">{errorText}</div>}
    </div>
  );
}
TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled:PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  type: PropTypes.string.isRequired,
  floatText: PropTypes.string
};
export default TextInput;
