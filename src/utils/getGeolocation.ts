// 위도 경도 구하기

export default async function getGeolocation(address: string) {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}&size=1`,
    {
      headers: {
        Authorization: `KakaoAK 0147d1ee39b1139059d94f61d662119c`,
      },
    }
  );

  const json = await res.json();
  return {
    latitude: json.documents[0].y,
    longitude: json.documents[0].x,
  };
}
