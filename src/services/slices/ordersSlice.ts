import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi, getOrdersApi } from '../../utils/burger-api';

interface OrdersState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  newOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  newOrder: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'orders/create',
  async (ingredients) => {
    const res = await orderBurgerApi(ingredients);
    return res.order;
  }
);

export const getUserOrders = createAsyncThunk<TOrder[]>(
  'orders/getUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.newOrder = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      })

      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const { clearNewOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
