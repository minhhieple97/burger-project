import React from 'react';
import classes from './navigationItem.module.css'
export default (props)=><li className={classes.NavigationItem}> 
 <a 
 href={props.link}
 className={props.active ? classes.active : null}
 >{props.children}
 
 </a>
</li>