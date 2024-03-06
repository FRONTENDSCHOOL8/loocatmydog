import pb from '@/api/pocketbase';
import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import { useEffect, useState } from 'react';

//test
const placeId = '2h6cgg5ssvke4t1';

async function fetchPlaceRecords() {
  const record = await pb.collection('places').getOne(placeId, {
    expand: 'userId',
  });
  return record;
}

const ServiceCanUse = () => {
  const [serviceList, setServiceList] = useState();
  useEffect(() => {
    fetchPlaceRecords().then((Place) => {
      setServiceList(Place.service);
      console.log(Place);
    });
  }, []);
  return (
    <PlaceSection title={'이용 가능 서비스'}>
      <div></div>
    </PlaceSection>
  );
};

export default ServiceCanUse;
