import { useAuthStore } from '@/store/useAuthStore';
import { convertFilterString } from '@/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export type InitialFilterType = 'mine' | 'bookmark' | 'all';

const initialState = 'all';

const filterConfig = {
  bookmark: convertFilterString('id', '=', useAuthStore.getState().user?.heart),
  mine: convertFilterString('id', '=', useAuthStore.getState().user?.id),
  all: null,
};

const usePlaceFilter = () => {
  const { state } = useLocation();
  const [filterOptions, setFilterOptions] =
    useState<InitialFilterType>(initialState);
  const filterArray = [];
  let dateString = '';
  const typeString = filterConfig[filterOptions];
  if (typeString !== null) filterArray.push(typeString);
  if (state !== null) {
    dateString = `(minDate > "${state[0].toISOString()}" && maxDate < "${state[1].toISOString()}")`;
    filterArray.push(dateString);
  }
  const filterString = filterArray.join(' && ');
  return { filterOptions, setFilterOptions, filterString };
};

export default usePlaceFilter;
