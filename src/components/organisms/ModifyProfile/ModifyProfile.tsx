import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { TypedPocketBase } from 'typed-pocketbase';

// 명령어로 자동 생성된 타입 정의 파일에서 Schema를 가져옵니다.
import { Schema, UsersResponse } from '@/@types/database';

// 사용할 PocketBase 주소를 지정합니다.
const db = new TypedPocketBase<Schema>(import.meta.env.VITE_PB_API_URL);

const StyledModifyProfileBox = styled.div`
  padding-block-start: 23px;
  position: relative;

  & .camera {
    position: absolute;
    top: 60px;
    right: 18px;
  }
`;

const StyledEmailBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  padding-block-end: 10px;
  margin-inline: 20px;
  margin-block-end: 30px;
  gap: 14px;

  & span {
    color: ${(props) => props.theme.colors.textBlack};
    ${(props) => props.theme.fontStyles.textRegularSm};
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: self-end;
    & p {
      color: ${(props) => props.theme.colors.textBlack};
    }
    & .orangeButton {
      padding: 10px 15px;
      ${(props) => props.theme.fontStyles.textSemiboldMd};
      color: ${(props) => props.theme.colors.orange};
      border: 1px solid ${(props) => props.theme.colors.orange};
      border-radius: 4px;
    }

    & input {
      border: none;
      inline-size: 80%;
    }
    & input[type='text']:disabled {
      opacity: 1;
      -webkit-text-fill-color: currentcolor;
      color: currentColor;
      background-color: white;
    }
  }
`;

const StyledProfileBox = styled.div`
  padding-block-start: 30px;

  & label {
    cursor: pointer;
  }
  #modifyCamera {
    display: none;
  }
`;

const StyledAddressBox = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin: 50% auto;

  & div {
    inline-size: 70%;
    padding-block-end: 10px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    & input {
      border: none;
      inline-size: 70%;
    }
    & button {
      padding-inline-start: 10px;
      padding: 10px 15px;
      ${(props) => props.theme.fontStyles.textSemiboldMd};
      color: ${(props) => props.theme.colors.orange};
      border: 1px solid ${(props) => props.theme.colors.orange};
      border-radius: 4px;
    }
  }
`;

const ModifyProfile = () => {
  //이미지 바꾸는 함수
  const [changeImg, setChangeImg] = useState<string>('/images/profileNone.svg');
  const [record, setRecord] = useState<UsersResponse | {}>({});

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [phone, setPhone] = useState<string | number>('');
  const [address, setAddress] = useState<string | number>('');

  const [isOpen, setIsOpen] = useState(false);

  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const [isDetailOpen, setIsDetailOpen] = useState(false); // 두 번째 모달의 상태를 관리하는 상태 변수

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
    }
    if (file) {
      const fileURL = URL.createObjectURL(file as Blob);
      setChangeImg(fileURL);
      setRecord((prevRecord) => ({ ...prevRecord, avatar: changeImg }));
      console.log('record', record);
    } else {
      setChangeImg('/images/profileNone.svg');
    }
  };

  //데이터 불러오는 훅
  useEffect(() => {
    const login = async () => {
      try {
        const record: UsersResponse = await db
          .collection('users')
          .getOne('p85jypwlgke40oq');
        // 로그인 후 사용자 정보 가져오기
        setRecord(record);
        setPhone(record?.phoneNumber);
        setAddress(record?.address);
        setChangeImg(record?.avatar);
        console.log(typeof record.avatar);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    login();
  }, []);

  //이중 모달 두번째 모달 닫는 함수
  const completeHandler = (data: any) => {
    setRoadAddress(data.roadAddress);
    setIsEditingAddress(!isEditingAddress);
    setIsOpen(false);
  };

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      left: '0',
      margin: 'auto',
      width: '500px',
      height: '600px',
      padding: '0',
      overflow: 'hidden',
    },
  };

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 상세 주소검색 event
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  // 상세주소 입력까지 마치면 새 주소 저장해주는 함수
  const clickHandler = () => {
    if (detailAddress === '') {
      alert('상세주소를 입력해주세요.');
    } else {
      console.log('record', record);
      const newAddress = `${roadAddress} ${detailAddress}`;
      setAddress(newAddress);

      setIsDetailOpen(!isDetailOpen);
    }
  };

  //내 주소 부분 변경버튼 저장버튼으로 바꿔주는 함수
  const handleSearchAddress = () => {
    setIsEditingAddress(!isEditingAddress);
    setIsDetailOpen(!isDetailOpen);
  };
  //전화번호 부분 변경버튼 저장버튼으로 바꿔주는 함수
  const handlePhoneNumber = () => {
    const isValid = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(
      String(phone)
    );
    if (!isEditingPhone) {
      setIsEditingPhone(!isEditingPhone);
      return;
    }

    if (isValid) {
      setRecord((prevRecord) => ({ ...prevRecord, phoneNumber: phone }));
      setIsEditingPhone(!isEditingPhone);
      return;
    } else return alert('알맞은 휴대전화번호를 입력해주세요');
  };

  //새 전화번호 입력시 번호 바꿔주는 함수
  const handelChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };

  const handelChangeAddress = () => {
    if (!isEditingAddress) {
      setIsEditingAddress(!isEditingAddress);
      return;
    }
    if (address) {
      setRecord((prevRecord) => ({ ...prevRecord, address: address }));
      setIsEditingAddress(!isEditingAddress);
    } else return alert('상세주소까지 알맞은 주소를 입력해주세요');
  };

  return (
    <StyledModifyProfileBox>
      <UserProfile name={(record as UsersResponse).name} src={changeImg} />
      <StyledProfileBox>
        <label htmlFor="modifyCamera">
          <img
            className="camera"
            src="/images/camera.svg"
            alt="프로필 사진 변경"
          />
        </label>
        <input
          type="file"
          name="modifyCamera"
          id="modifyCamera"
          onChange={handleChangeImg}
        />
        <StyledEmailBox>
          <span>이메일 아이디</span>
          <p>{(record as UsersResponse).email}</p>
        </StyledEmailBox>
        <StyledEmailBox>
          <span>휴대전화 번호</span>
          <div>
            <input
              id="name"
              type="text"
              value={phone}
              onChange={handelChangePhone}
              required
              disabled={!isEditingPhone}
            />
            <button
              className="orangeButton"
              type="button"
              onClick={handlePhoneNumber}
            >
              {isEditingPhone ? '저장' : '변경'}
            </button>
          </div>
        </StyledEmailBox>
        <StyledEmailBox>
          <span>내 주소</span>
          <div>
            <input
              type="text"
              value={address}
              onChange={handelChangeAddress}
              required
              disabled={!isEditingAddress}
            />
            <button
              className="orangeButton"
              type="button"
              onClick={handleSearchAddress}
            >
              {isEditingAddress ? '저장' : '변경'}
            </button>
          </div>
        </StyledEmailBox>

        <Modal isOpen={isDetailOpen} ariaHideApp={false} style={customStyles}>
          <StyledAddressBox>
            <div>
              <input value={roadAddress} readOnly placeholder="도로명 주소" />
              <button onClick={toggle}>주소 검색</button>
            </div>
            <div>
              <input
                type="text"
                onChange={changeHandler}
                value={detailAddress}
                placeholder="상세주소"
              />
              <button onClick={clickHandler}>주소 저장</button>
            </div>
          </StyledAddressBox>
        </Modal>

        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
          <DaumPostcode onComplete={completeHandler} />
        </Modal>
      </StyledProfileBox>
    </StyledModifyProfileBox>
  );
};

export default ModifyProfile;
