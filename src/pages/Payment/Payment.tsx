import Button from '@/components/atoms/Button/Button';
import CheckBox from '@/components/atoms/CheckBox/CheckBox';
import PaymentCard from '@/components/molecules/PaymentCard/PaymentCard';
import ReservationInfo from '@/components/organisms/ReservationInfo/ReservationInfo';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { useAuthStore } from '@/store/useAuthStore';
import pb from '@/api/pocketbase';
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { maskingName } from '@/utils';
import useReservationStore from '@/store/useReservationStore';
import { getDay, getMonth, getWeek } from 'date-fns';
//type 지정

interface PaymentProps {
  title?: string;
  info?: string;
  totalPrice?: number;
}

//style지정
const StyledPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.gray100};
  & .title {
    ${(props) => props.theme.fontStyles.headingMd}
    color: ${(props) => props.theme.colors.textBlack};
  }
  & .info {
    ${(props) => props.theme.fontStyles.textRegularMd};
    color: ${(props) => props.theme.colors.textDarkGray};
  }
  & .innerWrapper {
    background: #fff;
    padding: 20px 20px 30px;
    margin-bottom: 20px;
  }
  & .borderLine {
    block-size: 1px;
    inline-size: 100%;
    margin: 20px 0;
    background: ${(props) => props.theme.colors.lineColorGray};
  }
  & .payInfo {
    display: flex;
    justify-content: space-between;
    ${(props) => props.theme.fontStyles.textSemiboldBase};
    color: ${(props) => props.theme.colors.textBlack};
  }
  & .innerTitle {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
  }
  & .orange {
    color: ${(props) => props.theme.colors.orange};
  }
  & .infoDetail li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    ${(props) => props.theme.fontStyles.textRegularBase}
    & .price {
      ${(props) => props.theme.fontStyles.textSemiboldBase}
    }
  }
  & label span {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    padding-inline-start: 10px;
  }
  & .agreeInfo li {
    margin-bottom: 10px;
    ${(props) => props.theme.fontStyles.textRegularMd}
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;
const StyledBanner = styled.div`
  background: url('/images/paymentBanner.jpg') no-repeat 50% 50% / cover;
  inline-size: 100%;
  block-size: 90px;
`;

const Payment = ({
  title = '플레이스제목',
  info = '서울 구로구 김*경',
  totalPrice = 60000,
}: PaymentProps) => {
  const placeData = useLoaderData() as any;
  const { reservation } = useReservationStore();
  const userData = useAuthStore.getState().user;
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const minDate = reservation.reservationData.date[0];
  const maxDate = reservation.reservationData.date[1];
  const { require, etc, petId } = reservation.reservationData;
  const petData = userData?.expand.petId[0];

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/v1/iamport.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    if (!window.IMP) return;

    const { IMP } = window;
    IMP.init(import.meta.env.VITE_PORTONE_STORE_CODE);
    const InicisStoreId = import.meta.env.VITE_PORTONE_INICIS_STORE_ID;

    const userData = useAuthStore.getState().user;

    const data: RequestPayParams = {
      pg: `html5_inicis.${InicisStoreId}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: placeData.title,
      amount: placeData.priceSmall, // 가격
      buyer_name: userData?.name,
      buyer_tel: userData?.phone,
      buyer_email: userData?.email,
      buyer_addr: `${userData?.address} ${userData?.addressDetail}`,
    };

    IMP.request_pay(data, callback);
  };

  const callback = async (response: RequestPayResponse) => {
    const {
      success = true,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;

    if (success) {
      const userData = useAuthStore.getState().user;
      const reservationData = {
        placeId: placeData.id,
        userId: userData?.id,
        petId: petId,
        minDate: minDate?.toISOString(),
        maxDate: maxDate?.toISOString(),
        reviewed: false,
        price: placeData.priceSmall,
        required: require,
        etc: etc,
      };

      await pb.collection('reservation').create(reservationData);

      alert('결제 성공');
      return navigate(`/reservation_done/${placeData.id}`);
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };
  //checkbox handler
  function handleCheckbox() {
    setIsChecked(!isChecked);
  }
  return (
    <StyledPaymentContainer>
      <StyledBanner />
      <div className="innerWrapper">
        <p className="title">{placeData.title}</p>
        <span className="info">
          {placeData.address} {maskingName(placeData.expand.userId.name)}
        </span>
        <div className="borderLine"></div>
        <ReservationInfo
          mindate={`${getMonth(minDate) + 1}월 ${getDay(minDate)}일`}
          maxdate={`${getMonth(maxDate) + 1}월 ${getDay(maxDate)}일`}
          require={require}
          etc={etc}
        />
        <div className="borderLine"></div>
        <div className="payInfo">
          <p>총 금액</p>
          <p>{placeData.priceSmall}</p>
        </div>
      </div>
      <div className="innerWrapper">
        <div className="payInfo">
          <p>총 금액</p>
          <p className="orange">{placeData.priceSmall}</p>
        </div>
        <div className="borderLine"></div>
        <ul className="infoDetail">
          <li>
            <span>예약자 성함</span>
            <span className="price">{userData?.name}</span>
          </li>
          <li>
            <span>반려 동물</span>
            <span className="price">{petData.petName}</span>
          </li>
          <li>
            <span>연락처</span>
            <span className="price">{userData?.phone}</span>
          </li>
        </ul>
      </div>
      <div className="innerWrapper">
        <p className="innerTitle">결제 수단</p>
        <div className="borderLine"></div>
        <PaymentCard userPay={false} name="등록하기" />
        <div className="borderLine" style={{ margin: '20px 0 0 0' }}></div>
      </div>
      <div className="innerWrapper">
        <div className="payInfo">
          <p>총 금액</p>
          <p className="orange">{placeData.priceSmall}</p>
        </div>
        <div className="borderLine"></div>
        <ul className="infoDetail">
          <li>
            <span>소형 1마리 x 1일</span>
            <span className="price">{placeData.priceSmall}원</span>
          </li>
        </ul>
      </div>
      <div className="innerWrapper" style={{ marginBottom: '0px' }}>
        <CheckBox isChecked={isChecked} onChange={handleCheckbox}>
          환불 규정 동의
        </CheckBox>
        <div className="borderLine"></div>
        <ul className="agreeInfo">
          <li>예약 시작 72시간 전까지: 100% 환불</li>
          <li>예약 시작 24-72시간 전까지: 50% 환불</li>
          <li>예약 시작 24시간 이내: 환불 불가</li>
        </ul>
        <Button
          // as={Link}
          size="100%"
          mode={isChecked ? 'normal' : 'disabled'}
          // to="/reservation_done"
          onClick={onClickPayment}
        >
          결제하기
        </Button>
      </div>
    </StyledPaymentContainer>
  );
};

export default Payment;
