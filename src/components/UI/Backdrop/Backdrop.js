import React from 'react';
import classes from './backdrop.module.css';
const backdrop = (props)=> (props.show ? <div onClick={props.clicked} className={classes.Backdrop}></div>:null)
;
export default backdrop;