import ProfileImage from '@/components/atoms/ProfileImage/ProfileImage';
import styled from 'styled-components';

//type 정의
interface PaymentProps {
  src?: string;
  userPay: boolean;
  name: string;
  [key: string]: any;
}

//styled-component

const StyledPayment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    margin-bottom: 5px;
    ${(props) => props.theme.fontStyles.textSemiboldMd}
  }
  figure {
    display: flex;
    align-items: center;
    gap: 15px;
    ${(props) => props.theme.fontStyles.textRegularSm}
  }
`;

const StyledP = styled.p`
  text-decoration: underline;
  text-underline-offset: 3px;
  ${(props) => props.theme.fontStyles.textRegularMd}
  ${(props) => props.theme.colors.textGray}
`;

function Payment({
  src = '/images/card.svg',
  userPay = false,
  name = 'test',
  ...restProps
}: PaymentProps) {
  return (
    <StyledPayment {...restProps}>
      <figure>
        <img src={src} alt={name} />
        <figcaption>
          <p className="title">{userPay ? name : '등록하기'}</p>
          <p>
            {userPay ? '결제 시 예약이 완료됩니다' : '결제 수단을 등록해주세요'}
          </p>
        </figcaption>
      </figure>
      {userPay ? (
        <StyledP>변경</StyledP>
      ) : (
        <ProfileImage
          src="/images/plusIcon.svg"
          blockSize={25}
          inlineSize={25}
        />
      )}
    </StyledPayment>
  );
}

export default Payment;
