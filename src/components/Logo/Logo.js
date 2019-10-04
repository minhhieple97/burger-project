import React from 'react';
import classes from './logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png';
const logo = (props)=><div className={classes.Logo} style={{height:props.height}} >
        <img src={burgerLogo} alt="MyBurger"></img>
                     </div>
export default logo;
