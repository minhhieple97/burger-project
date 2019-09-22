import React from 'react';
import classes from './backdrop.module.css';
const backdrop = (props)=> props.show ? <div onClick={props.hideModal} className={classes.Backdrop}></div>:null
;
export default backdrop;