import { CustomInput } from '@/components/atoms/Calendar/Calendar';
import PlaceSection from '@/components/molecules/PlaceSection/PlaceSection';

const DatePick = () => {
  return (
    <PlaceSection title={'날짜 선택'}>
      <CustomInput />
    </PlaceSection>
  );
};

export default DatePick;
