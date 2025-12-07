import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';


const makeIngredient = (overrides?: Partial<TIngredient>): TIngredient => ({
  _id: '1',
  name: 'Test Bun',
  type: 'bun',
  price: 100,
  image: 'img',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  image_mobile: 'img_mobile',
  image_large: 'img_large',
  ...overrides
});

const mockIngredient = makeIngredient();
const mockMain = makeIngredient({ _id: '2', type: 'main' });

describe('constructorSlice', () => {
  it('should handle initial state', () => {
    const initial = reducer(undefined, { type: 'unknown' } as any);
    expect(initial.bun).toBeNull();
    expect(initial.ingredients).toHaveLength(0);
  });

  it('should add bun and ingredients', () => {
    const state1 = reducer(undefined, addIngredient(mockIngredient));
    expect(state1.bun).not.toBeNull();

    const state2 = reducer(state1, addIngredient(mockMain));
    expect(state2.ingredients).toHaveLength(1);
    expect(state2.ingredients[0]._id).toEqual('2');
  });

  it('should remove ingredient by id', () => {
    const state = reducer(undefined, addIngredient(mockMain));
    const id = state.ingredients[0].id;
    const stateAfter = reducer(state, removeIngredient(id));
    expect(stateAfter.ingredients).toHaveLength(0);
  });

  it('should move ingredients', () => {
    let state = reducer(undefined, addIngredient(mockMain));
    state = reducer(state, addIngredient(makeIngredient({ _id: '3', type: 'main' })));

    const stateMoved = reducer(state, moveIngredient({ from: 0, to: 1 }));

    expect(stateMoved.ingredients[0]._id).toEqual('3');
    expect(stateMoved.ingredients[1]._id).toEqual('2');
  });

  it('should clear constructor', () => {
    let state = reducer(undefined, addIngredient(mockIngredient));
    state = reducer(state, addIngredient(mockMain));
    const cleared = reducer(state, clearConstructor());

    expect(cleared.bun).toBeNull();
    expect(cleared.ingredients).toHaveLength(0);
  });
});

