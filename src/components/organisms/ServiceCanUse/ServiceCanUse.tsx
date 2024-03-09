import pb from '@/api/pocketbase';
import ButtonCheck from '@/components/atoms/ButtonCheck/ButtonCheck';
import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
import { service } from '@/data/service';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//test
const placeId = '2h6cgg5ssvke4t1';

async function fetchPlaceRecords() {
  const record = await pb.collection('places').getOne(placeId, {
    expand: 'userId',
  });
  return record;
}
//type 지정
// interface serviceProps {
//   [key]: { name: string; text: string };
// }

//styled 지정
const StyledServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ServiceCanUse = () => {
  const [serviceList, setServiceList] = useState<Array<Object>>();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    fetchPlaceRecords().then((Place) => {
      const serviceCan: Array<Object> | undefined = [];
      Place.service.map((item: string) => {
        serviceCan.push(service[0][item]);
      });
      setServiceList(serviceCan);
    });
  }, []);
  console.log(serviceList);

  return (
    <PlaceSection title={'이용 가능 서비스'}>
      <StyledServiceContainer>
        {serviceList
          ? serviceList.map((item: any, index: number, array: Object[]) => {
              return (
                <ButtonCheck key={item.name} name={item.name} isChecked={false}>
                  {item.text}
                </ButtonCheck>
              );
            })
          : ''}
      </StyledServiceContainer>
    </PlaceSection>
  );
};

export default ServiceCanUse;
