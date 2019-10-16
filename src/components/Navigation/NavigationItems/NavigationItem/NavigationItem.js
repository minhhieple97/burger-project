import React from 'react';
import classes from './navigationItem.module.css';
import {NavLink} from 'react-router-dom';
export default (props)=><li className={classes.NavigationItem}> 
 <NavLink 
 to={props.link}
 activeClassName={classes.active}
 exact
 >{props.children}
 </NavLink>
</li>