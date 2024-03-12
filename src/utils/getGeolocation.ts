// 위도 경도 구하기

export default async function getGeolocation(address: string) {
  const API = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      headers: {
        Authorization: `KakaoAK ${API}`,
      },
    }
  );

  const json = await res.json();
  return {
    latitude: json.documents[0].y,
    longitude: json.documents[0].x,
  };
}
