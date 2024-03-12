import Place from '@/components/molecules/Place/Place';
import * as S from '@/pages/PlaceList/StyledPlaceList';
import { useAuthStore } from '@/store/useAuthStore';
import { animate, motion } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

const StyledEmptyContents = styled(motion.p)`
  ${(props) => props.theme.fontStyles.textSemiboldBase};
  text-align: center;
  padding-block: 20px;
`;

export function Component() {
  const { user } = useAuthStore();
  const myPlaceData = useLoaderData() as any;
  let placeContents;
  if (!myPlaceData)
    placeContents = (
      <StyledEmptyContents
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeOut' }}
      >
        내가 등록한 플레이스가 없습니다.
      </StyledEmptyContents>
    );
  else {
    placeContents = myPlaceData.map((item: any) => {
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
    });
  }
  return (
    <div>
      <S.MainContainer>
        <S.MainSection $flexDirection="column" $flexGap={20}>
          <div className="section-content">{placeContents}</div>
        </S.MainSection>
      </S.MainContainer>
    </div>
  );
}

Component.displayName = 'MyPlaces';
