import { PlacesResponse } from '@/@types/database';
import Button from '@/components/atoms/Button/Button';
import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import AnimalPick from '@/components/organisms/AnimalPick/AnimalPick';
import DatePick from '@/components/organisms/DatePick/DatePick';
import PlaceIntroduce from '@/components/organisms/PlaceIntroduce/PlaceIntroduce';
import PlaceLocation from '@/components/organisms/PlaceLocation/PlaceLocation';
import PlaceReview from '@/components/organisms/PlaceReview/PlaceReview';
import PlaceTitleSection from '@/components/organisms/PlaceTitle/PlaceTitle';
import ServiceCanUse from '@/components/organisms/ServiceCanUse/ServiceCanUse';
import ServicePrice from '@/components/organisms/ServicePrice/ServicePrice';
import SwiperProfile from '@/components/organisms/SwiperProfile/SwiperProfile';
import { useAuthStore } from '@/store/useAuthStore';
import useDateRangeStore from '@/store/useDateRange';
import useReservationStore from '@/store/useReservationStore';
import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import createChatRoom from '@/pages/ChatRoom/createChatRoom';
import getPbImageURL from '@/utils/getPbImageURL';

const PlaceDetail = () => {
  const { resetDateRange } = useDateRangeStore();
  useEffect(() => {
    return () => resetDateRange();
  }, []);
  const { reservation } = useReservationStore();
  const placeData = useLoaderData() as any;

  const userData = useAuthStore.getState().user;
  const StyledButtonContainer = styled.div`
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  `;
  //userId를 통한 validation 확인 아직 안됨

  // 문의하기
  const handleInquire = (e: MouseEvent) => {
    alert('정말 문의하시겠습니까?');

    createChatRoom(
      placeData.id,
      (userData as { [key: string]: any }).id,
      placeData.userId,
      '안녕하세요.'
    );
  };

  const ButtonContainer = () => {
    return (
      <StyledButtonContainer>
        <Button size={'30%'} mode="chat" onClick={handleInquire}>
          문의
        </Button>
        <Button
          as={Link}
          size="65%"
          mode={reservation ? 'normal' : 'disabled'}
          to={`/payment/${placeData.id}`}
          style={{ textAlign: 'center' }}
        >
          예약하기
        </Button>
      </StyledButtonContainer>
    );
  };
  return (
    <>
      <SwiperProfile data={placeData} />
      <PlaceTitleSection
        review={
          placeData.expand['boards(placeId)']
            ? placeData.expand['boards(placeId)'].length
            : ''
        }
        address={placeData.address}
        title={placeData.title}
        tagList={placeData.tag}
        name={placeData.expand.userId.name}
      />
      <PlaceSection title={''}>
        <DatePick minDate={placeData.minDate} maxDate={placeData.maxDate} />
        <AnimalPick />
        <ServicePrice />
      </PlaceSection>
      <PlaceLocation address={placeData.address} />
      <PlaceIntroduce introduce={placeData.introduce} />
      <ServiceCanUse placeData={placeData} />
      <PlaceReview data={placeData} />
      <ButtonContainer></ButtonContainer>
    </>
  );
};

export default PlaceDetail;
