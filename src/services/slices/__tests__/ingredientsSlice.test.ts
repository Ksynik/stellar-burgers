import reducer, { fetchIngredients } from '../ingredientsSlice';

describe('ingredientsSlice', () => {
  it('should handle initial state', () => {
    const initial = reducer(undefined, { type: 'unknown' });
    expect(initial.ingredients).toEqual([]);
    expect(initial.loading).toBe(false);
    expect(initial.error).toBeNull();
  });

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(undefined, { type: fetchIngredients.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const payload = [{ _id: '1', name: 'A', type: 'bun', price: 1, image: 'i' }];
    const state = reducer(undefined, { type: fetchIngredients.fulfilled.type, payload });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(payload);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: { message: 'err' } };
    const state = reducer(undefined, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });
});
