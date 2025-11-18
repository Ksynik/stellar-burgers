import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface TIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;

          const price300Names = [
            'биокотлета из марсианской магнолии',
            'говяжий метеорит',
            'мясо бессмертных моллюсков protostomia',
            'филе люминесцентного тетраодонтимформа'
          ];

          const price30Names = [
            'соус с шипами антарианского плоскоходца',
            'соус традиционный галактический',
            'соус фирменный space sauce',
            'соус spicy-x'
          ];

          const price80Names = [
            'сыр с астероидной плесенью',
            'мини-салат экзо-плантаго',
            'хрустящие минеральные кольца',
            'кристаллы марсианских альфа-сахаридов',
            'плоды фалленианского дерева'
          ];

          const normalized = action.payload.map((item) => {
            const nameLower = item.name ? item.name.toLowerCase() : '';

            if (price300Names.some((n) => nameLower.includes(n))) {
              return { ...item, price: 300 };
            }

            if (price30Names.some((n) => nameLower.includes(n))) {
              return { ...item, price: 30 };
            }

            if (price80Names.some((n) => nameLower.includes(n))) {
              return { ...item, price: 80 };
            }

            if (item.type === 'bun') {
              return { ...item, price: 20 };
            }

            if (
              nameLower.includes('филе') ||
              nameLower.includes('мясо') ||
              nameLower.includes('fillet') ||
              nameLower.includes('meat')
            ) {
              return { ...item, price: 200 };
            }

            return item;
          });

          state.ingredients = normalized;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  }
});

export default ingredientsSlice.reducer;
