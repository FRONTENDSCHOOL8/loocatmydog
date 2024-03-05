import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';
const API = import.meta.env.VITE_PB_API_URL;

// async function = fetchUserRecords(options){

// }

const AnimalProfile = () => {
  return (
    <ProfileImage
      style={{ border: '2px solid #f1f1f1', display: 'inline-block' }}
      // src={src}
    />
  );
};

const AnimalPick = () => {
  return (
    <PlaceSection title={'반려동물 선택'}>
      {/* {animal.map((item) => {
        return <AnimalProfile src={`${ImageURL()}`}></AnimalProfile>;
      })} */}
    </PlaceSection>
  );
};

export default AnimalPick;
