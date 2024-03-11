import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

// 명령어로 자동 생성된 타입 정의 파일에서 Schema를 가져옵니다.
import { useAuthStore } from '@/store/useAuthStore';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { isPhoneNum } from '@/utils/signUpValidation';
import pb from '@/api/pocketbase';
import { UsersCreate } from '@/@types/database';

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
  const [changeImg, setChangeImg] = useState<string>('');
  const [record, setRecord] = useState<UsersCreate | {}>({});

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [phone, setPhone] = useState<string>('');
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
      setRecord((prevRecord) => ({ ...prevRecord, avatar: fileURL }));
      console.log('record', record);
    } else {
      setChangeImg('/images/profileNone.svg');
    }
  };

  const user = useAuthStore.getState().user;
  const navigate = useNavigate();
  //데이터 불러오는 훅
  useEffect(() => {
    const login = async () => {
      try {
        const record = await pb.from('users').getOne(user?.id);
        // 로그인 후 사용자 정보 가져오기
        setRecord(record);
        setPhone(record?.phone);
        setAddress(record?.address);
        setChangeImg(record?.avatar);
        setDetailAddress(record?.addressDetail);
        console.log(record);
      } catch (error) {
        console.error('Error Logging:', error);
        // alert('로그인이 되어있어야 열람이 가능합니다.');
        //navigate('/signin');
      }
    };

    login();
  }, [user]);

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
      const newAddress = `${roadAddress}`;
      const newDetailAddress = `${detailAddress}`;
      setAddress(newAddress);
      setDetailAddress(newDetailAddress);

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
    isPhoneNum(phone);

    if (!isEditingPhone) {
      setIsEditingPhone(!isEditingPhone);
      return;
    }

    if (isPhoneNum(phone)) {
      setRecord((prevRecord) => ({ ...prevRecord, phone: phone }));
      setIsEditingPhone(!isEditingPhone);
      return;
    } else return alert('알맞은 휴대전화번호를 입력해주세요');
  };

  //새 전화번호 입력시 번호 바꿔주는 함수
  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };

  const handleChangeAddress = () => {
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
    <Form method="post" id="edit">
      <StyledModifyProfileBox>
        <UserProfile
          name={(record as UsersCreate).name}
          src={changeImg === '' ? '/images/profileNone.svg' : changeImg}
        />
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
            <p>{(record as UsersCreate).email}</p>
          </StyledEmailBox>
          <StyledEmailBox>
            <span>휴대전화 번호</span>
            <div>
              <input
                name="phone"
                type="text"
                value={phone}
                onChange={handleChangePhone}
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
                name="address"
                value={address}
                onChange={handleChangeAddress}
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
          <StyledEmailBox>
            <p>{(record as UsersCreate).addressDetail}</p>
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
                  name="detailAddress"
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
    </Form>
  );
};

export default ModifyProfile;

export async function edit({ request }: { request: any }) {
  const user = useAuthStore.getState().user;
  const data = await request.formData();
  const record = await pb.from('users').getOne(user?.id);
  for (const [key, value] of data.entries) console.log(key, value);

  await pb.from('users').update(user?.id, {
    address: data.get('address'),
    addressDetail: data.get('detailAddress'),
    phone: data.get('phone'),
    avatar: data.get(`${record.name}`),
  });

  return redirect(`/edit_my_profile`);
}
