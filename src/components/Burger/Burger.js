import React from 'react';
import classes from './burger.module.css';
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
  console.log(transformmedIngredients);
    return <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {/* <BurgerIngredient type="cheese"></BurgerIngredient>
      <BurgerIngredient type="meat"></BurgerIngredient> */}
      {transformmedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
}
export default burger;