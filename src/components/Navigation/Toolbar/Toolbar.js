import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props)=>(<header className={classes.Toolbar}> 
    <DrawerToggle 
     clicked={props.drawerToggleClicked} 
    /> 
    {/* Ở giao diện mobile (width<500px) thì DrwaerToggle mới hiển thị */}
    <div className={classes.Logo}>
     <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems></NavigationItems>
    </nav>
</header>)
export default toolbar;


// import React, { Component } from 'react'
// import classes from './toolbar.module.css';
// import Logo from '../../Logo/Logo';
// import NavigationItems from '../NavigationItems/NavigationItems';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
// export default class Toolbar extends Component {
//     render() {
//         return (<header className={classes.Toolbar}> 
//             <DrawerToggle 
//              clicked={this.props.drawerToggleClicked} 
//             /> 
//             {/* Ở giao diện mobile (width<500px) thì DrwaerToggle mới hiển thị */}
//             <div className={classes.Logo}>
//              <Logo />
//             </div>
//             <nav className={classes.DesktopOnly}>
//                 <NavigationItems></NavigationItems>
//             </nav>
//         </header>)
//     }
// }
