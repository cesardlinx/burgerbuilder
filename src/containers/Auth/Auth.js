import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      },
      isSignup: true
    };

    this.validationSchema = validationSchema;

  }


  handleSwitchMode = () => {
    this.setState(prevState => ({isSignup: !prevState.isSignup}));
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const values = this.props.values
    this.validationSchema.isValid(values) // porque los values los tiene formik
      .then(valid => {
        if (valid) {
          this.props.onAuth(values, this.state.isSignup);
        } else {
          this.props.onAuthFail({
            code: 400,
            message: 'DATA_INVALID'
          });
        }
      });
  }

  render() {
    const { values, handleChange, handleBlur, errors, touched, isSubmitting} = this.props;

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

    // Error Message
    let errorMessage = null

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    // form
    const form = (
      <div>
        {this.props.error && errorMessage}
        <form onSubmit={this.handleSubmit} noValidate>
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
                  changed={handleChange}
                  blured={handleBlur}/>
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
        </form>
        <Button btnType="Danger" clicked={this.handleSwitchMode}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
        <pre style={{textAlign: 'left'}}>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );

    return (
      <div className={classes.Auth}>
        <h4>Enter your Data</h4>
        {this.props.isLoading ? <Spinner /> : form}
      </div>
    );
  }
}

const FormikAuth = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema
})(Auth);


const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (payload, isSignup) => dispatch(actions.auth(payload, isSignup)),
    onAuthFail: (error) => dispatch(actions.authFail(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikAuth);
