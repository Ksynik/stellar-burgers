import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import feedReducer from './feedSlice';
import ordersReducer from './ordersSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  orders: ordersReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
