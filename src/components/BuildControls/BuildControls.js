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
 return <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
  {controls.map(ctrl=>{
      return <BuildControl 
      key={ctrl.label} 
      label={ctrl.label} 
      added={props.ingredientAdded.bind(null,ctrl.type)} 
      removed={props.removeIngredientHander.bind(null,ctrl.type)}
      disabled={props.disabled[ctrl.type]}
      ></BuildControl>
  })}
  <button 
  disabled={!props.purchaseable} 
  className={classes.OrderButton}
  onClick={props.ordered}
  >ORDER NOW!</button>
</div>
}

export default buildControls;