import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import getPbImageURL from '@/utils/getPbImageURL';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//test
const nowUser = 'qx6lpgtzmsdy3id';

//DB URL
const API = import.meta.env.VITE_PB_API_URL;
const pb = new PocketBase(API);

//styled 컴포넌트
const StlyedAnimalPickSection = styled.div`
  & p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;
const StyledPetListContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledPlusButton = styled.button`
  background: url('/images/plusButton.svg');
  display: inline-block;
  inline-size: 24px;
  block-size: 24px;
`;

async function fetchUserRecords(userId: string) {
  const records = await pb.collection('users').getOne(userId, {
    expand: 'petId',
  });
  console.log(records);
  return records;
}

const AnimalProfile = ({ src }: { src: string }) => {
  return <ProfileImage style={{ border: '2px solid #f1f1f1' }} src={src} />;
};

const AnimalPick = () => {
  const [petList, setPetList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserRecords(nowUser);
      console.log(userData.petId);
      setPetList(userData.petId);
    };
    fetchData();
  }, []);
  console.log(petList);
  return (
    <StlyedAnimalPickSection>
      <p>반려동물 선택</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <StyledPetListContainer>
          {petList
            ? petList.map((item) => (
                <AnimalProfile
                  src={`${getPbImageURL('tj4m7jn5tkdhzp1', item, 'image.jpg')}`}
                  key={item}
                />
              ))
            : ''}
        </StyledPetListContainer>
        <StyledPlusButton></StyledPlusButton>
      </div>
    </StlyedAnimalPickSection>
  );
};

export default AnimalPick;
