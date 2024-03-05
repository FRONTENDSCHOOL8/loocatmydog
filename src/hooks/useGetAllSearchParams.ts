import { useSearchParams } from 'react-router-dom';

enum Params {
  filterType = 'filterType',
  sortType = 'sortType',
  startDate = 'startDate',
  endDate = 'endDate',
}

type ParamsObject = {
  [key in Params]?: string;
};

type UseGetAllSearchParams = () => {
  allParams: ParamsObject;
  setParams: (key: string, value: string) => void;
  deleteParams: (key: string, value: string) => void;
};

const useGetAllSearchParams: UseGetAllSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allParams: ParamsObject = {};
  for (const [key, value] of searchParams.entries()) {
    allParams[key as Params] = value;
  }
  const setParams = (key: string, value: string) => {
    setSearchParams((params) => {
      params.set(key, value);
      return params;
    });
  };
  const deleteParams = (key: string, value: string) => {
    setSearchParams((params) => {
      params.delete(key, value);
      return params;
    });
  };

  return { allParams, setParams, deleteParams };
};

export default useGetAllSearchParams;
