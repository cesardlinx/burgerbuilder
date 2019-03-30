import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ btnType, clicked, children, disabled}) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    disabled={disabled}>{children}</button>
);

Button.propTypes = {
  btnType: PropTypes.oneOf(['Success', 'Danger'])
}

export default Button;
