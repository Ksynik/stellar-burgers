import reducer, { getFeeds } from '../feedSlice';
import { TOrder } from '../../../utils/types';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  test('должен вернуть initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('getFeeds.pending → loading = true', () => {
    const state = reducer(initialState, { type: getFeeds.pending.type });

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('getFeeds.fulfilled → данные сохраняются', () => {
    const payload = {
      orders: [
        { number: 1, name: 'Тестовый бургер' } as TOrder,
        { number: 2, name: 'Ещё один бургер' } as TOrder
      ],
      total: 500,
      totalToday: 20
    };

    const state = reducer(initialState, {
      type: getFeeds.fulfilled.type,
      payload
    });

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(500);
    expect(state.totalToday).toBe(20);
  });

  test('getFeeds.rejected → ошибка сохраняется', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});