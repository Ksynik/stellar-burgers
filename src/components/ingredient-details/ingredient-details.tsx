import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsLoading
} from '../../services/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(getIngredients);
  const isLoading = useSelector(getIngredientsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  const ingredientData = ingredients.find((item) => item._id === id) || null;

  if (!ingredientData) {
    return (
      <div className='text text_type_main-default'>Ингредиент не найден</div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
