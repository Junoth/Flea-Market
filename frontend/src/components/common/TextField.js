import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputField = ({
  name,
  placeholder,
  label,
  value,
  error,
  onChange
}) => { 
  return (
    <div className="form-group text-left">
      {label && <label className="input-label">{ label }</label>}
      <div className="input-group input-group-sm">
        <textarea 
          className={classnames('form-control', {
            'is-invalid': error
          })}
          name={ name } 
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
          style={{height: '20vh'}}
        />
        {error && (<div className="invalid-feedback">{ error }</div>)}
      </div>
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default InputField;
