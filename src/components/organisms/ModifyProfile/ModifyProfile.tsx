import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

import { TypedPocketBase } from 'typed-pocketbase';

// 명령어로 자동 생성된 타입 정의 파일에서 Schema를 가져옵니다.
import { Schema } from '@/@types/test';

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
    }
  }
`;

const StyledProfileBox = styled.div`
  padding-block-start: 36px;

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
`;

const ModifyProfile = () => {
  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
    }
    const fileURL = URL.createObjectURL(file as Blob);
    if (fileURL) {
      setChangeImg(fileURL);
    }
  };
  const [changeImg, setChangeImg] = useState('/images/profileNone.svg');

  useEffect(() => {
    const login = async () => {
      try {
        const record: SetStateAction<RecordType> = await db
          .collection('users')
          .getOne('p85jypwlgke40oq');
        // 로그인 후 사용자 정보 가져오기
        setRecord(record);
        console.log('record', record);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    login();
  }, []);

  interface RecordType {
    [key: string]: string | number;
  }

  const [record, setRecord] = useState<RecordType>({});

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [phone, setPhone] = useState(record.phoneNumber);
  const [address, setAddress] = useState(record.address);

  const [isOpen, setIsOpen] = useState(false);

  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState(''); // 추가

  const completeHandler = (data: any) => {
    setRoadAddress(data.roadAddress);
    setIsEditingAddress(!isEditingAddress);
    setIsOpen(false); //추가
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

  // 추가
  const clickHandler = () => {
    if (detailAddress === '') {
      alert('상세주소를 입력해주세요.');
    } else {
      setAddress(roadAddress, detailAddress);
    }
  };

  const handleSearchAddress = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  return (
    <StyledModifyProfileBox>
      <UserProfile name={'홍길동'} src={changeImg} />
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
          <p>{record.email}</p>
        </StyledEmailBox>
        <StyledEmailBox>
          <span>휴대전화 번호</span>
          <div>
            {isEditingPhone ? (
              <input
                id="name"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            ) : (
              <p>{record.phoneNumber}</p>
            )}
            <button
              className="orangeButton"
              type="button"
              onClick={() => handleSearchAddress}
            >
              {isEditingPhone ? '저장' : '변경'}
            </button>
          </div>
        </StyledEmailBox>
        <StyledEmailBox>
          <span>내 주소</span>
          <div>
            {isEditingAddress ? (
              <StyledAddressBox>
                <input value={roadAddress} readOnly placeholder="도로명 주소" />
                <button onClick={toggle}>주소 검색</button>
                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                  <DaumPostcode onComplete={completeHandler} />
                </Modal>
                <input
                  type="text"
                  onChange={changeHandler}
                  value={detailAddress}
                  placeholder="상세주소"
                />
              </StyledAddressBox>
            ) : (
              <p>{record.address}</p>
            )}
            <button
              className="orangeButton"
              type="button"
              onClick={clickHandler}
            >
              {isEditingAddress ? '저장' : '변경'}
            </button>
          </div>
        </StyledEmailBox>
      </StyledProfileBox>
    </StyledModifyProfileBox>
  );
};

export default ModifyProfile;
