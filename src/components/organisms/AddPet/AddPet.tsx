import pb from '@/api/pocketbase';
import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
import Button from '@/components/atoms/Button/Button';
import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import InputTextArea from '@/components/molecules/InputTextArea/InputTextArea';
import InputTypes from '@/components/molecules/InputTypes/InputTypes';
import { useState, ChangeEvent } from 'react';
import { Form, redirect } from 'react-router-dom';
import styled from 'styled-components';

const StyledAddPetBox = styled.div`
  padding: 25px 20px;

  & span {
    ${(props) => props.theme.fontStyles.textSemiboldBase};
    color: ${(props) => props.theme.colors.textBlack};
  }
`;

const StyledPromiseBox = styled.div`
  padding-block: 50px;
  & p {
    ${(props) => props.theme.fontStyles.textRegularSm};
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

const StyledInputTypesBox = styled.div`
  padding-block: 25px;
  display: flex;
  flex-flow: column;
  gap: 15px;
`;

const StyledGenderBox = styled.div`
  display: flex;
  flex-flow: row;
  gap: 30px;
`;

let imageUrl: File[] = [];

const AddPet = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [type, setType] = useState<'default' | 'link' | 'picture'>('default');
  const [changeImg, setChangeImg] = useState('');

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
      imageUrl.push(file);
    }

    const fileURL = URL.createObjectURL(file as Blob);
    if (fileURL) {
      setChangeImg(fileURL);
      setType('picture');
    }
  };

  return (
    <Form id="addPetForm" method="post">
      <BigPhoto
        type={type}
        value="사진"
        onChange={handleChangeImg}
        imgSrc={changeImg}
      />
      <StyledAddPetBox>
        <span>기본 정보</span>
        <StyledInputTypesBox>
          <InputTypes name={'이름'} list={['예) 댕댕이']} unit={''} />
          <StyledGenderBox>
            <InputTypes
              name={'성별'}
              check={true}
              list={['남', '여']}
              unit={''}
            ></InputTypes>
          </StyledGenderBox>
          <InputTypes name={'품종'} list={['예) 말티즈']} unit={''} />
          <InputTypes name={'생일'} list={['년도', '월']} unit={''} />
          <InputTypes name={'몸무게'} list={['예) 2.8']} unit={'kg'} />
          <InputTypes
            name={'중성화'}
            list={['예) OO병원 또는 없음']}
            unit={''}
          />
        </StyledInputTypesBox>
        <InputTextArea
          requestCheck="선택"
          request="참고사항"
          placeholder="예) 우리 강아지는 생식만 먹여요. 남자를 무서워 하는 편이에요"
        />

        <StyledPromiseBox>
          <CheckBox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            type="checkbox"
            name="agree"
          >
            아래 내용을 확인하였습니다
          </CheckBox>
          <p>
            위 내용 &#40;예: 몸무게, 마킹 등&#41;을 사실과 다르게
            <br />
            기재한 경우, 약관에 따라 예약이 거부될 수 있습니다
          </p>
        </StyledPromiseBox>
        <Button size={'100%'} mode="normal" type="submit" form="addPetForm">
          {'저장하기'}
        </Button>
      </StyledAddPetBox>
    </Form>
  );
};

export default AddPet;

export async function addPetFormAction({ request }: { request: any }) {
  const formData = await request.formData();

  const eventData = {
    petName: formData.get('이름'),
    image: imageUrl[0],
    breed: formData.get('품종'),
    gender: formData.get('성별') === true ? 'M' : 'F',
    birthYear: formData.getAll('생일')[0],
    birthMonth: formData.getAll('생일')[1],
    weight: formData.get('몸무게'),
    isNeutered: formData.get('중성화') === '없음' ? false : true,
    hospital:
      formData.get('중성화') === '없음' ? '없음' : formData.get('중성화'),
    note: formData.get('contents'),
  };
  console.log(eventData);

  try {
    await pb.collection('pet').create(eventData);

    alert('반려동물 정보가 추가 되었습니다.');
  } catch (error) {
    console.log('Error while writing : ', error);
  }

  return redirect('/mypage');
}
