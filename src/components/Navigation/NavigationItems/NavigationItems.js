import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Wraper';
const navigationItems = (props) => (<ul className={classes.NavigationItems}>
  <NavigationItem link="/">Burger Build</NavigationItem>
  {props.isAuthenticated ? <Aux><NavigationItem link="/logout">Logout</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem></Aux>
    : <NavigationItem link="/auth">Authenticate</NavigationItem>}

</ul>)
export default navigationItems;