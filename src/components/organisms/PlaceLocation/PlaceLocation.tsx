import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const StyledKakaoMap = styled.div`
  inline-size: 100%;
  block-size: 110px;
`;

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      radius: 50,
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'dashed', // 선의 스타일 입니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    });
    circle.setMap(map);
  }, []);
  return <StyledKakaoMap id="map"></StyledKakaoMap>;
};

const PlaceLocation = () => {
  return (
    <PlaceSection title={'플레이스 위치'}>
      <KakaoMap />
    </PlaceSection>
  );
};

export default PlaceLocation;
