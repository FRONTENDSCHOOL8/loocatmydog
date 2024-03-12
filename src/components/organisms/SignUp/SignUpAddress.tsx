import Button from '@/components/atoms/Button/Button';
import getGeolocation from '@/utils/getGeolocation';
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import styled from 'styled-components';
import FormInput from '../../molecules/FormInput/FormInput';
import SignUpHeader from './SignUpHeader';

const StyledSignUpAddress = styled.div`
  padding-inline: 20px;

  /* background-color: pink; */
  /* border-top: 1px solid red; */

  & .div-phase {
    display: flex;

    & :first-child {
      width: 33%;
      border: 1px solid ${(props) => props.theme.colors.primary};
    }

    & :nth-child(2) {
      width: 33%;
      border: 1px solid ${(props) => props.theme.colors.primary};
    }

    & :nth-child(3) {
      width: 33%;
      border: 1px solid ${(props) => props.theme.colors.primary};
    }
  }

  & .pWrapper {
    padding-block-start: 40px;

    & .p-signUp {
      margin-block-end: 5px;
      ${(props) => props.theme.fontStyles.headingMd}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  & .inputWrapper {
  }

  & .searchInputWrapper {
    display: flex;
    align-items: flex-end;
    column-gap: 11px;
    margin-block: 37px;
  }

  & .searchInputWrapper div:first-child {
    flex-grow: 1;
  }

  & .exampleWrapper {
    margin-block-end: 50px;
    ${(props) => props.theme.fontStyles.textRegularBase}
    color: ${(props) => props.theme.colors.textGray};

    span {
      ${(props) => props.theme.fontStyles.textSemiboldBase}
      color: ${(props) => props.theme.colors.textBlack};
    }
  }

  & .addressDetailWrapper {
    margin-block-end: 50px;
  }
`;

interface SignUpAddressData {
  address: string;
  addressDetail: string;
  zonecode: string;
  sigungu: string;
  latitude: string;
  longitude: string;
}
interface SignUpAddressProps extends SignUpAddressData {
  updateFields: (fields: Partial<SignUpAddressData>) => void;
  back: () => void;
  next: () => void;
}

const SignUpAddress = ({ updateFields, next, back }: SignUpAddressProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [addressData, setAddressData] = useState({
    address: '',
    addressDetail: '',
    zonecode: '',
    sigungu: '',
    latitude: '',
    longitude: '',
  });

  function handleClickSearchButton() {
    setIsModalOpen(true);
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      margin: '0 auto',
      width: '300px',
      height: '500px',
      padding: '0',
      overflow: 'hidden',
    },
  };

  async function handleSearchAddress(data: any) {
    setIsModalOpen(false);
    setAddress(data.address);

    const geolocationData = await getGeolocation(data.address);

    const address = {
      address: data.address,
      addressDetail: addressDetail,
      zonecode: data.zonecode,
      sigungu: data.sigungu,
      latitude: geolocationData.latitude,
      longitude: geolocationData.longitude,
    };

    setAddressData(address);
    updateFields(address);
  }

  function handleInputAddressDetailChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setAddressDetail(e.target.value);
    updateFields({
      address,
      addressDetail: e.target.value,
      zonecode: addressData.zonecode,
      sigungu: addressData.sigungu,
      latitude: addressData.latitude,
      longitude: addressData.longitude,
    });
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        style={customStyles}
      >
        <DaumPostcode onComplete={handleSearchAddress} />
      </Modal>

      <SignUpHeader type={'step'} phase="3/3" back={back} />
      <StyledSignUpAddress>
        <div className="div-phase">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="pWrapper">
          <p className="p-signUp">내가 사는 곳의</p>
          <p className="p-signUp">주소를 입력하세요</p>
        </div>
        <div className="searchInputWrapper">
          <FormInput
            mode={'register'}
            type={'text'}
            name={'address'}
            hiddenLabel={true}
            value={address}
            placeholder="예) 연희동 132"
            isDisabled={true}
          >
            주소
          </FormInput>
          <Button size="20%" mode={'gray'} onClick={handleClickSearchButton}>
            검색
          </Button>
        </div>

        {!address && (
          <div className="exampleWrapper">
            <p>
              <span>도로명&nbsp;&nbsp;&nbsp;</span>예) 무학로 33, 도신대로 8길
              23
            </p>
            <p>
              <span>동주소&nbsp;&nbsp;&nbsp;</span>예) 연희동 42-18
            </p>
            <p>
              <span>건물명&nbsp;&nbsp;&nbsp;</span>예) 역삼동 푸르지오, 텐즈휠
            </p>
          </div>
        )}

        {address && (
          <div className="addressDetailWrapper">
            <FormInput
              mode={'register'}
              type={'text'}
              name={'addressDetail'}
              hiddenLabel={true}
              placeholder="상세주소 입력(건물명, 동/호수, 단독 주택 등"
              value={addressDetail}
              onChange={handleInputAddressDetailChange}
            >
              주소
            </FormInput>
          </div>
        )}

        {address && addressDetail && (
          <Button
            type="submit"
            size={'100%'}
            mode={'normal'}
            // onClick={handleClickSignupButton}
          >
            가입완료
          </Button>
        )}
      </StyledSignUpAddress>
    </>
  );
};

export default SignUpAddress;
