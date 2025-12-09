import reducer, { createOrder, clearNewOrder } from '../ordersSlice';

const mockOrder = { number: 12345 };

describe('ordersSlice', () => {
  it('should handle initial state', () => {
    const initial = reducer(undefined, { type: 'unknown' } as any);
    expect(initial.orders).toEqual([]);
    expect(initial.newOrder).toBeNull();
    expect(initial.loading).toBe(false);
  });

  it('should set loading on createOrder.pending', () => {
    const state = reducer(undefined, { type: createOrder.pending.type });
    expect(state.loading).toBe(true);
  });

  it('should set newOrder on createOrder.fulfilled', () => {
    const state = reducer(undefined, { type: createOrder.fulfilled.type, payload: mockOrder as any });
    expect(state.loading).toBe(false);
    expect(state.newOrder).toEqual(mockOrder);
  });

  it('should clear newOrder on clearNewOrder', () => {
    const stateWith = reducer(undefined, { type: createOrder.fulfilled.type, payload: mockOrder as any });
    const cleared = reducer(stateWith, clearNewOrder());
    expect(cleared.newOrder).toBeNull();
  });
});
