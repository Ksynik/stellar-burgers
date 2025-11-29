import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  getNewOrder,
  getCurrentOrder,
  getIngredients
} from '../../services/selectors';
import { getOrderByNumber } from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const orderNumber = number ? Number(number) : undefined;
  const dispatch = useDispatch();

  const newOrder = useSelector(getNewOrder);
  const currentOrder = useSelector(getCurrentOrder);
  const ingredients: TIngredient[] = useSelector(getIngredients);

  useEffect(() => {
    if (orderNumber && (!currentOrder || currentOrder.number !== orderNumber)) {
      dispatch(getOrderByNumber(orderNumber));
    }
  }, [orderNumber, currentOrder, dispatch]);

  const orderData = orderNumber ? currentOrder : newOrder;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
