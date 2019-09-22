import React from 'react';
import Aux from '../../hoc/Wraper';
import classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = (props)=>{
    return <Aux>
        <Toolbar></Toolbar>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
}
export default layout;


