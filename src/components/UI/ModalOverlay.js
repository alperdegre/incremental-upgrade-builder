import React from 'react';
import PropTypes from 'prop-types';
import './ModalOverlay.css';

function ModalOverlay({ children }) {
  return <div className={"modal"}>{children}</div>;
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
