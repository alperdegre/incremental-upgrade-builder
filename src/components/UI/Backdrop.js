import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.css';

function Backdrop({ onClose }) {
  return (
    <div
      role="button"
      className={"backdrop"}
      onClick={onClose}
      onKeyDown={onClose}
      tabIndex={0}
      aria-label="Close modal"
    />
  );
}

Backdrop.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Backdrop;
