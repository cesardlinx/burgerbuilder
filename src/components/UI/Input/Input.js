import React from 'react';
import classes from './Input.module.css';
import PropTypes from 'prop-types';

const Input = ({
    elementType,
    elementConfig,
    value,
    changed,
    blured,
    invalid,
    shouldValidate,
    touched,
    errorMessages
  }) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];


  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          onBlur={blured}/>
      );
      break;

    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          onBlur={blured}/>
      );
      break;

    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
          onBlur={blured}>
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
          onChange={changed}
          onBlur={blured}/>
      );
      break;
  }
  return (
    <div className={classes.Input}>
      {inputElement}
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
