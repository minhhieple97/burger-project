import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props)=>(<header className={classes.Toolbar} >
    <div>MENU</div>
    <div className={classes.Logo}>
     <Logo height="80%" />
    </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems></NavigationItems>
    </nav>
</header>)
export default toolbar;