import { ChangeEvent, useState } from 'react';

import A11yHidden from '@/components/A11yHidden/A11yHidden';
import * as S from '@/pages/PlaceList/StyledPlaceList';
import Place from '@/components/molecules/Place/Place';
import DropDown from '@/components/atoms/DropDown/DropDown';
import FilterButton from '@/components/atoms/FilterButton/FilterButton';
import useGetAllSearchParams from '@/hooks/useGetAllSearchParams';
import { dummyPlaceData } from '@/data/dummyPlaceData';

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
  const { setParams } = useGetAllSearchParams();
  const [placeSortType, setPlaceSortType] = useState<PlaceSortType>(
    initialSortType[0]
  );
  const [placeFilterType, setPlaceFilterType] =
    useState<PlaceFilterType>(initialFilterType);

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
          {dummyPlaceData.map((item) => (
            <Place
              key={item.id}
              src={item.src}
              title={item.title}
              rate={item.rate}
              reviewNumber={item.reviewNumber}
              address={item.address}
              price={item.price.small}
              heartFill={item.heartFill}
              starFill={item.starFill}
              isActive={item.isActive}
              onChangeHeartButton={(e) => console.log(e.currentTarget)}
            />
          ))}
        </div>
      </S.MainSection>
    </S.MainContainer>
  );
}

Component.displayName = 'PlaceList';
