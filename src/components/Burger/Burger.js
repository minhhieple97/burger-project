import React from 'react';
import classes from './burger.module.css';
import {withRouter} from 'react-router-dom';//Sử dụng withRouter như một HOC được cung cấp bởi react-router-dom giúp các childComponent được injection props của react-router-dom như history, params..
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props)=>{
  let transformmedIngredients = Object.keys(props.ingredients)
  .map(igKey=>{
    return [...Array(props.ingredients[igKey])].map((_,i)=>{
     return  <BurgerIngredient key={igKey+i} type={igKey}></BurgerIngredient>
    });
  })
  .reduce((arr,el)=>{
    return arr.concat(el);
  },[]);
  if(transformmedIngredients.length===0){
    transformmedIngredients = 'Please start adding ingredients!';
  }
    return <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {/* <BurgerIngredient type="cheese"></BurgerIngredient>
      <BurgerIngredient type="meat"></BurgerIngredient> */}
      {transformmedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
}
export default withRouter(burger);