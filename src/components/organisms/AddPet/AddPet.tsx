import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
import Button from '@/components/atoms/Button/Button';
import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import InputTextArea from '@/components/molecules/InputTextArea/InputTextArea';
import InputTypes from '@/components/molecules/InputTypes/InputTypes';
import { useState, ChangeEvent } from 'react';
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

const AddPet = () => {
  const [gender, setGender] = useState('');
  const handleGender = (e: ChangeEvent) => {
    setGender((e.target as HTMLButtonElement).value);
  };

  const [agree, setAgree] = useState('');
  const handleAgree = (e: ChangeEvent) => {
    if (agree) {
      setAgree('');
    }

    if (!agree) {
      setAgree((e.target as HTMLButtonElement).value);
    }
  };

  const [type, setType] = useState<'default' | 'link' | 'picture'>('default');
  const [changeImg, setChangeImg] = useState('');

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
    }

    const fileURL = URL.createObjectURL(file as Blob);
    if (fileURL) {
      setChangeImg(fileURL);
      setType('picture');
    }
  };

  return (
    <form action="">
      <BigPhoto
        type={type}
        value="사진"
        // changeImg={changeImg === '사진'}
        onChange={handleChangeImg}
        imgSrc={changeImg}
      />
      <StyledAddPetBox>
        <span>기본 정보</span>
        <StyledInputTypesBox>
          <InputTypes
            name={'이름'}
            placeholder={'예) 댕댕이'}
            list={['예) 댕댕이']}
            unit={''}
          />
          <StyledGenderBox>
            <span>성별</span>
            <CheckBox
              isChecked={gender === '남'}
              onChange={handleGender}
              type="radio"
              name="gender"
              value="남"
            >
              남
            </CheckBox>
            <CheckBox
              isChecked={gender === '여'}
              onChange={handleGender}
              type="radio"
              name="gender"
              value="여"
            >
              여
            </CheckBox>
          </StyledGenderBox>
          <InputTypes
            name={'품종'}
            placeholder={'예) 말티즈'}
            list={['예) 말티즈']}
            unit={''}
          />
          <InputTypes
            name={'생일'}
            placeholder={''}
            list={['년도', '월']}
            unit={''}
          />
          <InputTypes
            name={'몸무게'}
            placeholder={'예) 2.8'}
            list={['예) 2.8']}
            unit={'kg'}
          />
          <InputTypes
            name={'중성화'}
            placeholder={'예) OO병원 또는 없음'}
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
            isChecked={agree === 'yes'}
            onChange={handleAgree}
            type="checkbox"
            name="agree"
            value="yes"
          >
            아래 내용을 확인하였습니다
          </CheckBox>
          <p>
            위 내용 &#40;예: 몸무게, 마킹 등&#41;을 사실과 다르게
            <br />
            기재한 경우, 약관에 따라 예약이 거부될 수 있습니다
          </p>
        </StyledPromiseBox>
        <Button size={'100%'} mode="normal">
          {'저장하기'}
        </Button>
      </StyledAddPetBox>
    </form>
  );
};

export default AddPet;
