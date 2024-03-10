import { ChangeEvent, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'framer-motion';
import { useLoaderData, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import A11yHidden from '@/components/A11yHidden/A11yHidden';
import * as S from '@/pages/PlaceList/StyledPlaceList';
import DropDown from '@/components/atoms/DropDown/DropDown';
import FilterButton from '@/components/atoms/FilterButton/FilterButton';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import Place from '@/components/molecules/Place/Place';
import { useAuthStore } from '@/store/useAuthStore';
import useDateRangeStore from '@/store/useDateRange';
import useSearchDate from '@/hooks/useSearchDate.';
import Calendar from '@/components/atoms/Calendar/Calendar';
import { convertFilterString, getPlaceInfiniteQueryOptions } from '@/utils';
import usePlaceFilter from '@/hooks/usePlaceFilter';
import { queryClient } from '@/app/App';

export function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0,
  });

  const { user } = useAuthStore();
  useSearchDate();
  const { filterOptions, setFilterOptions, filterString } = usePlaceFilter();
  const { state } = useLocation();
  let selectedDate = '전체기간';
  if (state) {
    selectedDate = `${format(state[0], 'yy.MM.dd')} ~ ${format(state[1], 'yy.MM.dd')} `;
  }

  const loadedPlacedata = useLoaderData() as any;
  const {
    data: cachedPlaceData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    ...getPlaceInfiniteQueryOptions(['places', 'search'], 3, {
      filter: filterString,
    }),
    initialData: loadedPlacedata,
  });
  let placeListData = cachedPlaceData
    ? cachedPlaceData.pages.flatMap((data) => data.items)
    : [];

  useEffect(() => {
    console.log('filterString useEffect 호출', filterString);
    refetch();
  }, [filterString, refetch]);

  useEffect(() => {
    console.log('isInView useEffect 호출', isInView);
    if (isInView) {
      console.log(isInView);
      fetchNextPage();
    }
  }, [isInView, fetchNextPage]);

  return (
    <S.MainContainer>
      <S.MainOptions>
        <h2 className="section-options-title">검색 기간</h2>
        <div className="section-options-description">
          <span>{selectedDate}</span>
          <Calendar
            customInput={
              <button className="select-date-button" type="button">
                재설정
              </button>
            }
            isModal
          />
        </div>
      </S.MainOptions>
      <S.MainSection $flexDirection="column" $flexGap={20}>
        <h2 className="section-title">
          <span>인기 플레이스</span>
          <div className="section-filter">
            <FilterButton
              name="bookmark"
              isCheck={filterOptions === 'bookmark'}
              setIsCheck={(e) => {
                if (e.currentTarget.checked) setFilterOptions('bookmark');
                else setFilterOptions('all');
              }}
            >
              ❤ 찜 파트너
            </FilterButton>
            <DropDown setCurrent={() => console.log('hi')} />
          </div>
        </h2>
        <div className="section-title">
          <A11yHidden as="h2">플레이스 목록</A11yHidden>
        </div>
        <div className="section-content">
          {placeListData?.map((item) => {
            const heartFill = user?.heart.includes(item.id);
            return (
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
                heartFill={heartFill}
                isActive={true}
              />
            );
          })}
        </div>
      </S.MainSection>
      {hasNextPage && <div ref={ref}>더보기</div>}
    </S.MainContainer>
  );
}

Component.displayName = 'PlaceList';
