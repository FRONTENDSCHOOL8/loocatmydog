import HeartList from '@/components/organisms/HeartList/HeartList';
import * as S from '../Main/StyledMain';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledEmptyContents = styled(motion.p)`
  ${(props) => props.theme.fontStyles.textSemiboldBase};
  text-align: center;
  padding-block: 20px;
`;

const StyledHeartSection = styled(S.MainSection)`
  margin-block-start: 50px;
  padding-inline: 0;

  & .section-title {
    ${(props) => props.theme.fontStyles.headingMd};
    padding-inline-start: 10px;
    margin-block-end: 24px;
  }
`;

export function Component() {
  const heartPlaceData = useLoaderData() as any;
  let heartPlaceContents = <HeartList data={heartPlaceData} />;
  if (heartPlaceData.length < 1)
    heartPlaceContents = (
      <StyledEmptyContents
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeOut' }}
      >
        내가 찜한 플레이스가 없습니다.
      </StyledEmptyContents>
    );

  return (
    <S.MainContainer>
      <StyledHeartSection $flexDirection="column" $flexGap={20}>
        <h2 className="section-title">찜 목록</h2>
        {heartPlaceContents}
      </StyledHeartSection>
    </S.MainContainer>
  );
}
Component.displayName = 'HeartPlaces';
