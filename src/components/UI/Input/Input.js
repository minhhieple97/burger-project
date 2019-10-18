import React from 'react'
import classes from './input.module.css';
export default function Input(props) {
    let inputElement = null;
    let validationError = null;
    if(props.invalid&&props.checkClicked){
        validationError = <p className={classes.ValidationError} >Please enter a valid {props.valueType}</p>;
    }
    const inputClasses = [classes.InputElement];
    if(props.invalid&&(props.elementType!=='select')&&props.checkClicked){
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}   {...props.elementConfig} onChange={props.changed} value={props.value} onClick={props.clicked}  />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} onClick={props.clicked}  />
            break;
        case ('select'):
            inputElement = <select 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            onChange={props.changed} 
            value={props.value} >
              {props.elementConfig.options.map(option=>(
                  <option key={option.value} value={option.value} >
                      {option.displayValue}
                  </option>
              ))}
            </select>
            break;
        default:
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value} 
            />;
    }
    if(validationError){
        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                {inputElement}
                {validationError}
            </div>
        );
    }
    return (
        <div className={classes.Input} >
            <label className={classes.Label}  >{props.label}</label>
            {inputElement}
        </div>
    )
}
