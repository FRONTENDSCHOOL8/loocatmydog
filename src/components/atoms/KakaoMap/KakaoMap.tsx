import { useEffect } from 'react';

declare const window: typeof globalThis & {
  kakao: any;
};

const { kakao } = window;

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return <div id="map" style={{ width: '500px', height: '500px' }}></div>;
};

export default KakaoMap;
