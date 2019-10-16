import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = ()=>(<ul className={classes.NavigationItems}>
  <NavigationItem link="/">Burger Build</NavigationItem>
  <NavigationItem link="/orders">Orders</NavigationItem>
</ul>)
export default navigationItems;