import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const Burger = ({ ingredients }) => {

  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    }) // [[{},{}], [{}], [{},{}], [{},{},{}]] es un arreglo de arreglos
    // en donde cada arreglo pertenece a un tipo de ingrediente y
    // el numero de objetos dentro es la cantidad de ese ingrediente
    .reduce((arr, el) => {
      return  arr.concat(el); // [{}, {}, {}, {}, ...] en donde cada objeto
      // es un elemento JSX perteneciente a los ingredientes
    }, []);


  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients.</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}

export default withRouter(Burger);

