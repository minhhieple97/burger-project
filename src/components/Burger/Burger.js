import React from 'react';
import classes from './burger.module.css';
import { withRouter } from 'react-router-dom';//Sử dụng withRouter như một HOC được cung cấp bởi react-router-dom giúp các childComponent được injection props của react-router-dom như history, params..
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
  let transformmedIngredients = Object.keys(props.ingredients)//Gom các key của object ingredients thành một mảng
    .map(
      igKey => (
        [...Array(props.ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />)
        //Tạo ra một mảng với length là number của mỗi ingrident map nó thành một mảng khác là một list các ingridient với type là igKey, key là sự kết hợp của igKey và i (vị trí của phần tử trong mảng.)
        //Ví dụ <BurgerIngredient key="cheese1" type="cheese" />
        )
    )
    .reduce((arr, el) => arr.concat(el), []);//transform mảng về một mảng mới thay vì các phần tử trong mảng là mảng thì các phần tử sẽ object, không còn hiện tượng mảng lồng mảng nữa.
  if (transformmedIngredients.length === 0) {
    transformmedIngredients = 'Please start adding ingredients!';
  }
  return <div className={classes.Burger}>
    <BurgerIngredient type="bread-top"></BurgerIngredient>
    {transformmedIngredients}
    <BurgerIngredient type="bread-bottom"></BurgerIngredient>
  </div>
}
export default withRouter(burger);