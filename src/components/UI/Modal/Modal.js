import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const Modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
          pointerEvents: props.show ? 'auto' : 'none',
        }}
        className={classes.Modal}>
        {props.children}
      </div>
  </Aux>
  // </Backdrop>
);


export default Modal;
