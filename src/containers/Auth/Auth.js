import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'E-Mail Address'
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        }
      },
    }
  }

  render() {
    const { values, handleChange, errors, touched, isSubmitting} = this.props;

    // flatten controls object
    const formElementsArray = [];
    for (const key in this.state.controls) {
      if (this.state.controls.hasOwnProperty(key)) {
        const element = this.state.controls[key];
        formElementsArray.push({
          id: key,
          config: element
        })
      }
    }


    const form = (
      <Form>
        {formElementsArray.map(({ id, config }) => {
          const invalid = errors[id] && touched[id] ? true : false;

          return (
            <div key={id}>
              <Input
                inputType={config.inputType}
                elementType={config.elementType}
                elementConfig={config.elementConfig}
                value={values[id]}
                invalid={invalid}
                shouldValidate={true}
                touched={touched[id]}
                changed={handleChange}/>
              <p>
                {errors[id] && touched[id] && (
                  <span
                    style={{textAlign: 'left', color: 'rgb(209, 40, 40)', marginLeft: '.9em'}} >{errors[id]}</span>
                )}
              </p>
            </div>
          );
        })}
        <Button btnType="Success" disabled={isSubmitting}>SUBMIT</Button>
      </Form>
    );

    return (
      <div className={classes.Auth}>
        <h4>Enter your Data</h4>
        {form}
      </div>
    );
  }
}

const FormikAuth = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: (values) => {
    console.log(values);
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
  })
})(Auth)

export default FormikAuth;
