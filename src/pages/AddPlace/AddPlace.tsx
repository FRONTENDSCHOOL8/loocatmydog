import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
import InputWrapper from '@/components/atoms/InputWrapper/InputWrapper';
import { Form } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/atoms/Button/Button';
import Calendar from '@/components/atoms/Calendar/Calendar';
import AnimalRateInput from '@/components/molecules/AnimalRateInput/AnimalRateInput';
import ButtonCheck from '@/components/atoms/ButtonCheck/ButtonCheck';
import { service } from '@/data/service';
import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import ImageSwiperContainer from '@/components/molecules/ImageSwiper/ImageSwiperContainer';
import pb from '@/api/pocketbase';
import { useAuthStore } from '@/store/useAuthStore';
import useDateRangeStore from '@/store/useDateRange';
import { PlacesResponse } from '@/@types/database';
import { AnyComponent } from 'styled-components/dist/types';

const StyledAddSection = styled.div`
  padding: 20px 20px 0;
  margin-bottom: 20px;

  & .sectionTitle {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  & .buttonWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  & .innerWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    & > span {
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textBlack};
      display: inline-block;
      inline-size: 40px;
    }
    & input {
      ${(props) => props.theme.fontStyles.textMediumBase}
      color: ${(props) => props.theme.colors.textBlack};
    }

    & input:placeholder-shown {
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textDarkGray};
    }
  }
  & .info {
    ${(props) => props.theme.fontStyles.textRegularSm}
    color: ${(props) => props.theme.colors.textDarkGray};
    display: block;
    text-align: end;
  }
  & .introduce {
    inline-size: 100%;
    border: none;
    outline: none;
    resize: none;
    border: 1px solid ${(props) => props.theme.colors.lineColorGray};
    border-radius: 4px;
    padding: 5px;
    min-block-size: 150px;
    ${(props) => props.theme.fontStyles.textRegularMd}
  }
`;

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

const StyledMultiplePhotoInputContainer = styled.div`
  position: relative;
  & label {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    inline-size: 100%;
    block-size: 150px;

    background-color: ${(props) => props.theme.colors.gray100};
    &:focus {
      border: 2px solid #000;
    }
  }
  & input[type='file'] {
    inline-size: 100%;
    block-size: 150px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    color: transparent;

    &::file-selector-button {
      border: none;
      display: none;
      appearance: none;
    }
  }
`;
// multi imageFiles container
const imageFiles: FileList[] = [];
//service container
const serviceListData: Array<string> = [];
//date container
let dateData: Array<Date | null> = [];

const AddPlace = () => {
  const { dateRange } = useDateRangeStore();
  function dateContainer() {
    dateData = [dateRange[0], dateRange[1]];
  }
  dateContainer();
  const [showImages, setShowImages] = useState<string[]>([]);
  const serviceList = Object.values(service[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [roadAddress, setRoadAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [detailAddress, setDetailAddress] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  // 이미지 상대경로 저장
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    let imageUrlLists: string[] = [...showImages];

    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files;
      imageFiles.push(file);
    }

    if (imageLists) {
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
      alert('이미지 등록은 10개까지만 가능합니다');
    }

    setShowImages(imageUrlLists);
  };

  const searchAddress = () => {
    setIsOpen(true);
  };
  const completeHandler = (data: any) => {
    setRoadAddress(data.roadAddress);
    setIsEditingAddress(!isEditingAddress);
    setIsOpen(false);
  };

  return (
    <Form
      id="placeForm"
      method="post"
      // action="/places/post"
      encType="multipart/form-data"
    >
      <ImageSwiperContainer
        type="picture"
        imageUrls={showImages}
        onChange={handleAddImages}
        input={true}
      />
      <StyledAddSection>
        <p className="sectionTitle">제목</p>
        <InputWrapper
          name="title"
          unit=""
          placeholder="플레이스의 이름을 입력해주세요"
        />
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">환경태그</p>
        <div className="innerWrapper">
          <span>태그명</span>
          <InputWrapper name="tag" unit="" placeholder="#로 구분가능" />
        </div>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">환경태그</p>
        <div className="innerWrapper" style={{ alignItems: 'end' }}>
          <InputWrapper
            name="address"
            unit=""
            placeholder="예) 연희동 132, 도선대로 33"
            value={roadAddress}
          />
          <Button
            type="button"
            size="30%"
            mode="normal"
            onClick={searchAddress}
          >
            검색
          </Button>
        </div>
        {/* {roadAddress ? (
          <InputWrapper
            name="addressDetail"
            unit=""
            placeholder="상세주소를 써주세요"
            onChange={changeHandler}
            value={detailAddress}
          />
        ) : (
          ''
        )} */}
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">가능한 날짜 선택</p>
        <Calendar />
        <span className="info">최대 한달 이내의 날짜를 선택할 수 있어요</span>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">이용금액</p>
        <AnimalRateInput size="소형" name="small" />
        <AnimalRateInput size="중형" name="middle" />
        <AnimalRateInput size="대형" name="large" />
      </StyledAddSection>
      <StyledAddSection>
        <div className="buttonWrapper">
          {serviceList.map((item) => {
            return (
              <ButtonCheck key={item.name} name={item.name}>
                {item.text}
              </ButtonCheck>
            );
          })}
        </div>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">자기소개</p>
        <textarea name="introduce" className="introduce"></textarea>
      </StyledAddSection>
      <StyledAddSection style={{ paddingBottom: '30px' }}>
        <Button type="submit" mode="normal" size="100%">
          등록하기
        </Button>
      </StyledAddSection>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <DaumPostcode onComplete={completeHandler} />
      </Modal>
    </Form>
  );
};

export default AddPlace;

export async function placeFormAction({ request }: { request: any }) {
  const formData = await request.formData();

  const userId = useAuthStore.getState().user?.id;
  const imgData = [];
  for (let i = 0; i < imageFiles[0].length; i++) {
    imgData.push(imageFiles[0][i]);
  }
  const priceSmall = formData.get('small');
  const priceMiddle = formData.get('middle');
  const priceLarge = formData.get('large');
  const price = { large: priceLarge, middle: priceMiddle, small: priceSmall };
  console.log(typeof JSON.stringify(price));
  const minDate = dateData[0];
  const maxDate = dateData[1];
  console.log(imageFiles);

  const eventData: any = {
    photo: imgData,
    title: formData.get('title'),
    tag: formData.get('tag'),
    address: formData.get('address'),
    userId: userId,
    minDate: minDate,
    maxDate: maxDate,
    price: JSON.stringify(price),
    introduce: formData.get('introduce'),
  };

  console.log(eventData);

  try {
    const updatedUser = await pb.from('places').create(eventData);
    // 메모리 비우기
    imageFiles.splice(0, imageFiles.length);

    alert('플레이스 등록이 완료됐습니다.');
  } catch (error) {
    console.log('Error while writing : ', error);
  }

  return null;
}
