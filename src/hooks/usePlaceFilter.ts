import { useAuthStore } from '@/store/useAuthStore';
import { convertFilterString } from '@/utils';
import { useState } from 'react';

export type InitialFilterType = 'mine' | 'bookmark' | 'all';

const initialState = 'all';

const filterConfig = {
  bookmark: convertFilterString('id', '=', useAuthStore.getState().user?.heart),
  mine: convertFilterString('id', '=', useAuthStore.getState().user?.id),
  all: '',
};

const usePlaceFilter = () => {
  const [filterOptions, setFilterOptions] =
    useState<InitialFilterType>(initialState);

  const filterString = filterConfig[filterOptions];

  return { filterOptions, setFilterOptions, filterString };
};

export default usePlaceFilter;
