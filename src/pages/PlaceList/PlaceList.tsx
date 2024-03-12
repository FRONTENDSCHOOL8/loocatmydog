import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'framer-motion';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import A11yHidden from '@/components/A11yHidden/A11yHidden';
import * as S from '@/pages/PlaceList/StyledPlaceList';
import DropDown from '@/components/atoms/DropDown/DropDown';
import FilterButton from '@/components/atoms/FilterButton/FilterButton';
import Place from '@/components/molecules/Place/Place';
import { useAuthStore } from '@/store/useAuthStore';
import Calendar from '@/components/atoms/Calendar/Calendar';
import { getPlaceInfiniteQueryOptions } from '@/utils';
import usePlaceFilter from '@/hooks/usePlaceFilter';
import { queryClient } from '@/app/App';
import usePlaceSort, {
  InitialSortType,
  initialState as initialSortItems,
} from '@/hooks/usePlaceSort';
import useDateRangeStore from '@/store/useDateRange';

export function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0,
  });

  const {
    dateRange: [startDate, endDate],
    resetDateRange,
  } = useDateRangeStore();
  const { user } = useAuthStore();
  const { filterOptions, setFilterOptions, filterString } = usePlaceFilter();
  const { sortOptions, setSortOptions, sortString } = usePlaceSort();
  const { state } = useLocation();
  const navigate = useNavigate();

  // 검색 기간 텍스트 설정
  let selectedDate = '';
  // 날짜 전역 상태가 설정되었을 경우 전역 상태 값 사용
  if (startDate && endDate) {
    selectedDate = `${format(startDate, 'yy.MM.dd')} ~ ${format(endDate, 'yy.MM.dd')} `;
    // 날짜 전역 상태가 없으면 navigate 시, state로 받아온 값 사용
  } else if (state) {
    selectedDate = `${format(state[0], 'yy.MM.dd')} ~ ${format(state[1], 'yy.MM.dd')} `;
    // 아무것도 없을 경우 선택 안함이라고 표시
  } else selectedDate = '선택 안함 (전체 기간)';

  // 필터링 옵션마다 고유한 쿼리 키 할당
  const queryKey = useMemo(
    () => ['places', 'search', filterOptions, filterString, sortOptions.id],
    [filterOptions, filterString, sortOptions.id]
  );
  const loadedPlacedata = useLoaderData() as any;

  // useInfiniteQuery 훅에서 고유한 쿼리 키를 갖는 필터링된 데이터 캐싱
  const {
    data: cachedPlaceData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...getPlaceInfiniteQueryOptions(queryKey, 3, {
      filter: filterString,
      sort: sortString,
    }),
    initialData: loadedPlacedata,
  });
  let placeListData = cachedPlaceData
    ? cachedPlaceData.pages.flatMap((data) => data.items)
    : [];

  const handleChangeSortType = useCallback(({ id, label }: InitialSortType) => {
    setSortOptions({ id, label });
  }, []);

  const handleClick = useCallback(() => {
    if (startDate && endDate)
      return navigate(
        `/place_list?startDate=${format(startDate, 'yyMMdd')}&endDate=${format(endDate, 'yyMMdd')}`,
        { state: [startDate, endDate] }
      );
    if (state)
      return navigate(
        `/place_list?startDate=${format(state[0], 'yyMMdd')}&endDate=${format(state[1], 'yyMMdd')}`,
        { state: [state[0], state[1]] }
      );
    return alert('날짜를 먼저 선택해주세요.');
  }, [startDate, endDate, state, navigate]);

  useEffect(() => {
    resetDateRange();
  }, []);

  useEffect(() => {
    if (isInView) {
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
              <button
                className="select-date-button"
                type="button"
                aria-label="날짜 선택"
              ></button>
            }
            isModal
          />
        </div>

        <button
          className="select-search-button"
          type="button"
          onClick={() => {
            setFilterOptions('range');
            handleClick();
          }}
        >
          검색
        </button>
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
            <DropDown
              items={initialSortItems}
              setCurrent={handleChangeSortType}
            />
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
                src={item.photo}
                title={item.title}
                rate={item.averageStar}
                reviewNumber={item.reviewCount}
                address={item.address}
                price={item.price.small}
                isActive={true}
              />
            );
          })}
        </div>
      </S.MainSection>
      {hasNextPage ? (
        <div ref={ref}>더보기</div>
      ) : (
        <div ref={ref} role="none"></div>
      )}
    </S.MainContainer>
  );
}

Component.displayName = 'PlaceList';
