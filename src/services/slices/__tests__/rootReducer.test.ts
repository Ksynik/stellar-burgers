import rootReducer from '../rootReducer';

describe('rootReducer', () => {
  it('returns combined initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('user');
  });
});

