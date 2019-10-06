import React from 'react'
import classes from './drawerToggle.module.css';
export default function DrawerToggle(props) {//Chỉ hiển thị ở giao diện mobile 
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
