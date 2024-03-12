import cacluateDistanceByCoords from './calculateDistanceByCoords';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const BASE_URL = 'https://dapi.kakao.com/v2/local/search/address?query=';

const getDistanceByAddress = async (
  firstAddress: string,
  secondAddress: string
) => {
  const headerOption = {
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
    },
  };
  const firstResponse = await fetch(BASE_URL + firstAddress, headerOption);
  const firstResult = await firstResponse.json();
  const secondResponse = await fetch(BASE_URL + secondAddress, headerOption);
  const secondResult = await secondResponse.json();

  const { x: firstLon, y: firstLat } = firstResult.documents[0].address;
  const { x: secondLon, y: secondLat } = secondResult.documents[0].address;
  const result = cacluateDistanceByCoords(
    firstLat,
    firstLon,
    secondLat,
    secondLon
  );
  return result;
};

export default getDistanceByAddress;
