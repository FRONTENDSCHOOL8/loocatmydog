import pb from '@/api/pocketbase';
import A11yHidden from '@/components/A11yHidden/A11yHidden';
import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
import Button from '@/components/atoms/Button/Button';
import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import InputWrapper from '@/components/atoms/InputWrapper/InputWrapper';
import InputTextArea from '@/components/molecules/InputTextArea/InputTextArea';
import { useState, ChangeEvent, useId } from 'react';
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

const StyledInputBox = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;

  & span {
    inline-size: 60px;
  }

  .birthday,
  .gender {
    inline-size: 50px;
  }

  .birth {
    display: flex;
    gap: 15px;
  }

  .inputWrapper1 {
    padding: 8px 0;
    padding-inline-start: 5px;
    padding-inline-end: 20px;
    inline-size: 50%;
    display: inline-block;
    background: ${(props) => props.theme.colors.white};
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.lineColorGray};
    ${(props) => props.theme.fontStyles.textRegularMd};
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

let imageUrl: File[] = [];

const AddPet = () => {
  const [type, setType] = useState<'default' | 'link' | 'picture'>('default');
  const [changeImg, setChangeImg] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState('M');

  const [isEmpty, setIsEmpty] = useState({
    addImg: false,
    이름: false,
    품종: false,
    생일: false,
    몸무게: false,
    중성화: false,
    agree: false,
  });
  const isActive =
    isEmpty.addImg &&
    isEmpty.이름 &&
    isEmpty.품종 &&
    isEmpty.생일 &&
    isEmpty.몸무게 &&
    isEmpty.중성화 &&
    isChecked;

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
      setIsEmpty({ ...isEmpty, [e.target.name]: true });
      imageUrl.push(file);
    }

    const fileURL = URL.createObjectURL(file as Blob);
    if (fileURL) {
      setChangeImg(fileURL);
      setType('picture');
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != '') {
      setIsEmpty({ ...isEmpty, [e.target.name]: true });
    }
  };
  const id = useId();

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
          <StyledInputBox>
            <span>이름</span>
            <InputWrapper
              type={'text'}
              name={'이름'}
              placeholder={'예) 댕댕이'}
              unit={''}
              onChange={handleChangeInput}
            />
          </StyledInputBox>
          <StyledInputBox>
            <span className="gender">성별</span>
            <CheckBox
              type="radio"
              name="gender"
              isChecked={gender === 'M'}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              value="M"
            >
              남
            </CheckBox>
            <CheckBox
              type="radio"
              name="gender"
              isChecked={gender === 'F'}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              value="F"
            >
              여
            </CheckBox>
          </StyledInputBox>
          <StyledInputBox>
            <span>품종</span>
            <InputWrapper
              type={'text'}
              name={'품종'}
              placeholder={'예) 말티즈'}
              unit={''}
              onChange={handleChangeInput}
            />
          </StyledInputBox>
          <StyledInputBox>
            <A11yHidden>
              <label htmlFor={id}>생일</label>
            </A11yHidden>

            <span className="birthday">생일</span>
            <div className="birth">
              <input
                type="number"
                id={id}
                name="생일"
                placeholder="년도"
                className="inputWrapper1"
                onChange={handleChangeInput}
              />
              <input
                type="number"
                id={id}
                name="생일"
                placeholder="월"
                className="inputWrapper1"
                onChange={handleChangeInput}
              />
            </div>
          </StyledInputBox>
          <StyledInputBox>
            <span>몸무게</span>
            <InputWrapper
              type={'text'}
              name={'몸무게'}
              unit={'kg'}
              onChange={handleChangeInput}
            />
          </StyledInputBox>
          <StyledInputBox>
            <span>중성화</span>
            <InputWrapper
              type={'text'}
              name={'중성화'}
              placeholder={'예) OO병원 또는 없음'}
              unit={''}
              onChange={handleChangeInput}
            />
          </StyledInputBox>
        </StyledInputTypesBox>
        <InputTextArea
          requestCheck="선택"
          request="참고사항"
          placeholder="예) 우리 강아지는 생식만 먹여요. 남자를 무서워 하는 편이에요 또는 없음 기재"
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
        <Button
          size={'100%'}
          mode={isActive === true ? 'normal' : 'disabled'}
          type={isActive === true ? 'submit' : 'button'}
          // mode={'normal'}
          // type={'button'}
          // onClick={() => {
          //   console.log(isEmpty);
          // }}
          form="addPetForm"
        >
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
    gender: formData.getAll('gender')[0] === 'M' ? 'M' : 'F',
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
