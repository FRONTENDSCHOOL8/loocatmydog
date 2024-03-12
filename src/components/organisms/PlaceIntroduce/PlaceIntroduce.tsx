import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import styled from 'styled-components';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

//test
const placeId = '2h6cgg5ssvke4t1';

//DB URL
const API = import.meta.env.VITE_PB_API_URL;
const pb = new PocketBase(API);

async function fetchPlaceRecords() {
  const record = await pb.collection('places').getOne(placeId, {
    expand: 'userId',
  });
  return record;
}
fetchPlaceRecords();
//type 지정

const StyledMorePButton = styled.button`
  & span {
    ${(props) => props.theme.fontStyles.textRegularSm};
    color: ${(props) => props.theme.colors.textDarkGray};
    &:after {
      content: '';
      background: url('/images/direction_down.svg') no-repeat 0 0 / contain;
      inline-size: 10px;
      block-size: 5px;
      display: inline-block;
      margin-inline-start: 3px;
    }
  }
`;

const StyledIntroduce = styled.div`
  ${(props) => props.theme.fontStyles.textRegularSm};
  color: ${(props) => props.theme.colors.textBlack};
  word-break: break-all;
  overflow: hidden;
  line-height: 1.5;
`;

const MorePButton = ({ ...restProps }) => {
  return (
    <StyledMorePButton type="button" {...restProps}>
      <span>더보기</span>
    </StyledMorePButton>
  );
};

const PlaceIntroduce = ({ introduce }: { introduce: string }) => {
  const [introPage, setIntroPage] = useState('10.5em');
  const [introduceState, setIntroduceState] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setIntroduceState(introduce);
    const intro = document.getElementById('beforeIntro');
    intro?.insertAdjacentHTML('afterend', `${introduce}`);
  }, [introduce]);

  const showMorePage = () => {
    setIntroPage('auto');
    setHidden(!hidden);
  };
  return (
    <PlaceSection title="자기 소개">
      <StyledIntroduce id="introduce" style={{ blockSize: introPage }}>
        <div id="beforeIntro"></div>
      </StyledIntroduce>
      <MorePButton hidden={hidden} onClick={showMorePage}></MorePButton>
    </PlaceSection>
  );
};

export default PlaceIntroduce;
