import React from 'react';
import PropTypes from 'prop-types';

const ReadField = ({
  label,
  value,
  type
}) => { 
  return (
    <div className="form-group text-left">
      {label && <label className="input-label">{ label }</label>}
      <div className="input-group input-group-sm">
        <input type={type} className="form-control" value={ value } readOnly/>
      </div>
    </div>
  );
};

ReadField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ReadField.defaultProps = {
  type: 'text'
}

export default ReadField;
