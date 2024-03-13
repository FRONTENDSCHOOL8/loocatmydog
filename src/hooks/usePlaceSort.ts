import { useState } from 'react';

export type InitialSortType = {
  id: string;
  label: string;
};
export const initialState: InitialSortType[] = [
  {
    id: 'all',
    label: '전체',
  },
  {
    id: 'priceSmall',
    label: '가격순',
  },
];

const usePlaceSort = () => {
  const [sortOptions, setSortOptions] = useState<InitialSortType>(
    initialState[0]
  );

  const sortString = sortOptions.id !== 'all' ? '+' + sortOptions.id : '';

  return { sortOptions, setSortOptions, sortString };
};

export default usePlaceSort;
