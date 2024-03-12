import { PlacesResponse } from '@/@types/database';
import pb from '@/api/pocketbase';
import MyPlaceList from '@/components/molecules/MyPlaceList/MyPlaceList';
import convertDate from '@/utils/convertDate';
import getDateDiff from '@/utils/getDateDiff';
import getPbImageURL from '@/utils/getPbImageURL';
import { MouseEvent, MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eq } from 'typed-pocketbase';

const getReservations = async (userId: string) => {
  const responseData = await pb.from('reservation').getFullList({
    select: {
      expand: {
        placeId: true,
        userId: true,
      },
    },
    filter: eq('userId', userId),
  });

  // 예약 내역
  const response = responseData.map((data, index) => {
    const placeData = data.expand?.placeId as PlacesResponse;

    // 플레이스 사진
    const photoSrc = getPbImageURL(
      placeData.collectionId,
      placeData.id,
      placeData.photo[0]
    );

    // 날짜
    const currentDay = new Date();
    const dDay = new Date(data.date);

    const reservationDate = convertDate(dDay);
    let leftDay = getDateDiff(dDay, currentDay);

    return leftDay === 'past' ? null : (
      <li key={index}>
        <Link to={`/place_detail/${data.placeId}`}>
          <MyPlaceList
            title={placeData.title}
            date={reservationDate}
            dDay={`D-${leftDay}`}
            src={photoSrc}
          >
            {placeData.address}
          </MyPlaceList>
          <div className="line"></div>
        </Link>
      </li>
    );
  });

  // 지난 내역
  const pastResponse = responseData.map((data, index) => {
    const placeData = data.expand?.placeId as PlacesResponse;

    // 플레이스 사진
    const photoSrc = getPbImageURL(
      placeData.collectionId,
      placeData.id,
      placeData.photo[0]
    );
    console.log(data);

    // 날짜
    const currentDay = new Date();
    const dDay = new Date(data.date);

    const reservationDate = convertDate(dDay);
    let leftDay = getDateDiff(dDay, currentDay);

    // 리뷰 여부
    const reviewed = data.reviewed;
    const state = reviewed ? '후기보기' : '후기쓰기';

    const goReview = (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      e.preventDefault();
      location.href = `/review/post/${data.placeId}`;
      console.log(1);
    };

    return leftDay === 'past' ? (
      <li key={index}>
        <Link to={`/place_detail/${data.placeId}`}>
          <MyPlaceList
            title={placeData.title}
            date={reservationDate}
            dDay={`D-${leftDay}`}
            state={state}
            mode={reviewed}
            review={true}
            src={photoSrc}
            onClick={!reviewed ? goReview : undefined}
          >
            {placeData.address}
          </MyPlaceList>
          <div className="line"></div>
        </Link>
      </li>
    ) : null;
  });

  return { responseData, response, pastResponse };
};

export default getReservations;
