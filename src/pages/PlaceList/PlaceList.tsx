import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';

import pb from '@/api/pocketbase';
import A11yHidden from '@/components/A11yHidden/A11yHidden';
import * as S from '@/pages/PlaceList/StyledPlaceList';
import DropDown from '@/components/atoms/DropDown/DropDown';
import FilterButton from '@/components/atoms/FilterButton/FilterButton';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import Place from '@/components/molecules/Place/Place';
import { useAuthStore } from '@/store/useAuthStore';
import { getPlaceInifiniteQueryOptions } from '@/utils/getQueryOptions';

type PlaceSortType = {
  id: string;
  label: string;
};
const initialSortType: PlaceSortType[] = [
  {
    id: 'popular',
    label: '인기순',
  },
  {
    id: 'distance',
    label: '거리순',
  },
  {
    id: 'price',
    label: '가격순',
  },
];
export type PlaceFilterType = {
  [key: string]: boolean;
};
const initialFilterType: PlaceFilterType = {
  bookmark: false,
};

export function Component() {
  const {
    allParams: { filterType, sortType },
    setParams,
  } = useGetAllSearchParams();

  const [placeSortType, setPlaceSortType] = useState<PlaceSortType>(
    initialSortType[0]
  );
  const [placeFilterType, setPlaceFilterType] =
    useState<PlaceFilterType>(initialFilterType);

  const loadedPlaceData = useLoaderData() as any;

  const {
    data: cachedPlaceData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...getPlaceInifiniteQueryOptions(),
    initialData: loadedPlaceData,
  });
  const placeListData = cachedPlaceData
    ? cachedPlaceData.pages.flatMap((data) => data.items)
    : [];

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0,
  });
  const handleChangeSortType = ({ id, label }: PlaceSortType) => {
    setPlaceSortType({ id, label });
    setParams('sortType', id);
  };
  const handleChangeFilterType = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, checked },
    } = e;
    if (checked) {
      setParams('filterType', 'bookmark');
    } else {
      setParams('filterType', 'range');
    }
    setPlaceFilterType((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    fetchNextPage();
  }, [isInView, fetchNextPage]);

  return (
    <S.MainContainer>
      <S.MainSection $flexDirection="column" $flexGap={20}>
        <h2 className="section-title">
          <span>인기 플레이스</span>
          <div className="section-filter">
            <FilterButton
              name="bookmark"
              isCheck={placeFilterType.bookmark}
              setIsCheck={handleChangeFilterType}
            >
              ❤ 찜 파트너
            </FilterButton>
            <DropDown
              items={initialSortType}
              setCurrent={handleChangeSortType}
            />
          </div>
        </h2>
        <div className="section-title">
          <A11yHidden as="h2">플레이스 목록</A11yHidden>
        </div>
        <div className="section-content">
          {placeListData?.map((item) => (
            <Place
              key={item.id}
              id={item.id}
              path={`/place_detail/${item.id}`}
              src={item.photo[0]}
              title={item.title}
              rate={item.averageStar}
              reviewNumber={item.reviewCount}
              address={item.address}
              price={item.price.small}
              heartFill={true}
              isActive={true}
            />
          ))}
        </div>
      </S.MainSection>
      {hasNextPage && <div ref={ref}>더보기</div>}
    </S.MainContainer>
  );
}

Component.displayName = 'PlaceList';
