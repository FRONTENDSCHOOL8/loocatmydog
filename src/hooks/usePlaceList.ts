import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

interface InitialState {
  filterType: 'all' | 'mine' | 'bookmark';
  sortType: 'distance' | 'popular' | 'price';
  startDate: string | null;
  endDate: string | null;
}

const initialState: InitialState = {
  filterType: 'all',
  sortType: 'popular',
  startDate: null,
  endDate: null,
};

// const usePlaceList = () => {
//   const [filterSortType, setFilterSortType] =
//     useState<InitialState>(initialState);
//   return useQuery({
//     queryKey: ['places'],
//     queryFn: fetchPlaceList,
//     staleTime: 1 * 60 * 1000,
//   });
// };

// export default usePlaceList;
