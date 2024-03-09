import { PetResponse } from '@/@types/database';
import pb from '@/api/pocketbase';
import Button from '@/components/atoms/Button/Button';
import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import InputTextArea from '@/components/molecules/InputTextArea/InputTextArea';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import useReservationStore from '@/store/useCheckboxStore';
import useModalControlStore from '@/store/useModalControl';
import { sizeWeight } from '@/utils';
import getPbImageURL from '@/utils/getPbImageURL';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import styled from 'styled-components';

//test
const nowUser = 'gukoblvn0comp9j';

//type 지정
type modeProps = 'normal' | 'gray' | 'disabled' | 'kakao' | 'google' | 'chat';

//styled 컴포넌트
const StyledAnimalPickModal = styled.dialog`
  inline-size: 95%;
  max-inline-size: 420px;
  border-radius: 5px;
  border: none;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);

  & .modalInner {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  & .modalHeader {
    display: flex;
    justify-content: space-between;
  }
  & .closeButton {
    background: url('/images/cross.svg') no-repeat 0 0 / contain;
    inline-size: 20px;
    block-size: 20px;
  }
  & .modalTitle {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack}
  }
  & .profileWrapper {
    display: flex;
    gap: 10px;
  }
`;
const StyledAnimalPickSection = styled.div`
  & > p {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;
const StyledPetListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & .info {
    ${(props) => props.theme.fontStyles.textRegularBase}
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

const StyledPlusButton = styled.button`
  background: url('/images/plusButton.svg');
  display: inline-block;
  inline-size: 24px;
  block-size: 24px;
`;

async function fetchUserRecords(userId: string) {
  const records = await pb
    .from('users')
    .getOne(nowUser, { select: { expand: { petId: true } } });

  return records;
}

const AnimalProfile = ({
  src,
  ...restProps
}: {
  src: string;
  [key: string]: any;
}) => {
  return (
    <ProfileImage
      style={{ border: '2px solid #f1f1f1' }}
      src={src}
      {...restProps}
    />
  );
};

const AnimalPick = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const requireRef = useRef(null);
  const etcRef = useRef(null);
  const [petList, setPetList] = useState<PetResponse[] | undefined>([]);
  const [petId, setPetId] = useState<PetResponse>(Object);
  const [isChecked, setIsChecked] = useState(false);
  const [mode, setMode] = useState<modeProps>('disabled');
  const [inputTextValue, setInputTextValue] = useState({
    require: '',
    etc: '',
  });
  const { setReservation, reservation } = useReservationStore();
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserRecords(nowUser);
      setPetList(userData.expand?.petId);
    };
    fetchData();
  }, []);
  useEffect(() => {
    function petValidation() {
      if (isChecked && inputTextValue.require) {
        setMode('normal');
      } else if (inputTextValue.require === '' || !isChecked) {
        console.log('aa', inputTextValue.require);
        setMode('disabled');
      }
    }
    petValidation();
  }, [inputTextValue.require, isChecked]);

  function handleChange(e: React.ChangeEvent<HTMLElement>) {
    setIsChecked(!isChecked);
  }
  const prevState = {
    require: '',
    etc: '',
  };
  function handleTextChange(e) {
    const { name, value } = e.target;
    setInputTextValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setReservation(inputTextValue, petId.id);
    modalRef.current?.close();
  }
  console.log(reservation[petId.id]);

  return (
    <>
      <StyledAnimalPickModal as="dialog" ref={modalRef}>
        <Form className="modalInner" onSubmit={handleSubmit}>
          <div className="modalHeader">
            <button
              className="closeButton"
              type="button"
              onClick={() => {
                modalRef.current?.close();
                setIsChecked(false);
                setInputTextValue(prevState);
              }}
            ></button>
            <span className="modalTitle">반려동물</span>
          </div>
          <div className="profileWrapper">
            <ProfileCard
              src={getPbImageURL(petId.collectionId, petId.id, petId.image)}
              name={petId.petName}
              isChecked={isChecked}
              onChange={handleChange}
            >
              <p>{petId.breed}</p>
              <p>
                {sizeWeight(petId.weight)} {petId.weight}kg
              </p>
            </ProfileCard>
          </div>
          <InputTextArea
            requestCheck={'필수'}
            name="require"
            isRequired={true}
            inputValue={inputTextValue.require}
            onChange={handleTextChange}
          />
          <InputTextArea
            requestCheck={'선택'}
            request="기타 요청 사항"
            name="etc"
            inputValue={inputTextValue.etc}
            onChange={handleTextChange}
          />
          <Button type={'submit'} size={'100%'} isRounded={false} mode={mode}>
            저장 하기
          </Button>
        </Form>
      </StyledAnimalPickModal>
      <StyledAnimalPickSection>
        <p>반려동물 선택</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <StyledPetListContainer>
            {petList?.length === 0 ? (
              <p className="info">반려동물을 추가해주세요</p>
            ) : (
              petList?.map((item) => (
                <AnimalProfile
                  src={getPbImageURL(item.collectionId, item.id, item.image)}
                  key={item.id}
                  onClick={() => {
                    setPetId(item);
                    modalRef.current?.showModal();
                  }}
                />
              ))
            )}
          </StyledPetListContainer>
          <StyledPlusButton></StyledPlusButton>
        </div>
      </StyledAnimalPickSection>
    </>
  );
};

export default AnimalPick;
