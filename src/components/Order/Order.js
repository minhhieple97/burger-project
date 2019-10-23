import React from 'react'
import classes from './order.module.css';
export default function Order(props) {
    const ingredients = [];
    for (const ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName]});
     }
     const ingredientOutput = ingredients.map(ig=>{
       return <span style={{
           textTransform:'capitalize',
           display:'inline-block',
           margin:'0 8px',
           border:'1px solid #ccc',
           padding:'5px'
       }} key={ig.name} >
        {ig.name} ({ig.amount})
       </span>
     });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}
// Component này đại diện cho một order nó sẽ được ghép lại thành các childComponent của component Orders trong thư mục Order.