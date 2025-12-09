import reducer, {
  clearError,
  getUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
} from '../userSlice';

import { setCookie, deleteCookie } from '../../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api');
jest.mock('../../../utils/cookie');

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

  const mockUser = {
    name: 'Test',
    email: 'test@test.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // ---------------- ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ----------------

  it('getUser.pending — loading = true', () => {
    const state = reducer(initialState, getUser.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getUser.fulfilled — сохраняет пользователя и isAuthenticated = true', () => {
    const state = reducer(
      initialState,
      getUser.fulfilled(mockUser, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('getUser.rejected — loading = false, isAuthenticated = false', () => {
    const state = reducer(initialState, getUser.rejected(null, '', undefined));
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
  });

  // ---------------- ЛОГИН ----------------

  it('loginUser.pending — loading = true', () => {
    const state = reducer(
      initialState,
      loginUser.pending('', { email: 'test@test.com', password: '123' })
    );
    expect(state.loading).toBe(true);
  });

  it('loginUser.fulfilled — сохраняет токены и пользователя', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(mockUser, '', {
        email: 'test@test.com',
        password: '123'
      })
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('loginUser.rejected — записывает ошибку', () => {
    const error = new Error('Ошибка входа');
    const state = reducer(
      initialState,
      loginUser.rejected(error, '', {
        email: 'test@test.com',
        password: '123'
      })
    );

    expect(state.error).toBe('Ошибка входа');
    expect(state.loading).toBe(false);
  });

  // ---------------- РЕГИСТРАЦИЯ ----------------

  it('registerUser.fulfilled — сохраняет пользователя', () => {
    const state = reducer(
      initialState,
      registerUser.fulfilled(mockUser, '', {
        name: 'Test',
        email: 'test@test.com',
        password: '123'
      })
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('registerUser.rejected — error сохраняется', () => {
    const err = new Error('Ошибка регистрации');
    const state = reducer(
      initialState,
      registerUser.rejected(err, '', {
        name: 'Test',
        email: 'test@test.com',
        password: '123'
      })
    );

    expect(state.error).toBe('Ошибка регистрации');
    expect(state.loading).toBe(false);
  });

  // ---------------- ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ----------------

  it('updateUser.fulfilled — обновляет данные пользователя', () => {
    const prevState = { ...initialState, user: mockUser, isAuthenticated: true };

    const newUser = { name: 'Updated', email: 'test@test.com' };

    const state = reducer(
      prevState,
      updateUser.fulfilled(newUser, '', { name: 'Updated' })
    );

    expect(state.user).toEqual(newUser);
    expect(state.loading).toBe(false);
  });

  it('updateUser.rejected — error сохраняется', () => {
    const err = new Error('Ошибка обновления профиля');
    const state = reducer(
      initialState,
      updateUser.rejected(err, '', { name: 'Updated' })
    );

    expect(state.error).toBe('Ошибка обновления профиля');
  });

  // ---------------- ЛОГАУТ ----------------

  it('logoutUser.fulfilled — очищает user и auth', () => {
    const prev = {
      user: mockUser,
      isAuthenticated: true,
      loading: false,
      error: null
    };

    const state = reducer(prev, logoutUser.fulfilled(undefined, '', undefined));

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  // ---------------- REDUCER clearError ----------------

  it('clearError — обнуляет ошибку', () => {
    const prev = { ...initialState, error: 'Ошибка' };

    const state = reducer(prev, clearError());

    expect(state.error).toBeNull();
  });
});