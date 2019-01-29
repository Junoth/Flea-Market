import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputField = ({
  name,
  placeholder,
  icon,
  label,
  value,
  error,
  type,
  onChange
}) => { 
  return (
    <div className="form-group text-left">
      {label && <label className="input-label">{ label }</label>}
      <div className="input-group input-group-sm">
        {icon && <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon}></i>
          </span>
        </div>}
        <input 
          className={classnames('form-control', {
            'is-invalid': error
          })}
          type={ type } 
          name={ name } 
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
        />
        {error && (<div className="invalid-feedback">{ error }</div>)}
      </div>
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputField.defaultProps = {
  type: 'text'
};

export default InputField;
