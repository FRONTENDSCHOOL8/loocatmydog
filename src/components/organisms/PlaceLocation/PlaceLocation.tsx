import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import getGeolocation from '@/utils/getGeolocation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
declare const window: Window & typeof globalThis & { kakao: any };

const { kakao } = window;

const StyledKakaoMap = styled.div`
  inline-size: 100%;
  block-size: 165px;
`;

const KakaoMap = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  console.log(latitude);
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(latitude, longitude),
      radius: 50,
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'dashed', // 선의 스타일 입니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    });
    circle.setMap(map);
  }, [latitude, longitude]);
  return <StyledKakaoMap id="map"></StyledKakaoMap>;
};

const PlaceLocation = ({ address }: { address: string }) => {
  console.log(address);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  async function getAddressData() {
    const geolocationData = await getGeolocation(address);
    setLatitude(geolocationData.latitude);
    setLongitude(geolocationData.longitude);
  }
  getAddressData();
  return (
    <PlaceSection title={'플레이스 위치'}>
      <KakaoMap latitude={latitude} longitude={longitude} />
    </PlaceSection>
  );
};

export default PlaceLocation;
