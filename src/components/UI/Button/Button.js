import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ btnType, clicked, children}) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}>{children}</button>
);

Button.propTypes = {
  btnType: PropTypes.oneOf(['Success', 'Danger'])
}

export default Button;
