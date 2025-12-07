import rootReducer from '../rootReducer';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructorSlice';
import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import feedReducer, { getFeeds } from '../feedSlice';
import ordersReducer, { createOrder, clearNewOrder } from '../ordersSlice';
import userReducer from '../userSlice';

describe('rootReducer', () => {
  it('returns combined initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      feed: feedReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});

describe('burgerConstructor reducer', () => {
  const initialState = constructorReducer(undefined, { type: 'UNKNOWN_ACTION' });

  it('handles addIngredient (bun assigned)', () => {
    const ingredient = {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      price: 100,
      proteins: 10,
      fat: 5,
      carbohydrates: 50,
      calories: 250,
      image: 'image_url',
      image_mobile: 'image_mobile_url',
      image_large: 'image_large_url'
    };
    const state = constructorReducer(initialState, addIngredient(ingredient));
    expect(state.bun).toMatchObject(ingredient);
  });

  it('handles removeIngredient', () => {
    const ingredient = {
      _id: '2',
      name: 'Meat',
      type: 'main',
      price: 200,
      proteins: 20,
      fat: 10,
      carbohydrates: 0,
      calories: 300,
      image: 'image_url',
      image_mobile: 'image_mobile_url',
      image_large: 'image_large_url'
    };
    const addedState = constructorReducer(initialState, addIngredient(ingredient));
    const generatedId = addedState.ingredients[0].id;
    const state = constructorReducer(addedState, removeIngredient(generatedId));
    expect(state.ingredients).not.toContainEqual(expect.objectContaining({ id: generatedId }));
  });

  it('handles moveIngredient', () => {
    const ingredient1 = { _id: '1', name: 'Lettuce', type: 'main' };
    const ingredient2 = { _id: '2', name: 'Meat', type: 'main' };
    let state = constructorReducer(initialState, addIngredient(ingredient1 as any));
    state = constructorReducer(state, addIngredient(ingredient2 as any));
    state = constructorReducer(state, moveIngredient({ from: 0, to: 1 }));
    expect(state.ingredients[0]).toMatchObject(ingredient2);
    expect(state.ingredients[1]).toMatchObject(ingredient1);
  });

  it('handles clearConstructor', () => {
    const ingredient = { _id: '1', name: 'Bun', type: 'bun' } as any;
    const stateWithItem = constructorReducer(initialState, addIngredient(ingredient));
    const state = constructorReducer(stateWithItem, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});

describe('ingredients reducer', () => {
  const initialState = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });

  it('handles fetchIngredients.pending', () => {
    const state = ingredientsReducer(initialState, { type: fetchIngredients.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fetchIngredients.fulfilled', () => {
    const payload = [{ _id: '1', name: 'Bun', type: 'bun', price: 1, image: 'i' }];
    const state = ingredientsReducer(initialState, { type: fetchIngredients.fulfilled.type, payload });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(payload);
    expect(state.error).toBeNull();
  });

  it('handles fetchIngredients.rejected', () => {
    const state = ingredientsReducer(initialState, { type: fetchIngredients.rejected.type, error: { message: 'Error' } });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });
});

describe('feed reducer', () => {
  const initialState = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });

  it('handles getFeeds.pending', () => {
    const state = feedReducer(initialState, { type: getFeeds.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles getFeeds.fulfilled', () => {
    const payload = { orders: [{ number: 1 }], total: 1, totalToday: 1 };
    const state = feedReducer(initialState, { type: getFeeds.fulfilled.type, payload });
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });

  it('handles getFeeds.rejected', () => {
    const state = feedReducer(initialState, { type: getFeeds.rejected.type, error: { message: 'Error' } });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });
});

describe('orders reducer', () => {
  const initialState = ordersReducer(undefined, { type: 'UNKNOWN_ACTION' });

  it('handles createOrder.pending', () => {
    const state = ordersReducer(initialState, { type: createOrder.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles createOrder.fulfilled', () => {
    const payload = { number: 12345 };
    const state = ordersReducer(initialState, { type: createOrder.fulfilled.type, payload });
    expect(state.loading).toBe(false);
    expect(state.newOrder).toEqual(payload);
  });

  it('handles createOrder.rejected', () => {
    const state = ordersReducer(initialState, { type: createOrder.rejected.type, error: { message: 'Error' } });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('handles clearNewOrder', () => {
    const stateWithOrder = ordersReducer(initialState, { type: createOrder.fulfilled.type, payload: { number: 12345 } });
    const state = ordersReducer(stateWithOrder, clearNewOrder());
    expect(state.newOrder).toBeNull();
  });
});

describe('user reducer', () => {
  const initialState = userReducer(undefined, { type: 'UNKNOWN_ACTION' });

  it('returns the expected initial user state', () => {
    expect(initialState).toEqual({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  });
});
