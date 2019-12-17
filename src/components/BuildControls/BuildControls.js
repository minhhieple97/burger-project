import React from 'react';
import classes from './buildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
  {label:'Salad',type:'salad'},
  {label:'Bacon',type:'bacon'},
  {label:'Cheese',type:'cheese'},
  {label:'Meat',type:'meat'},
];
const buildControls = (props)=>{
  const {price,ingredientAdded,removeIngredientHander,disabled} = props
 return <div className={classes.BuildControls}>
    <p>Current Price: <strong>{price.toFixed(2)}$</strong></p>
  {controls.map(ctrl=><BuildControl 
      key={ctrl.label} 
      label={ctrl.label} 
      added={ingredientAdded.bind(null,ctrl.type)} 
      removed={removeIngredientHander.bind(null,ctrl.type)}
      disabled={disabled[ctrl.type]}
      />
  )}
  <button 
  disabled={!props.purchaseable} 
  className={classes.OrderButton}
  onClick={props.ordered}
  >{props.isAuth?'ORDER NOW!':'SIGNUP TO ORDER'}</button>
</div>
};
export default buildControls;