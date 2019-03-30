import React from 'react';
import classes from './Input.module.css';
import PropTypes from 'prop-types';

const Input = ({
    elementType,
    elementConfig,
    value,
    changed,
    invalid,
    shouldValidate,
    touched,
    errorMessages
  }) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  let errorFeedback = null;

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
    errorFeedback = errorMessages.map((message, index) => (
      <p
        key={index}
        style={{textAlign: 'left', color: 'rgb(209, 40, 40)'}}>{message}</p>
    ));
  }

  switch (elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}/>
      );
      break;

    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}/>
      );
      break;

    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      )
      break;

    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}/>
      );
      break;
  }
  return (
    <div className={classes.Input}>
      {inputElement}
      {invalid && errorFeedback}
    </div>
  );
};

Input.propTypes = {
  elementConfig: PropTypes.object,
  elementType: PropTypes.oneOf(['input', 'textarea', 'select']),
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default Input;
