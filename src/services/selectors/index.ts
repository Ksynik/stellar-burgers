import { RootState } from '../store';

export const getIngredientsState = (state: RootState) => state.ingredients;
export const getIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const getIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const getIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const getBuns = (state: RootState) =>
  state.ingredients.ingredients.filter((item) => item.type === 'bun');

export const getMains = (state: RootState) =>
  state.ingredients.ingredients.filter((item) => item.type === 'main');

export const getSauces = (state: RootState) =>
  state.ingredients.ingredients.filter((item) => item.type === 'sauce');

export const getConstructorState = (state: RootState) =>
  state.burgerConstructor;
export const getConstructorItems = (state: RootState) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});

export const getUser = (state: RootState) => state.user.user;
export const getIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const getUserLoading = (state: RootState) => state.user.loading;
export const getUserError = (state: RootState) => state.user.error;

export const getFeedOrders = (state: RootState) => state.feed.orders;
export const getFeedTotal = (state: RootState) => state.feed.total;
export const getFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const getFeedLoading = (state: RootState) => state.feed.loading;
export const getFeedError = (state: RootState) => state.feed.error;

export const getOrders = (state: RootState) => state.orders.orders;
export const getCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const getNewOrder = (state: RootState) => state.orders.newOrder;
export const getOrdersLoading = (state: RootState) => state.orders.loading;
export const getOrdersError = (state: RootState) => state.orders.error;
