'use client';

import { createContext } from 'react';

const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || '[]';
  }
  return '[]';
};

export const initialFavState = {
  favoritesId: JSON.parse(getLocalStorageItem('favoritesId')), //массив id
  favoritesInfo: JSON.parse(getLocalStorageItem('favoritesInfo')), //массив карточек (данных для них)
  favoritesRating: JSON.parse(getLocalStorageItem('favoritesRating')), //массив пар id + оценка
};

export const favReducer = (favState, action) => {
  switch (action.type) {
    case 'ADD_ID_TO_FAVORITES':
      return { ...favState, favoritesId: [...favState.favoritesId, action.payload] };
    case 'REMOVE_ID_FROM_FAVORITES':
      return { ...favState, favoritesId: favState.favoritesId.filter((movie) => movie !== action.payload) };
    case 'ADD_ITEM_TO_FAVORITES':
      return { ...favState, favoritesInfo: [...favState.favoritesInfo, action.payload] };
    case 'REMOVE_ITEM_FROM_FAVORITES':
      return { ...favState, favoritesInfo: favState.favoritesInfo.filter((movie) => movie.id !== action.payload) };
    case 'SET_RATING_FOR_ITEM':
      return { ...favState, favoritesRating: [...favState.favoritesRating, action.payload] };
    case 'REMOVE_RATING_FROM_ITEM':
      return { ...favState, favoritesRating: favState.favoritesRating.filter((rateObj) => rateObj.itemId !== action.payload) };
    default:
      return favState;
  }
};

export const FavContext = createContext({
  favState: initialFavState,
  favDispatch: () => {},
});
