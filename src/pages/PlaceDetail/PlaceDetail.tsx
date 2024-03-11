import { PlacesResponse } from '@/@types/database';
import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import AnimalPick from '@/components/organisms/AnimalPick/AnimalPick';
import DatePick from '@/components/organisms/DatePick/DatePick';
import PlaceIntroduce from '@/components/organisms/PlaceIntroduce/PlaceIntroduce';
import PlaceLocation from '@/components/organisms/PlaceLocation/PlaceLocation';
import PlaceTitleSection from '@/components/organisms/PlaceTitle/PlaceTitle';
import ServiceCanUse from '@/components/organisms/ServiceCanUse/ServiceCanUse';
import ServicePrice from '@/components/organisms/ServicePrice/ServicePrice';
import SwiperProfile from '@/components/organisms/SwiperProfile/SwiperProfile';
import { useAuthStore } from '@/store/useAuthStore';
import { useLoaderData } from 'react-router-dom';

const PlaceDetail = () => {
  const placeData = useLoaderData() as any;
  console.log(placeData);
  const userData = useAuthStore.getState().user;
  return (
    <>
      <SwiperProfile />
      <PlaceTitleSection
        review={2}
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
    </>
  );
};

export default PlaceDetail;
